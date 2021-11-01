import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MessageList></MessageList>
    </View>
  );
}

export { Home };