import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { COLORS } from '../../theme';
import Button from '../Button';

import { styles } from './styles';

export const SignInBox: React.FC = () => {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      <Button
        title="GITHUB LOGIN"
        backgroundColor={COLORS.YELLOW}
        color={COLORS.BLACK_PRIMARY}
        icon="github"
        isLoading={isSigningIn}
        onPress={signIn}
      />
    </View>
  );
}