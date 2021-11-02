import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';

import { styles } from './styles';

export const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    api.get<MessageProps[]>('/messages/last3').then((response) => {
      setCurrentMessages(response.data);
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(item => (
        <Message key={item.id} data={item} />
      ))}

    </ScrollView>
  );
}