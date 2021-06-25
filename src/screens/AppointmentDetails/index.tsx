import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
	const members = [
		{
			id: '1',
			username: 'Samuel',
			avatar_url: 'https://avatars.githubusercontent.com/u/73559465?v=4',
			status: 'online'
		},
		{
			id: '2',
			username: 'Lucas',
			avatar_url: 'https://pps.whatsapp.net/v/t61.24694-24/173429886_315072243338013_2431803753094669689_n.jpg?ccb=11-4&oh=a46b7455196eaadba985113580234a3c&oe=60D94B8C',
			status: 'offline'
		},
		{
			id: '3',
			username: 'Rakesh',
			avatar_url: 'https://i.imgur.com/zvecWDr.jpeg',
			status: 'online'
		}
	];

	return (
		<Background>
			<Header
				title="Detalhes"
				action={
					<BorderlessButton>
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
						Lendários
					</Text>

					<Text style={styles.subtitle}>
						É hoje que vamos chegar ao challenger sem perder uma partida da md10
					</Text>					
				</View>
			</ImageBackground>

			<ListHeader
				title="Jogadores"
				subtitle="Total 3"
			/>

			<FlatList 
				data={members}
				keyExtractor={item => item.id}
				renderItem={({item}) => (
					<Member data={item}/>
				)}
				ItemSeparatorComponent={() => <ListDivider />}
				style={styles.members}
			/>

			<View style={styles.footer}>
				<ButtonIcon title="Entrar na partida" />
			</View>
		</Background>
	)
}