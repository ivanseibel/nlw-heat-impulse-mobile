import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import Button from '../Button';

import { styles } from './styles';

export const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) {
      Alert.alert('Type a message to send.')
      return;
    }

    Keyboard.dismiss();

    try {
      setSendingMessage(true);
      await api.post('messages', { text: message.trim() });
      setMessage('');
    } catch (error) {
      console.log(error);
    } finally {
      setSendingMessage(false);
    }
  }, [message, setSendingMessage, api]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="What is your expectation for the DoWhile 2021?"
        multiline
        maxLength={140}
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        onChangeText={(text) => setMessage(text)}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="SEND MESSAGE"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleSendMessage}
        isLoading={sendingMessage}
      />
    </View>
  );
}