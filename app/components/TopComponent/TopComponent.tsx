import { View, Image, StyleSheet } from 'react-native'
import { Icon, IconButton, Text, TextInput } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons'

import React from 'react'
import { TextField } from '../TextField/TextField';

export default function TopComponent() {
  return (
    <View style={{width: '100%'}}>
        <View style={styles.topContainer}>
        <Image
          source={require('../../../assets/images/ProfilePic.png')}
          style={styles.profileImage}
        />
        <Text style={{
          color: 'white',
          fontWeight: 'semibold',
          fontSize: 24,
          fontFamily: 'Inter',
        }}>Đăng ký lớp</Text>
        <IconButton icon="cog-outline" size={30} iconColor='white' style={{
          position: 'absolute',
          right: 20,
          top: 20
        }}/>
      </View>
      <View style={styles.searchBarContainer}>
        <TextField
          placeholder="Bạn muốn tìm gì..."
          prefix={<IonIcons name="search" size={25}/>}
        
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    topContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
    },
    searchBarContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    searchBar: {
      width: '95%',
      borderRadius: 10,
      elevation: 5,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: 'white',
      marginHorizontal: 20,
      backgroundColor: 'green'
    },
  });