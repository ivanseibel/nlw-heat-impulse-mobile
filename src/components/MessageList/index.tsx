import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';

import { styles } from './styles';

const messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage: MessageProps) => {
  messagesQueue.push(newMessage);
});

export const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(state => [
          messagesQueue[0],
          state[0],
          state[1],
        ].filter(Boolean));
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurrentMessages([]);
    const fetchMessages = async () => {
      const response = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(response.data);
    }

    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(item => {
        // console.log(item);
        return (
          <Message key={item.id} data={item} />
        );
      })}

    </ScrollView>
  );
}