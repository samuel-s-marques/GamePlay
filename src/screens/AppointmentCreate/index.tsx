import React, { useState } from 'react';
import { ModalView } from '../../components/ModalView';
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { Feather } from '@expo/vector-icons';
import {Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';
import uuid from 'react-native-uuid';

import { styles } from './styles';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { Background } from '../../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


export function AppointmentCreate() {
	const [category, setCategory] = useState('');
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [description, setDescription] = useState('');

	const navigation = useNavigation();

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

	async function handleSave() {
		const newAppointment = {
			id: uuid.v4(),
			guild,
			category,
			date: `${day}/${month} às ${hour}:${minute}h`,
			description
		};

		const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		const appointments = storage ? JSON.parse(storage) : [];

		await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([
			...appointments, newAppointment]))

		navigation.navigate('Home')
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
									guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image} />
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
									<SmallInput maxLength={2} onChangeText={setDay}/>
									<Text style={styles.divider}>
										/
									</Text>
									<SmallInput maxLength={2} onChangeText={setMonth}/>
								</View>
							</View>

							<View>
								<Text style={styles.label}>
									Hora e minuto
								</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} onChangeText={setHour}/>
									<Text style={styles.divider}>
										:
									</Text>
									<SmallInput 
										maxLength={2} 
										onChangeText={setMinute}
									/>
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
							onChangeText={setDescription}
						/>

						<View style={styles.footer}>
							<Button title="Agendar" onPress={handleSave}/>
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