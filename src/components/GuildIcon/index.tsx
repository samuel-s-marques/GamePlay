import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
	const uri = "https://www.pngkey.com/png/detail/149-1495879_discord-icon-circle-png-discord-png.png";

	return (
		<Image
			source={{uri}}
			style={styles.image}
			resizeMode="cover"

		/>
	)
}