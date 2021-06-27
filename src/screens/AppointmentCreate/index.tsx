import React, { useState } from 'react';
import { ModalView } from '../../components/ModalView';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { Feather } from '@expo/vector-icons';
import {Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { Background } from '../../components/Background';


export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleOpenGuildsModal(){
		setOpenGuildsModal(true)
	}

	function handleCategorySelect(categoryId: string){
		setCategory(categoryId);
	}

	function handleCloseGuildsModal(){
		setOpenGuildsModal(false)
	}

	function handleGuildSelect(guildSelect: GuildProps){
		setGuild(guildSelect)
		setOpenGuildsModal(false)
	}

	return (
		<KeyboardAvoidingView 
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
		>
			<Background>
				<ScrollView>
					<Header
						title="Agendar partida"
					/>

					<Text style={[
						styles.label, 
						{ marginLeft: 24, marginTop: 36}
					]}>
						Categoria
					</Text>

					<CategorySelect
						hasCheckBox
						setCategory={handleCategorySelect}
						categorySelected={category}
					/>

					<View style={styles.form}>
						<RectButton onPress={handleOpenGuildsModal}>
							<View style={styles.select}>
								{
									guild.icon ? <GuildIcon/> : <View style={styles.image} />
								}

								<View style={styles.selectBody}>
									<Text style={[styles.label, { marginBottom: 0}]}>
										{guild.name ? guild.name : 'Selecione um servidor' }
									</Text>
								</View>

								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>
						
						<View style={styles.field}>
							<View>
								<Text style={styles.label}>
									Dia e mês
								</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>
										/
									</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>

							<View>
								<Text style={styles.label}>
									Hora e minuto
								</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>
										:
									</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
						</View>

						<View style={styles.field}>
							<Text style={styles.label}>
								Descrição
							</Text>

							<Text style={styles.textLimit}>
								Max 100 caracteres
							</Text>
						</View>

						<TextArea 
							multiline 
							maxLength={100} 
							numberOfLines={5} 
							autoCorrect={false}
						/>

						<View style={styles.footer}>
							<Button title="Agendar" />
						</View>
					</View>
				</ScrollView>
			</Background>

			<ModalView visible={openGuildsModal} closeModal={handleCloseGuildsModal}>
				<Guilds handleGuildSelect={handleGuildSelect}/>
			</ModalView>

		</KeyboardAvoidingView>
	)
}