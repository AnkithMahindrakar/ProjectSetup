//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
export const Home = () => {
  const [profile, setProfile] = useState(true);
  const [notification, setNotification] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [random, setRandom] = useState(false);

  const profileHandler = () => {
    setProfile(true);
    setNotification(false);
    setCalendar(false);
    setCatalog(false);
    setRandom(false);
  };
  const notificationHandler = () => {
    setProfile(false);
    setNotification(true);
    setCalendar(false);
    setCatalog(false);
    setRandom(false);
  };

  const calendarHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(true);
    setCatalog(false);
    setRandom(false);
  };

  const catalogHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(false);
    setCatalog(true);
    setRandom(false);
  };

  const randomHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(false);
    setCatalog(false);
    setRandom(true);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const ProfileScreen = () => {
    return (
      <View style={styles.mainitem}>
        <View style={styles.rowitem}>
          <Text style={styles.profileItem}>Profile</Text>
          <View style={styles.topItem}>
            <View style={styles.avaliableContainer}>
              <Text style={styles.profiletwoItem}>
                {isEnabled ? 'Avaliable' : 'Not avaliable'}
              </Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.middleItem}>
          <View style={styles.secondmiddleitem}>
            <Image
              source={require('../../Resources/Images/demoProfile.jpg')}
              style={styles.ImageItem}
            />
            <Text style={{...styles.textcolour, ...{fontWeight: 'bold'}}}>
              John Michaels
            </Text>
          </View>
          <View style={styles.thirdmiddleitem}>
            <Text style={styles.textbold}>Location</Text>
            <Text style={styles.textcolour}>
              510, Gulfgate Centre Mall, Houston ,TX 77098
            </Text>
          </View>
          <View style={styles.thirdmiddleitem}>
            <Text style={styles.textbold}>Skills & competencies</Text>
            <Text style={styles.textcolour}>Windows Surface</Text>
            <Text style={styles.textcolour}>HP Laptops</Text>
            <Text style={styles.textcolour}>System processors</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomLogo}>
          <Image
            source={require('../../Resources/Images/Logo.png')}
            style={styles.BelowImage}
          />
        </View>
      </View>
    );
  };

  const BottomTab = () => {
    return (
      <>
        <TouchableOpacity style={styles.iconContainer} onPress={profileHandler}>
          <FontAwesome
            name="user-circle"
            size={profile ? 30 : 24}
            color={profile ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={notificationHandler}>
          <Ionicons
            name="notifications"
            size={notification ? 30 : 24}
            color={notification ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={calendarHandler}>
          <FontAwesome
            name="calendar-o"
            size={calendar ? 30 : 24}
            color={calendar ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={catalogHandler}>
          <MaterialCommunityIcons
            name="format-page-break"
            size={catalog ? 30 : 24}
            color={catalog ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={randomHandler}>
          <Octicons
            name="book"
            size={random ? 30 : 24}
            color={random ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {profile && ProfileScreen()}

      {notification && (
        <View>
          <Text style={styles.screenText}>Notification screen</Text>
        </View>
      )}
      {calendar && (
        <View>
          <Text style={styles.screenText}>Calendar screen</Text>
        </View>
      )}
      {catalog && (
        <View>
          <Text style={styles.screenText}>Catalog screen</Text>
        </View>
      )}
      {random && (
        <View>
          <Text style={styles.screenText}>Random screen</Text>
        </View>
      )}
      <View
        style={
          Platform.OS === 'ios' && Platform.isPad
            ? styles.sideTab
            : styles.BottomTabConatiner
        }>
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
    // marginLeft: 100,
    // flexDirection: 'row',
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
    width: '20%',
    left: 0,
    backgroundColor: '#FB8B24',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginLeft: '20%',
  },
  iconStyles: {
    height: 20,
    width: 20,
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
  /////////////////////////////////////////////////
  rowitem: {
    flexDirection: 'row',
    marginVertical: 50,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  textcolour: {
    color: '#606060',
    fontWeight: '600',
    lineHeight: 20,
  },
  textbold: {
    fontWeight: 'bold',
  },
  topItem: {
    flexDirection: 'row',
  },
  avaliableContainer: {
    width: 100,
  },
  BelowImage: {
    alignSelf: 'center',
    position: 'absolute',
    height: 70,
    width: 60,
  },
  profileItem: {
    paddingRight: 150,
    fontSize: 18,
    color: '#606060',
    fontWeight: 'bold',
  },
  ImageItem: {
    marginBottom: 10,
    width: 90,
    height: 90,
  },
  profiletwoItem: {
    color: '#ABB4BD',
    position: 'relative',
    top: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '30%',
    height: '8%',
    marginBottom: 50,
    borderWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    color: 'orange',
  },
  secondmiddleitem: {
    paddingBottom: 20,
  },
  thirdmiddleitem: {
    paddingBottom: 40,
  },
  middleItem: {
    flexDirection: 'column',
  },
  mainitem: {
    flex: 1,
    // marginLeft: 200,
  },
  bottomLogo: {
    position: 'absolute',
    bottom: 80,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
});
