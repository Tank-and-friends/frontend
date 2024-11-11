import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import avatar from '../../../assets/images/pensquare.png';

type Props = PropsWithChildren<{
  title: string;
  //   avatarSource: string;
}>;

const TopNavBar = ({title}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.customHeaderWrapper}>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        onPress={() => navigation.goBack()}
        // containerColor="black"
      />
      <Image source={avatar} style={styles.avatar} />
      <Text
        style={styles.name}
        numberOfLines={1}
        ellipsizeMode="tail"
        onPress={() => navigation.navigate('FriendPersonalInfo')}>
        {title}
      </Text>
      <IconButton icon="information-outline" iconColor="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  customHeaderWrapper: {
    height: 60,
    width: '100%',
    backgroundColor: '#C02135',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginLeft: 5,
    flex: 1,
  },
});

export default TopNavBar;
