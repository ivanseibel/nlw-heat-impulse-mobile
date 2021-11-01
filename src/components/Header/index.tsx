import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import LogoSvg from '../../assets/logo.svg';

import { UserPhoto } from '../UserPhoto/index';

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>

        <TouchableOpacity>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <UserPhoto
          imageUri="https://github.com/ivanseibel.png"
          sizes="NORMAL"
        />

      </View>


    </View>
  );
}