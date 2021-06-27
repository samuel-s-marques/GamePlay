import React from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
	handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props) {
	const guilds = [
		{
			id: '1',
			name: 'Lendários',
			icon: 'image.jpg',
			owner: true,
		},
		{
			id: '2',
			name: 'Wowzinho',
			icon: 'image.jpg',
			owner: false,
		}
	]

	return (
		<View style={styles.container}>
			<FlatList 
				data={guilds}
				keyExtractor={item => item.id}
				renderItem={({item}) => (
					<Guild 
						onPress={() => handleGuildSelect(item)}
						data={item} 
					/>
				)}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => <ListDivider isCentered={true} />}
				ItemSeparatorComponent={() => <ListDivider isCentered={true} />}
				contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
				style={styles.guilds}
			/>
		</View>
	)
}