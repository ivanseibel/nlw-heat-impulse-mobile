import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import LogoSvg from '../../assets/logo.svg';

import { UserPhoto } from '../UserPhoto/index';
import { useAuth } from '../../hooks/auth';

export const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>

        {!!user && (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Disconnect</Text>
          </TouchableOpacity>
        )}

        <UserPhoto
          imageUri={user?.avatar_url}
          sizes="NORMAL"
        />

      </View>


    </View>
  );
}