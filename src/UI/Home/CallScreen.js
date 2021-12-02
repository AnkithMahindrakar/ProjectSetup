import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect, useRef} from 'react';
// import {updateAgentStatus} from '../../API/ApiCalls';
import {
  EndAppointment,
  SearchProducts,
  updateAgentStatus,
} from '../../API/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetProductsBySKU} from '../../API/ApiCalls';
import {FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OTPublisher, OTSession, OTSubscriber} from 'opentok-react-native';

///////////////////////////////////////////////////////////////////////

function CallScreen({navigation, route}) {
  const [video, setvideo] = useState(false);
  const [camera, setcamera] = useState(false);
  const [mic, setmic] = useState(true);
  const [idno, setidno] = useState(0);
  const [chatgoals, setChatGoals] = useState([]);
  const [enteredGoal, setEnteredGoal] = useState('');
  const [add, setAdd] = useState(false);
  const [mute, setmute] = useState(false);
  const [calling, setcalling] = useState(false);
  const [snackbar, setsnackbar] = useState(false);
  const [timerandcontactbar, settimerandcontactbar] = useState(true);
  const [element, setelement] = useState('');
  const [categories, setCategories] = useState([{}]);
  const [indicator, setIndicator] = useState(true);
  const [signal, setSignal] = useState({});
  const [text, setText] = useState('');
  const [subscriberDetailsID, setSubscriberDetailsID] = useState();
  const [messages, setMessages] = useState([]);
  const [btnClick, setBtnClick] = useState(false);
  const sessionRef = useRef();
  var array = [{name: 'Call'}, {name: 'Chat'}, {name: 'Catalog'}];
  const {notificationData, decryptedKey, profileData} = route.params;
  let endBtnClick = true;
  // console.log('------------------------', notificationData, decryptedKey);
  console.log('Global messages', messages);
  console.log('subscriber event gloabal', subscriberDetailsID);
  // console.log('------------------------', notificationData.additionalData);
  // console.log(
  //   '------------------------',
  //   notificationData.additionalData.SessionId,
  // );

  const endAppointment = async () => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      await EndAppointment(
        notificationData.additionalData.AppointmentId,
        notificationData.additionalData.RetailerId,
        notificationData.additionalData.RetailerUserId,
        asyncLoginData.agentSessionID,
        'Aborted',
        'Agent',
      );
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };
  const onSearchProducts = async onProduct => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      const searchProducts = await SearchProducts(
        onProduct,
        notificationData.additionalData.RetailerId,
        notificationData.additionalData.RetailerUserId,
        asyncLoginData.agentSessionID,
      );
      if (onProduct === '') {
        const getproductsbysku = await GetProductsBySKU(
          notificationData.additionalData.SKU,
          true,
          notificationData.additionalData.RetailerId,
          notificationData.additionalData.RetailerUserId,
          asyncLoginData.agentSessionID,
        );
        products([getproductsbysku.data.ProductDetails]);
        // setCategories([getproductsbysku.data.ProductDetails]);
      } else {
        products(searchProducts.data);
        // setCategories(searchProducts.data);
      }
      // productstwo(searchProducts.data);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };
  const products = ProductDetails => {
    const cars = [];
    ProductDetails.map((item, index) => {
      const img = JSON.parse(item.ImageUrls).ImageUrls;
      const spece = JSON.parse(item.Specs);
      console.log('specs', spece);
      cars.push({
        Primaryproduct: 'Primary Product',
        Model: spece.Make + '\t' + spece.Model,
        Sku: item.SKU,
        Price: 'Price' + spece.Price,
        url: img[0],
      });
      console.log('pro', cars);
      setCategories(cars);
    });
  };
  const getProductsBySKU = async () => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      const getproductsbysku = await GetProductsBySKU(
        notificationData.additionalData.SKU,
        true,
        notificationData.additionalData.RetailerId,
        notificationData.additionalData.RetailerUserId,
        asyncLoginData.agentSessionID,
      );
      console.log('abc', getproductsbysku.data.ProductDetails.Specs);
      products([getproductsbysku.data.ProductDetails]);
      // setCategories([getproductsbysku.data.ProductDetails]);
      // products(getproductsbysku.data.ProductDetails);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };

  const noSkuvalue = async noskuval => {
    if (
      notificationData.additionalData.SKU == null ||
      notificationData.additionalData.SKU === ''
    ) {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      const searchProducts = await SearchProducts(
        noskuval,
        notificationData.additionalData.RetailerId,
        notificationData.additionalData.RetailerUserId,
        asyncLoginData.agentSessionID,
      );
      products(searchProducts.data);
    } else {
      Promise.all([getProductsBySKU(), updateAgentstatus('Connected')]);
    }
  };

  const updateAgentstatus = async status => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      await updateAgentStatus(
        notificationData.additionalData.RetailerId,
        notificationData.additionalData.RetailerUserId,
        asyncLoginData.agentSessionID,
        status,
      );
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };

  const publisherProperties = {
    publishAudio: mic === true ? true : false,
    audioTrack: true,
    publishVideo: video === true ? true : false,
    cameraPosition: camera === true ? 'front' : 'back',
    resolution: '352x288',
    videoSource: 'camera',
    name: 'Mobile1',
  };

  const subscriberEventHandlers = {
    connected(e) {
      try {
        // console.log('connected yes', notificationData.additionalData.SKU);
        noSkuvalue();
        // setIndicator(false);
        const connetedEvent = e;
        // console.log('connected yes', e);
        // console.log('connected yes 2', connetedEvent.stream.connectionId);

        setSubscriberDetailsID(connetedEvent.stream.connectionId);
        Promise.all([getProductsBySKU(), updateAgentstatus('Connected')]);
        setIndicator(false);
      } catch (e) {
        console.log(e);
      }
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
    videoEnabled(e) {
      console.log('videoEnabled', e);
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
      console.log(
        'check check check',
        subscriberDetailsID === obj.connectionId,
      );
      console.log('check connection ID', obj.connectionId);
      console.log('check subscriber ID', subscriberDetailsID);
      // if (subscriberDetailsID !== obj.connectionId) {
      if (!btnClick) {
        // console.log(
        //   'check check check2222222',
        //   subscriberDetailsID !== obj.connectionId,
        // );
        Promise.all([endAppointment(), updateAgentstatus('Available')]);
        navigation.pop();
        // setBtnClick(true);
      }
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
    signal: event => {
      const parsedEventData = JSON.parse(event.data);
      console.log('events 3', parsedEventData.type);
      console.log('events 2', event.data);
      console.log('events', event);
      // console.log('events 2', JSON.parse(event.data));
      if (
        parsedEventData.type === 'MESSAGEFROMAGENT' ||
        parsedEventData.type === 'MESSAGEFROMCUSTOMER'
      ) {
        if (event.data) {
          console.log('Messages', messages);
          const chatDataJson = event.data;
          const chatData = JSON.parse(chatDataJson);
          console.log('chatData', chatData.data);
          // console.log('chatData2', chatData.data.data);
          setMessages(prevMsg => {
            // return [{data: `Me: ${event.data}`, type: 'SignalMsg'}, ...prevMsg];
            // return [{event}, ...prevMsg];
            return [
              {
                data: chatData.data,
                type: chatData.type,
                agentName: chatData.agentName,
              },
              ...prevMsg,
            ];
          });
        }
      } else if (parsedEventData.type === 'CONTACTDETAILS') {
        // console.log('Messages', messages);
        const chatDataJson = event.data;
        const chatData = JSON.parse(chatDataJson);
        console.log('chatData', chatData.data);
      } else {
        console.log('NOTHING');
      }
    },
  };
  const sendSignalHandler = (textData, type) => {
    if (type === 'MESSAGEFROMAGENT') {
      const signalData = {
        data: textData,
        type: type,
        agentName: profileData.data.FirstName,
      };

      if (text) {
        sessionRef.current.signal({
          data: JSON.stringify(signalData),
        });
        setText('');
      }
    } else if (type === 'CONTACTDETAILS') {
      console.log('CONTACT DETAILS', textData);
      const signalData = {
        data: textData,
        type: type,
        // agentName: profileData.data.FirstName,
      };
      console.log('CONTACT DETAILS 2', signalData);

      sessionRef.current.signal({
        data: JSON.stringify(signalData),
      });
      // setText('');
    } else if (type === 'ADDTOCART') {
      const signalData = {
        data: textData,
        type: type,
        price: '1190',
        // agentName: profileData.data.FirstName,
      };
      sessionRef.current.signal({
        data: JSON.stringify(signalData),
      });
    } else if (type === 'PRODUCTDETAILS') {
      const signalData = {
        data: textData,
        type: type,
        // price: '1190',
        // agentName: profileData.data.FirstName,
      };
      sessionRef.current.signal({
        data: JSON.stringify(signalData),
      });
    }
  };
  const sessionIdFunc = value => {
    console.log('the session', value);
  };

  const publisherEventHandlers = {
    streamCreated: event => {
      console.log('Publisher stream created!');
    },
    streamDestroyed: event => {
      console.log('Publisher stream destroyed!');
    },
  };

  const sessionId = value => {
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
          {itemData.item.Primaryproduct}
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
            source={{
              uri: itemData.item.url,
            }}
            // source={require('../../../assets/Laptop.png')}
            style={{width: 50, height: 50}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'grey', fontSize: 15, fontWeight: '700'}}>
              {itemData.item.Model}
            </Text>
            <Text style={{color: 'grey', fontSize: 15}}>
              {itemData.item.Sku}
            </Text>
            <Text style={{color: 'grey', fontSize: 15, fontWeight: '700'}}>
              {itemData.item.Price}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <View
            style={{
              width: 60,
              height: 30,
              backgroundColor: 'white',
              borderColor: '#FB8B24',
              borderWidth: 2,
              borderRadius: 6,
              justifyContent: 'center',
            }}> */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: 60,
              height: 30,
              backgroundColor: 'white',
              borderColor: '#FB8B24',
              borderWidth: 2,
              borderRadius: 6,
              alignItems: 'center',
              // justifyContent: 'center',
            }}
            onPress={() => {
              setelement('share');
              setsnackbar(true);
              setTimeout(() => {
                setsnackbar(false);
              }, 1000);
              addGoalHandler(itemData.item.Model, 'share');
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
          {/* </View> */}

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
                addGoalHandler(itemData.item.Model, 'addtocart');
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
  const chatText = ({item}) => {
    // chat screen text
    if (item.type === 'CONTACTDETAILS') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 15,
            // alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'black', fontSize: 15, textAlign: 'left'}}>
              {item.data}
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
                {/* {profileData.data.FirstName}
                {profileData.data.LastName} */}
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
    } else if (item.type === 'share') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: '#FB8B24',
            // backgroundColor: 'white',
            marginBottom: 15,
            // alignItems: 'center',
            justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            alignSelf: 'flex-end',
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
            {item.data}
          </Text>
        </View>
      );
    } else if (item.type === 'addtocart') {
      return (
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginBottom: 15,
            alignSelf: 'flex-end',
            // justifyContent: 'center',
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text style={{color: 'black', fontSize: 15}}>
            Request to add to cart sent to Customer for
          </Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            {item.data}
          </Text>
        </View>
      );
    } else {
      return (
        // <View
        //   style={{
        //     // padding: 10,
        //     // position: 'absolute',
        //     backgroundColor: 'red',
        //     // marginVertical: 10,
        //     // alignItems: 'center',
        //     // justifyContent: 'center',
        //     // borderBottomEndRadius: 20,
        //     // borderBottomLeftRadius: 20,
        //     // borderTopLeftRadius: 20,
        //   }}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: 'white',
            marginVertical: 6,
            borderBottomRightRadius: 20,
            // alignItems: 'center',
            // justifyContent: 'center',
            // borderBottomRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: item.type === 'MESSAGEFROMAGENT' ? 20 : 0,
            borderTopRightRadius: item.type === 'MESSAGEFROMAGENT' ? 0 : 20,
            alignSelf:
              item.type === 'MESSAGEFROMAGENT' ? 'flex-end' : 'flex-start',
            // flex: 1,
          }}>
          {/* <View> */}
          {item.type !== 'MESSAGEFROMAGENT' && (
            <Text style={{color: '#19a3ff', fontSize: 15, textAlign: 'left'}}>
              Customer
            </Text>
          )}
          <Text style={{color: 'black', fontSize: 14, textAlign: 'left'}}>
            {item.data}
          </Text>
          {/* </View> */}
          {/* </View> */}
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
    setMessages(prevMsg => {
      return [{data: goalTitle, type: type}, ...prevMsg];
    });
  };

  //set the text
  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };
  //tabs

  //call

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
      <View style={styles.swapscreen}>
        {indicator && (
          <Modal transparent={true}>
            <View
              style={{
                backgroundColor: 'black',
                flex: 1,
                justifyContent: 'center',
                opacity: 0.65,
                // position: 'absolute',
              }}>
              <ActivityIndicator size="large" color="#FB8B24" />
            </View>
          </Modal>
        )}
        <View
          style={{
            display: idno === 0 ? 'flex' : 'none',
            flex: 1,
          }}>
          <View style={styles.OTcontainer}>
            <OTSession
              // apiKey="47339381"
              // sessionId="2_MX40NzMzOTM4MX5-MTYzNzIxMDk2MzYwOX5kbytIUEYvaisvMlY0TnJRRFphWS9qQml-fg"
              // token="T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9NDYzMGYyMWU5YmRmMzQ5ZDVhZTdlNjc0NmZiOThlZjg5ZTY0N2RmNTpzZXNzaW9uX2lkPTJfTVg0ME56TXpPVE00TVg1LU1UWXpOekl4TURrMk16WXdPWDVrYnl0SVVFWXZhaXN2TWxZMFRuSlJSRnBoV1M5cVFtbC1mZyZjcmVhdGVfdGltZT0xNjM3MjExMDA5Jm5vbmNlPTAuNTcxOTM2OTk5MjA1ODk3MSZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTYzOTgwMzAwOCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
              eventHandlers={sessionEventHandlers}
              // apiKey="47383431"
              // sessionId="2_MX40NzM4MzQzMX5-MTYzNzY0NzE3OTM1N34zaDYwMnoyRkgxYUFjK3V5V3RIYTFrbU9-fg"
              // token="T1==cGFydG5lcl9pZD00NzM4MzQzMSZzaWc9OGZhYWRmMTc0NDQ2MTcxNjQwOTA0NWMwNjQ0MDE0MDkzYTU4ZTgxNTpzZXNzaW9uX2lkPTJfTVg0ME56TTRNelF6TVg1LU1UWXpOelkwTnpFM09UTTFOMzR6YURZd01ub3lSa2d4WVVGakszVjVWM1JJWVRGcmJVOS1mZyZjcmVhdGVfdGltZT0xNjM3NjQ3MTc5Jm5vbmNlPTAuMDg2NDcxMDY3MDI4MTY5NDImcm9sZT1tb2RlcmF0b3ImZXhwaXJlX3RpbWU9MTYzODI1MTk3OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
              apiKey={decryptedKey}
              sessionId={notificationData.additionalData.SessionId}
              token={notificationData.additionalData.TokenId}
              signal={signal}
              ref={sessionRef}>
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

          <TouchableOpacity
            style={styles.roundshape}
            onPress={() => {
              setBtnClick(true);

              console.log('endBtnClickendBtnClickendBtnClick===', endBtnClick);
              Promise.all([endAppointment(), updateAgentstatus('Available')]);
              navigation.pop();
            }}>
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
        </View>

        <View style={{display: idno === 1 ? 'flex' : 'none', flex: 1}}>
          {/* <OTSession
              apiKey="47339381"
              sessionId="2_MX40NzMzOTM4MX5-MTYzNzIxMDk2MzYwOX5kbytIUEYvaisvMlY0TnJRRFphWS9qQml-fg"
              token="T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9NDYzMGYyMWU5YmRmMzQ5ZDVhZTdlNjc0NmZiOThlZjg5ZTY0N2RmNTpzZXNzaW9uX2lkPTJfTVg0ME56TXpPVE00TVg1LU1UWXpOekl4TURrMk16WXdPWDVrYnl0SVVFWXZhaXN2TWxZMFRuSlJSRnBoV1M5cVFtbC1mZyZjcmVhdGVfdGltZT0xNjM3MjExMDA5Jm5vbmNlPTAuNTcxOTM2OTk5MjA1ODk3MSZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTYzOTgwMzAwOCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
              eventHandlers={sessionEventHandlers}
              // apiKey="46816214"
              // sessionId={notificationData.additionalData.SessionId}
              // token={notificationData.additionalData.TokenId}
              signal={signal}
              ref={sessionRef}></OTSession> */}
          {/* <View
            style={{
              width: '100%',
              height: '100%',
              // marginTop: 30,
              // position: 'absolute',
              backgroundColor: 'yellow',
              alignSelf: 'center',
              // alignItems: 'center',
              paddingBottom: 35,
            }}> */}
          <View
            style={{
              backgroundColor: 'black',
              flex: 1,
              paddingBottom: 70,
              paddingHorizontal: 10,
            }}>
            <FlatList
              // contentContainerStyle={{
              //   alignItems: 'flex-end',
              //   alignContent: 'space-around',
              //   padding: 10,
              // }}
              keyExtractor={(item, index) => index}
              data={messages}
              inverted
              renderItem={chatText}
            />
          </View>
          {/* </View> */}
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
                  size={25}
                  color={'#696969'}
                />
              </TouchableOpacity>
              <TextInput
                style={{width: '80%', color: 'black'}}
                placeholder="Type Message Here"
                onChangeText={val => {
                  console.log('textvalue', val);
                  setText(val);
                }}
                value={text}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.sendview}>
              <TouchableOpacity
                onPress={() => {
                  sendSignalHandler(text, 'MESSAGEFROMAGENT');
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
        </View>

        <View style={{display: idno === 2 ? 'flex' : 'none', flex: 1}}>
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
                Product:{notificationData.additionalData.ProductTitle}
              </Text>
            </View>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={categories}
              initialNumToRender={5}
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
                  onChangeText={
                    notificationData.additionalData.SKU == null ||
                    notificationData.additionalData.SKU === ''
                      ? noSkuvalue
                      : onSearchProducts
                  }
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
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={15}
                    color={'#696969'}
                  />
                  <Text
                    style={{
                      color: '#FB8B24',
                      fontSize: 13,
                      fontWeight: '700',
                    }}>
                    View Full Catalog
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

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
                const requiredData = {
                  // FirstName: profileData.data.FirstName,
                  // LastName: profileData.data.LastName,
                  // FirstName: 'Anki',
                  // LastName: 'Mahindra',
                  agentName: profileData.data.FirstName,
                  email: 'eamil.com',
                };
                setelement('CONTACTDETAILS');
                setsnackbar(true);
                sendSignalHandler(requiredData, 'CONTACTDETAILS');
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
            <Text
              style={{
                color: 'white',
                textAlign: 'left',
                fontSize: scale(12),
              }}>
              Customer sound : Muted
            </Text>
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
          element === 'CONTACTDETAILS'
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
    bottom: 10,
    borderRadius: 150 / 2,
    backgroundColor: '#808080',
    width: 40,
    height: 40,
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
