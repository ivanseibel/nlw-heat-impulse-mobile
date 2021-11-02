import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { COLORS } from '../../theme';
import Button from '../Button';

import { styles } from './styles';

export const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

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
      />
    </View>
  );
}