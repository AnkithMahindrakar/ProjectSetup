import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
// import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OTPublisher, OTSession, OTSubscriber} from 'opentok-react-native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';

///////////////////////////////////////////////////////////////////////
const publisherProperties = {
  publishAudio: true,
  audioTrack: true,
  publishVideo: true,
  cameraPosition: 'back',
  resolution: '352x288',
  videoSource: 'camera',
  name: 'user',
};
const subscriberEventHandlers = {
  connected() {
    console.log('connected yes');
  },
  otrnError(object) {
    console.log('otrnError', object);
  },
  videoDisabled(String) {
    console.log('videodisabled', String);
  },
  error(error) {
    console.log(`There was an error with the subscriber: ${error}`);
  },
  videoEnabled(String) {
    console.log('videoEnabled', String);
  },
  disconnected() {
    console.log('disconnected');
  },
  videoDisableWarning() {
    console.log('videoDisableWarning');
  },
  videoDisableWarningLifted() {
    console.log('videoDisableWarningLifted');
  },
  videoDataReceived() {
    console.log('video received');
  },
};
const publisherEventHandlers = {
  // audioLevel: level => {
  //   console.log('publisher audio level', level);
  // },
  streamCreated: event => {
    console.log('Publisher stream created!', event);
  },
  streamDestroyed: event => {
    console.log('Publisher stream destroyed!', event);
  },
  // audioLevel: (number) =>{
  //   console.log('audiolevel', number);
  // }
};
const sessionEventHandlers = {
  audioLevel: level => {
    console.log('publisher audio level', level);
  },
  streamCreated: event => {
    console.log('session stream created!', event);
  },
  streamDestroyed: event => {
    console.log('session stream destroyed!', event);
  },
  connectionCreated: obj => {
    console.log('session connection created', obj);
  },
  connectionDestroyed: obj => {
    console.log('session connection Destroyed', obj);
  },
  error: err => {
    console.log('Error in session', err);
  },
  sessionConnected: () => {
    console.log('session connected');
  },
  sessionDisconnected: () => {
    console.log('session disconnected');
  },
  sessionReconnected: obj => {
    console.log('session Reconnected');
  },
  sessionReconnecting: obj => {
    console.log('session Reconnecting');
  },
  // audioLevel: (number) =>{
  //   console.log('audiolevel', number);
  // }
};
const sessionIdFunc = value => {
  console.log('the session', value);
};
//////////////////////////////////////////////////////////////////////////////////////////

class Agent {
  constructor(description1, description2, description3) {
    this.description1 = description1;
    this.description2 = description2;
    this.description3 = description3;
  }
}

class Category {
  constructor(primaryproduct, description1, description2, description3) {
    this.primaryproduct = primaryproduct;
    this.description1 = description1;
    this.description2 = description2;
    this.description3 = description3;
  }
}

const CATEGORIES = [
  new Category(
    'Primary Product',
    'Microsoft Surface Go 2',
    'SKU# kI475...',
    'Price$1,100*',
  ),

  new Category(
    'Primary Product',
    'Microsoft Surface Go 3',
    'SKU# kI475...',
    'Price$1,100*',
  ),

  new Category(
    'Primary Product',
    'Microsoft Surface Go 4',
    'SKU# kI475...',
    'Price$1,100*',
  ),
];

const AGENT = [
  new Agent(
    'Laptops',
    'Swamy Dev',
    'Laptops ,2-in-1 Laptops \n, Smart Phones, Tablets,\n Product Specialist \n',
  ),

  new Agent(
    '2-in-1 Laptops',
    'Swamy Dev',
    'Laptops ,2-in-1 Laptops \n, Smart Phones, Tablets,\n Product Specialist \n',
  ),

  new Agent(
    'Smart Phones',
    'Swamy Dev',
    'Laptops ,2-in-1 Laptops \n, Smart Phones, Tablets,\n Product Specialist \n',
  ),

  new Agent(
    'Tablets',
    'Swamy Dev',
    'Laptops ,2-in-1 Laptops \n, Smart Phones, Tablets,\n Product Specialist \n',
  ),
  new Agent(
    'Product Specialist',
    'Swamy Dev',
    'Laptops ,2-in-1 Laptops \n, Smart Phones, Tablets,\n Product Specialist \n',
  ),

  new Agent('Product Explainer', 'null', ''),
  new Agent('VSR Support', 'null', ''),

  new Agent('LG', 'null', ''),
  new Agent('Other Avaliable agents', 'null', ''),
];

function CallScreen({route}) {
  const [video, setvideo] = useState(false);
  const [camera, setcamera] = useState(false);
  const [mic, setmic] = useState(true);
  const [idno, setidno] = useState(0);
  const [chatgoals, setChatGoals] = useState([]);
  const [enteredGoal, setEnteredGoal] = useState('');
  const [add, setAdd] = useState(false);
  const [mute, setmute] = useState(true);
  const [calling, setcalling] = useState(false);
  const [snackbar, setsnackbar] = useState(false);
  const [timerandcontactbar, settimerandcontactbar] = useState(true);
  const [element, setelement] = useState('');
  var content;
  var array = [{name: 'Call'}, {name: 'Chat'}, {name: 'Catalog'}];

  //snackbar for catalog and original screen
  const notificationData = route.params;
  // console.log('------------------------', notificationData);
  // console.log('------------------------', notificationData.additionalData);
  // console.log(
  //   '------------------------',
  //   typeof notificationData.additionalData.SessionId,
  // );
  // console.log(
  //   '------------------------',
  //   notificationData.additionalData.TokenId,
  // );
  //   console.log(
  //     '------------------------',
  //     notificationData.additionalData.SessionId,
  //   );
  const snackBar = text => {
    return (
      <View
        style={{
          width: '80%',
          backgroundColor: '#FB8B24',
          height: '3%',
          alignSelf: 'center',
          marginTop: 350,
          borderRadius: 5,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
          {text}
        </Text>
      </View>
    );

    // snack bar message to show details sent to chat screen
  };

  //catalog flat list
  const renderGridItem = itemData => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignSelf: 'center',
          marginBottom: 10,
          flexDirection: 'column',
          padding: 20,
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: 'grey',
            fontSize: 15,
            fontWeight: '700',
          }}>
          {itemData.item.primaryproduct}
        </Text>
        <View
          style={{
            width: '80%',
            height: '60%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/Laptop.png')}
            style={{width: 50, height: 50}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'grey', fontSize: 15, fontWeight: '700'}}>
              {itemData.item.description1}
            </Text>
            <Text style={{color: 'grey', fontSize: 15}}>
              {itemData.item.description2}
            </Text>
            <Text style={{color: 'grey', fontSize: 15, fontWeight: '700'}}>
              {itemData.item.description3}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              width: 60,
              height: 30,
              backgroundColor: 'white',
              borderColor: '#FB8B24',
              borderWidth: 2,
              borderRadius: 6,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'space-around'}}
              onPress={() => {
                setelement('share');
                setsnackbar(true);
                setTimeout(() => {
                  setsnackbar(false);
                }, 1000);
                addGoalHandler(itemData.item.description1, 'share');
              }}>
              <MaterialCommunityIcons
                name="share-variant"
                size={15}
                color={'#696969'}
              />
              <Text style={{color: '#FB8B24', fontSize: 10, fontWeight: '700'}}>
                Share
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 80,
              height: 30,
              backgroundColor: '#FB8B24',
              borderRadius: 6,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 5,
                justifyContent: 'space-around',
              }}
              onPress={() => {
                setelement('addtocart');
                setsnackbar(true);
                setTimeout(() => {
                  setsnackbar(false);
                }, 1000);
                addGoalHandler(itemData.item.description1, 'addtocart');
              }}>
              <MaterialCommunityIcons name="cart" size={15} color={'white'} />
              <Text style={{color: 'white', fontSize: 10, fontWeight: '700'}}>
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  //call add icon flatlist
  const addFlatList = itemData => {
    if (itemData.item.description2 === 'null') {
      return (
        <View
          style={{
            width: '100%',
            height: 70,
            padding: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{color: '#FB8B24', fontSize: 17}}>
            {itemData.item.description1}
          </Text>
          <View>
            <Text style={{color: '#2f4f4f'}}>No agent Avaliable</Text>
          </View>
        </View>
      );
    } else {
      return (
        //add call flat list
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            padding: 10,
            justifyContent: 'space-around',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{color: '#FB8B24', fontSize: 17}}>
            {itemData.item.description1}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <MaterialCommunityIcons
              style={{width: 50, height: 50, alignSelf: 'center'}}
              name="account-circle"
              size={50}
              color={'#a9a9a9'}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {itemData.item.description2}
              </Text>
              <Text style={{color: '#2f4f4f'}}>
                {itemData.item.description3}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  settimerandcontactbar(true);
                  setcalling(false);
                }, 5000);
                settimerandcontactbar(false);
                setcalling(true);
                setAdd(false);
              }}>
              <MaterialCommunityIcons
                name="phone-plus"
                size={35}
                color={'#FB8B24'}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  //chat flat list
  const chatText = itemData => {
    // chat screen text
    if (itemData.item.type === 'sendcontact') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
              {itemData.item.value}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="account"
                size={15}
                color={'black'}
              />
              <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
                Swamy Dev
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: 180,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons name="email" size={15} color={'black'} />
              <Text style={{color: 'black', fontSize: 15}}>
                support@connect.com
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (itemData.item.type === 'share') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: '#FB8B24',
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
            Shared Product :
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            {itemData.item.value}
          </Text>
        </View>
      );
    } else if (itemData.item.type === 'addtocart') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text style={{color: 'black', fontSize: 15}}>
            Request to add to cart sent to Customer for
          </Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            {itemData.item.value}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
            {itemData.item.value}
          </Text>
        </View>
      );
    }
  };

  const videoButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setidno(0);
        }}
        style={video ? styles.nochatcircle : styles.chatcircle}>
        <MaterialCommunityIcons
          name="video"
          style={{alignSelf: 'center'}}
          size={33}
          color={video ? '#fffaf0' : '#fffa'}
        />
      </TouchableOpacity>
    );
  };
  // set the array of strings
  const addGoalHandler = (goalTitle, type) => {
    setChatGoals(currentGoals => [
      {value: goalTitle, type: type},
      ...currentGoals,
    ]);
  };

  //set the text
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  //tabs
  if (idno === 0) {
    //call
    content = (
      <>
        <View style={styles.OTcontainer}>
          <OTSession
            apiKey="47339381"
            sessionId={
              '1_MX40NzMzOTM4MX5-MTYzNjU0NzE0NDMzMH41MDR0c2V6VlhVN1Y0Q09aaWJnSjN3N21-fg'
            }
            token={
              'T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9Yjc0Njg3ZTlmOGY5MDgyZTdmZjdkNTYyZTQ1NjU1OGI4NTU3Y2I5MjpzZXNzaW9uX2lkPTFfTVg0ME56TXpPVE00TVg1LU1UWXpOalUwTnpFME5ETXpNSDQxTURSMGMyVjZWbGhWTjFZMFEwOWFhV0puU2pOM04yMS1mZyZjcmVhdGVfdGltZT0xNjM2NTQ3MTcxJm5vbmNlPTAuNDc3NDc5MTkwMTA0MzY0MjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYzNzE1MTk3MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
            }
            eventHandlers={sessionEventHandlers}
            // apiKey="46816214"
            // sessionId={notificationData.additionalData.SessionId}
            // token={notificationData.additionalData.TokenId}
          >
            <View style={styles.OTPublishercontainer}>
              <OTPublisher
                properties={publisherProperties}
                eventHandlers={publisherEventHandlers}
                style={{height: 300, width: 400}}
              />
            </View>
            <View style={styles.OTSubscriberContainer}>
              <OTSubscriber
                style={{height: 300, width: 400}}
                eventHandlers={subscriberEventHandlers}
                sessionId={sessionIdFunc}
              />
            </View>
          </OTSession>
          {/* <Image
            resizeMode="contain"
            source={require('../../../assets/Group.png')}
            style={{width: '100%', height: '46%', backgroundColor: 'grey'}}
          /> */}
          {/* <Image
            style={{width: '70%', height: '44%', backgroundColor: 'grey'}}
            source={require('../../../assets/Group.png')}
            resizeMode="contain"></Image> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            setidno(1);
          }}
          style={styles.callcircle}>
          <MaterialCommunityIcons
            name="message"
            style={{alignSelf: 'center'}}
            size={24}
            color={'#fffa'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.roundshape}>
          <MaterialCommunityIcons
            name="phone-hangup-outline"
            size={30}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>

        <View style={styles.BottomTabConatiner}>
          <View style={styles.boundshape}>
            <TouchableOpacity
              disabled={video ? false : true}
              onPress={() => {
                video ? setcamera(pre => !pre) : '';
              }}>
              <View style={styles.nocircle}>
                <Ionicons
                  name="camera-reverse-sharp"
                  style={{alignSelf: 'center'}}
                  size={scale(28)}
                  color={video ? '#696969' : '#a9a9a9'}
                />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  bottom: scale(10),
                  fontSize: 14,
                }}>
                {' '}
                Flip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setvideo(prev => !prev);
              }}
              style={{paddingRight: 40}}>
              <View style={video ? styles.nocircle : styles.circle}>
                <MaterialCommunityIcons
                  name={video ? 'video' : 'video-off'}
                  style={{alignSelf: 'center'}}
                  size={28}
                  color={video ? 'grey' : 'white'}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  bottom: 10,
                  fontSize: 14,
                }}>
                Video
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boundshapetwo}>
            <TouchableOpacity
              onPress={() => {
                setmic(mic => !mic);
              }}
              style={{paddingLeft: 30}}>
              <View style={mic ? styles.nocircle : styles.circle}>
                <Ionicons
                  name={mic ? 'mic' : 'mic-off'}
                  style={{alignSelf: 'center'}}
                  size={28}
                  color={mic ? '#696969' : 'white'}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  bottom: 10,
                  fontSize: 14,
                }}>
                Mute
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={calling ? true : false}
              onPress={() => {
                setAdd(true);
              }}>
              <View style={styles.nocircle}>
                <MaterialCommunityIcons
                  name="account-plus"
                  style={{alignSelf: 'center'}}
                  size={28}
                  color={calling ? '#a9a9a9' : '#696969'}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  bottom: 10,
                  fontSize: 14,
                }}>
                {' '}
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  } else if (idno === 1) {
    //chat
    content = (
      <>
        <View
          style={{
            width: '100%',
            height: '85%',
            marginTop: 60,
            position: 'absolute',
            backgroundColor: 'black',
            alignSelf: 'center',
          }}>
          <FlatList
            contentContainerStyle={{
              alignItems: 'flex-end',
              alignContent: 'space-around',
              padding: 10,
            }}
            keyExtractor={(item, index) => item.id}
            data={chatgoals}
            inverted={true}
            renderItem={chatText}
          />
        </View>
        {videoButton()}
        {/* <Image
resizeMode='contain'
source={require('./assets/group.png')}
style={{width: '60%',  height: '46%', alignSelf: 'center', marginTop: 150}}  
        /> */}

        <View style={styles.textinputandsend}>
          <View style={styles.addinputstyle}>
            <TouchableOpacity style={styles.imageStyle}>
              <MaterialCommunityIcons
                name="paperclip"
                style={{flex: 1}}
                size={22}
                color={'#696969'}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.ChatTxtInput}
              placeholder="Type Message Here"
              onChangeText={goalInputHandler}
              value={enteredGoal}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.sendview}>
            <TouchableOpacity
              onPress={() => {
                if (enteredGoal) {
                  setEnteredGoal('');
                  addGoalHandler(enteredGoal, 'text');
                }
              }}>
              <FontAwesome5
                name="paper-plane"
                style={{alignSelf: 'center'}}
                size={20}
                color={video ? '#696969' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  } else if (idno === 2) {
    //catalog
    content = (
      <>
        {videoButton()}
        <View
          style={{
            width: '100%',
            height: '85%',
            backgroundColor: 'black',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'column',
            marginTop: 90,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              width: '75%',
              backgroundColor: 'white',
              height: '25%',
              marginBottom: 10,
              padding: 20,
              justifyContent: 'space-evenly',
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '700',
              }}>
              Customer Call (English)
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 15,
              }}>
              Product Website
            </Text>
            <Text style={{color: 'grey', fontSize: 15}}>
              Product: Microsoft Surface Go 2
            </Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
          />
          <View
            style={{
              width: '85%',
              backgroundColor: 'grey',
              height: '4%',
              marginTop: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                color: 'white',
              }}>
              * Prices may not reflect promotional discounts{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
                width: '33%',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#000',
                height: 40,
                borderRadius: 5,
              }}>
              <Ionicons
                name="search-outline"
                size={20}
                style={styles.imageStyle}
              />
              <TextInput
                style={{flex: 4}}
                placeholder="Search Product"
                underlineColorAndroid="transparent"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
                width: '33%',

                backgroundColor: '#fff',
                borderWidth: 2.5,
                borderColor: '#FB8B24',
                height: 40,
                borderRadius: 5,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={15}
                  color={'#696969'}
                />
                <Text
                  style={{color: '#FB8B24', fontSize: 13, fontWeight: '700'}}>
                  View Full Catalog
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
  SplashScreen.hide();
  return (
    <View style={styles.fullscreen}>
      {/* //tab and 3 screens */}
      <View style={styles.rowarrayscreen}>
        {array.map((item, index) => (
          <TouchableOpacity
            style={index === idno ? styles.Topcontanier : styles.NoTopcontanier}
            onPress={() => {
              setidno(index);
            }}>
            <Text style={index === idno ? styles.toptext : styles.notoptext}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* //swap screen */}
      <View style={styles.swapscreen}>{content}</View>

      {/* //timer and send contact */}
      {timerandcontactbar && (
        <View style={styles.timerandcontactbar}>
          <View style={styles.timerandcontactbarinside}>
            <View style={styles.timerbar}>
              <Ionicons
                name="alarm-outline"
                style={{alignSelf: 'flex-start'}}
                size={20}
                color={'white'}
              />

              <Text style={{color: 'white', fontSize: 15}}>00 : 00</Text>
            </View>
            <TouchableOpacity
              style={styles.contactontouch}
              onPress={() => {
                setelement('sendcontact');
                setsnackbar(true);
                addGoalHandler(
                  'For further help you may reach me at',
                  'sendcontact',
                );
                setTimeout(() => {
                  setsnackbar(false);
                }, 2000);
              }}>
              <FontAwesome5
                name="address-book"
                style={{alignSelf: 'center'}}
                size={15}
                color={'white'}
              />

              <Text style={{color: 'white', fontSize: 15}}>Send Contact</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{alignSelf: 'flex-start'}}
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* //calling agent  */}
      {calling && (
        <View
          style={{
            backgroundColor: '#696969',
            width: '28%',
            height: '5%',
            alignSelf: 'center',
            marginTop: 66,
            borderTopLeftRadius: 35,
            borderBottomLeftRadius: 35,
            justifyContent: 'center',
            borderTopRightRadius: 35,
            borderBottomRightRadius: 35,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <FontAwesome5 name="phone-square" size={20} color={'white'} />
            <Text style={{color: 'white', textAlign: 'auto', fontSize: 15}}>
              Calling...
            </Text>
          </View>
        </View>
      )}

      {
        // mute bar  for customer
        mute && (
          <View style={styles.mutebar}>
            <View style={styles.mutebarinside}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'left',
                  fontSize: scale(12),
                }}>
                Customer sound : Muted
              </Text>
            </View>
          </View>
        )
      }

      {
        //add for call screen
        add && (
          <View style={styles.ModelBottomTabContainer}>
            <View style={styles.ModelBottomTabTop}>
              <MaterialCommunityIcons
                name="plus"
                style={{color: '#FB8B24'}}
                size={35}
                color={'#696969'}
              />
              <Text style={{color: 'black', fontSize: 25}}>Add Agent</Text>
              <TouchableOpacity
                style={{position: 'absolute', right: 10}}
                onPress={() => {
                  setAdd(false);
                }}>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={35}
                  color={'#696969'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.chatinputstyle}>
              <Ionicons
                name="search-outline"
                size={20}
                style={styles.imageStyle}
              />
              <TextInput
                style={{flex: 1}}
                placeholder="Search Agent name/ skills"
                underlineColorAndroid="transparent"
              />
            </View>
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={AGENT}
              renderItem={addFlatList}
            />
          </View>
        )
      }

      {snackbar &&
        snackBar(
          element === 'sendcontact'
            ? 'contact details shared with customer'
            : element === 'share'
            ? 'product details shared with the customer'
            : 'product added to the cart',
        )}
    </View>
  );
}

const styles = ScaledSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },

  rowarrayscreen: {
    width: '350@s',
    height: '45@vs',
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  swapscreen: {
    width: '100%',
    height: '94%',
    backgroundColor: 'black',
    position: 'absolute',
    top: 46,
  },

  timerandcontactbar: {
    backgroundColor: '#696969',
    width: '230@s',
    height: '36@vs',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '66@vs',
    borderRadius: 35,
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
    // flexDirection: 'row',
  },

  timerandcontactbarinside: {
    width: '200@s',
    height: '20@vs',
    alignSelf: 'center',
    // marginLeft: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },

  mutebar: {
    backgroundColor: '#696969',
    width: '162@s',
    height: '35@vs',
    alignSelf: 'center',
    position: 'absolute',
    top: '120@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },

  // mutebarinside: {
  //   width: '100%',
  //   height: '50%',
  //   // marginLeft: 10,
  // },

  catalogscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    top: '46@vs',
  },

  timerbar: {
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: 'white',
    flex: 1,
    justifyContent: 'space-evenly',
  },

  sendview: {
    position: 'relative',
    alignSelf: 'flex-end',
    marginRight: '10@vs',
    backgroundColor: '#FB8B24',
    height: '40@vs', //any of height
    width: '40@s',
    justifyContent: 'center',
    borderRadius: 75,
  },

  contactontouch: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },

  textinputandsend: {
    width: '100%',
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '10@vs',
  },

  NoTopcontanier: {
    flex: 1,
    height: '40@vs',
    justifyContent: 'flex-start',
    borderBottomColor: 'grey',
    borderRightWidth: '1@s',
    borderRightColor: '#dcdcdc',
  },

  Topcontanier: {
    flex: 1,
    justifyContent: 'flex-start',
    borderBottomColor: '#FB8B24',
    borderBottomWidth: '7@vs',
    borderRightWidth: '1@s',
    height: '40@vs',
    borderRightColor: '#dcdcdc',
  },

  toptext: {
    textAlign: 'center',
    color: '#FB8B24',
    fontSize: '18@ms',
  },

  notoptext: {
    fontSize: '18@ms',
    textAlign: 'center',
    color: 'grey',
  },

  BottomTabConatiner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '78@vs',
    paddingBottom: '20@vs',
    backgroundColor: '#fff5ee',
    // backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  ModelBottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '20@s',
    paddingTop: '20@vs',
    //justifyContent: 'space-evenly',
    width: '100%',
    height: '80%',
    backgroundColor: '#fff5ee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  ModelBottomTabTop: {
    flexDirection: 'row',
    height: '8%',
    width: '100%',
  },

  item: {
    alignSelf: 'center',
    color: 'black',
  },

  roundshape: {
    backgroundColor: '#fa8072',
    // backgroundColor: 'green',
    height: '60@s', //any of height
    width: '60@s', //any of width
    justifyContent: 'center',
    position: 'absolute',
    bottom: '45@vs',
    zIndex: 1,
    alignSelf: 'center',
    borderRadius: 50, // it will be height/2
  },

  boundshape: {
    width: '50%',
    height: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'green',
  },
  boundshapetwo: {
    width: '50%',
    height: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  circle: {
    position: 'relative',
    bottom: '10@vs',
    borderRadius: '40@s',
    backgroundColor: '#808080',
    // backgroundColor: 'green',
    width: '36@s',
    height: '36@s',
    justifyContent: 'center',
  },

  nocircle: {
    position: 'relative',
    bottom: '10@vs',
    width: '36@s',
    height: '36@vs',
    justifyContent: 'center',
  },

  callcircle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '12@s',
    top: '270@vs',
    backgroundColor: '#a9a9',
    // backgroundColor: 'green',
    height: '50@s', //any of height
    width: '50@s',
    justifyContent: 'center',
    borderRadius: 50,
  },

  chatcircle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '270@vs',
    right: '12@s',
    backgroundColor: '#6969',
    // backgroundColor: 'red',
    height: '50@s', //any of height
    width: '50@s',
    zIndex: 1,
    justifyContent: 'center',
    borderRadius: 50,
  },

  nochatcircle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '270@vs',
    right: '12@s',
    backgroundColor: '#FB8B24',
    height: '50@s', //any of height
    width: '50@s',
    zIndex: 1,
    justifyContent: 'center',
    borderRadius: 50,
  },
  textinputstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    left: '10@s',
    alignItems: 'center',
    width: '86%',
    backgroundColor: '#fff',
    // backgroundColor: 'red',
    borderWidth: 0.5,
    borderColor: '#000',
    height: '40@vs',
    borderRadius: 5,
    margin: 10,
    top: 20,
  },

  chatinputstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '20@vs',
    alignItems: 'center',
    width: '93%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: '40@vs',
    borderRadius: 5,
  },

  addinputstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '20@vs',
    left: '20@s',
    alignItems: 'center',
    width: '75%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: '40@vs',
    borderRadius: 7,
  },

  imageStyle: {
    position: 'absolute',
    right: 10,
    height: '25@vs',
    width: '25@s',
  },
  ChatTxtInput: {
    width: '80%',
    padding: 10,
  },
  OTcontainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'relative',
    // marginTop: '10@vs',
    height: '90%',
    // backgroundColor: 'green',
  },
  OTPublishercontainer: {
    width: '100%',
    // backgroundColor: 'yellow',
    height: '50%',
  },
  OTSubscriberContainer: {
    width: '100%',
    // backgroundColor: 'red',
    height: '60%',
  },
});
export default CallScreen;
