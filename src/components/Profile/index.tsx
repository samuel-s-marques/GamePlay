import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';
import { styles } from './styles';

function Capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function Profile() {
	const { user, signOut } = useAuth();

	function handleSignOut() {
		Alert.alert('Logout', 'Deseja sair do GamePlay?', 
		[
			{
				text: 'Não',
				style: 'cancel'
			},
			{
				text: 'Sim',
				onPress: () => signOut()
			}
		])
	}

	return (
		<View style={styles.container}>
			<RectButton>
				<Avatar urlImage={user.avatar}/>
			</RectButton>

			<View>
				<View style={styles.user}>
					<Text style={styles.greeting}>
						Olá, 
					</Text>

					<Text style={styles.username}>
						{ Capitalize(user.firstName) }!
					</Text>
				</View>

				<Text style={styles.message}>
					Hoje é dia de vitória
				</Text>
			</View>
		</View>
	)
}