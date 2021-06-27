import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Profile } from '../../components/Profile';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Home() {
	const [category, setCategory] = useState('');

	const navigation = useNavigation();

	const appointment = [
		{
			id: '1',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: "É hoje que vamos chegar ao challenger sem perder uma partida de md10"
		},

		{
			id: '2',
			guild: {
				id: '1',
				name: 'Wowzinho',
				icon: null,
				owner: false,
			},
			category: '3',
			date: '23/06 às 20:40h',
			description: "É hoje que vamos chegar ao challenger sem perder uma partida de md10"
		},
	]

	function handleCategorySelect(categoryId: string){
		categoryId === category ? setCategory('') : setCategory(categoryId);
	}

	function handleAppointmentDetails() {
		navigation.navigate('AppointmentDetails')
	}

	function handleAppointmentCreate() {
		navigation.navigate('AppointmentCreate')
	}

	return (
		<Background>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd onPress={handleAppointmentCreate}/>
			</View>

			<CategorySelect
				categorySelected={category}
				setCategory={handleCategorySelect}
			/>

			<ListHeader
				title="Partidas agendadas"
				subtitle="Total 6"
			/>

			<FlatList 
				data={appointment}
				keyExtractor={item => item.id}
				renderItem={({item}) => (
					<Appointment 
						data={item}
						onPress={handleAppointmentDetails}
					/>
				)}
				ItemSeparatorComponent={() => <ListDivider/>}
				style={styles.matches}
				contentContainerStyle={{paddingBottom: 69}}
				showsVerticalScrollIndicator={false}
			/>
		</Background>
	);
}