/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileScreen} from './ProfileScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Home = () => {
  var array = [
    {title: 'account-circle'},
    {title: 'bell'},
    {title: 'calendar-month'},
    {title: 'format-page-break'},
    {title: 'book-open-page-variant'},
  ];

  const [idno, setidno] = useState(0);
  const [isPortrait, setIsPortrait] = useState();
  let content;
  useEffect(() => {
    if (windowHeight > windowWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  }, [windowWidth, windowHeight]);

  if (idno === 0) {
    content = <ProfileScreen />;
  } else if (idno === 1) {
    content = (
      <View>
        <Text style={styles.screenText}>Notification screen</Text>
      </View>
    );
  } else if (idno === 2) {
    content = (
      <View>
        <Text style={styles.screenText}>Calender screen</Text>
      </View>
    );
  } else if (idno === 3) {
    content = (
      <View>
        <Text style={styles.screenText}>Catalog screen</Text>
      </View>
    );
  } else if (idno === 4) {
    content = (
      <View>
        <Text style={styles.screenText}>Book screen</Text>
      </View>
    );
  }

  const BottomTab = () => {
    return (
      <>
        {array.map((item, index) => (
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                setidno(index);
              }}>
              <MaterialCommunityIcons
                name={item.title}
                size={index === idno ? 35 : 24}
                color={index === idno ? 'white' : 'rgba(255, 255, 255, 0.5)'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };
  return (
    <View style={styles.container}>
      {content}
      <View style={isPortrait ? styles.BottomTabConatiner : styles.sideTab}>
        {BottomTab()}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  BottomTabConatiner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#FB8B24',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sideTab: {
    position: 'absolute',
    height: '100%',
    width: 90,
    left: 0,
    backgroundColor: '#FB8B24',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenText: {
    fontSize: 30,
  },
});
