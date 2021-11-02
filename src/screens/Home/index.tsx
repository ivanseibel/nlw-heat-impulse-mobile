import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SignInBox } from '../../components/SignInBox';
import { SendMessageForm } from '../../components/SendMessageForm/index';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />
      {/* <SignInBox /> */}
      <SendMessageForm />
    </View>
  );
}

export { Home };