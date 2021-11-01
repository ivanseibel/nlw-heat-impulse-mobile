import React from 'react';
import { ScrollView } from 'react-native';
import { Message } from '../Message';

import { styles } from './styles';

export const MessageList: React.FC = () => {
  const data = [
    {
      id: '1',
      text: 'Hello, how are you?',
      user: {
        avatar_url: 'https://github.com/ivanseibel.png',
        name: 'Ivan Seibel',
      }
    },
    {
      id: '2',
      text: 'This is the second message!',
      user: {
        avatar_url: 'https://randomuser.me/api/portraits/men/35.jpg',
        name: 'John Doe',
      }
    },
    {
      id: '3',
      text: 'And this is the third message!',
      user: {
        avatar_url: 'https://randomuser.me/api/portraits/women/33.jpg',
        name: 'Mila Miloca',
      }
    },
  ]

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="never"
    >
      {data.map(item => (
        <Message key={item.id} data={item} />
      ))}

    </ScrollView>
  );
}