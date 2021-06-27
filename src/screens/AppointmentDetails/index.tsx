import React, { useState, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ImageBackground, Text, View, FlatList, Share, Platform } from 'react-native';
import { theme } from '../../global/styles/theme';
import * as Linking from 'expo-linking';

import { styles } from './styles';
import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { Load } from '../../components/Load';

type Params = {
	guildSelected: AppointmentProps;
}

type GuildWidget = {
	id: string;
	name: string;
	instant_invite: string;
	members: MemberProps[];
}

export function AppointmentDetails() {
	const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
	const [loading, setLoading] = useState(true);

	const route = useRoute();
	const { guildSelected } = route.params as Params;

	async function fetchGuildWidget() {
		try {
			const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
			setWidget(response.data);
		} catch {
			Alert.alert('Verifique se o Widget do servidor está ativado.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchGuildWidget()
	}, [])

	function handleShareClick() {
		const message = Platform.OS === 'ios' ?
		`Junte-se a ${guildSelected.guild.name}`
		: widget.instant_invite;

		Share.share({
			message,
			url: widget.instant_invite
		})
	}

	function handleOpenGuild() {
		Linking.openURL(widget.instant_invite);
	}

	return (
		<Background>
			<Header
				title="Detalhes"
				action={
					<BorderlessButton onPress={handleShareClick}>
						<Fontisto
							name="share"
							size={24}
							color={theme.colors.primary}
						/>
					</BorderlessButton>
				}
			/>

			<ImageBackground 
				source={BannerImg}
				style={styles.banner}	
			>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>
						{ guildSelected.guild.name }
					</Text>

					<Text style={styles.subtitle}>
						{ guildSelected.description }
					</Text>					
				</View>
			</ImageBackground>

			{
				loading ? <Load /> :

				<>
					<ListHeader
						title="Jogadores"
						subtitle={`Total ${widget.members.length ? widget.members.length : 0}`}
					/>

					<FlatList 
						data={widget.members ? widget.members : []}
						keyExtractor={item => item.id}
						renderItem={({item}) => (
							<Member data={item}/>
						)}
						ItemSeparatorComponent={() => <ListDivider isCentered />}
						style={styles.members}
						ListEmptyComponent={() => (
							<View style={styles.emptyContainer}>
								<Text style={styles.emptyText}>
									Não há ninguém online agora.
								</Text>
							</View>
						)}
					/>
				</>
			}

			{
				guildSelected.guild.owner &&

				<View style={styles.footer}>
					<ButtonIcon onPress={handleOpenGuild} title="Entrar na partida" />
				</View>
			}
		</Background>
	)
}