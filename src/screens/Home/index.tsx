import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SignInBox } from '../../components/SignInBox';
import { SendMessageForm } from '../../components/SendMessageForm/index';
import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Header />

      <MessageList />

      {!!user ? <SendMessageForm /> : <SignInBox />}
    </View>
  );
}

export { Home };