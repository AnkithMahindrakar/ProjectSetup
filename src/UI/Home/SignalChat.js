import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import {OTSession} from 'opentok-react-native';

const SignalChat = () => {
  const [signal, setSignal] = useState({});
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionankit, setSessionankit] = useState();
  let oldMessages;
  let sessionRef = useRef();
  console.log('messages', messages);
  console.log('state ref data', sessionRef);
  //   var session;

  useEffect(() => {
    // Session.connect();
  });

  const apiKey = '47339381';
  const sessionId =
    '1_MX40NzMzOTM4MX5-MTYzNjU0NzE0NDMzMH41MDR0c2V6VlhVN1Y0Q09aaWJnSjN3N21-fg';
  const token =
    'T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9Yjc0Njg3ZTlmOGY5MDgyZTdmZjdkNTYyZTQ1NjU1OGI4NTU3Y2I5MjpzZXNzaW9uX2lkPTFfTVg0ME56TXpPVE00TVg1LU1UWXpOalUwTnpFME5ETXpNSDQxTURSMGMyVjZWbGhWTjFZMFEwOWFhV0puU2pOM04yMS1mZyZjcmVhdGVfdGltZT0xNjM2NTQ3MTcxJm5vbmNlPTAuNDc3NDc5MTkwMTA0MzY0MjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYzNzE1MTk3MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

  const sessionEventHandlers = {
    // stream: event => {
    //   console.log('stream event', event);
    // },
    signal: event => {
      console.log('events', event.type);
      if (event.data) {
        const myConnectionId =
          sessionRef.getSessionInfo().connection.connectionId;
        // oldMessages = messages;
        // console.log('myConnection ID', myConnectionId);
        // console.log('oldMessages', oldMessages);
        // const messages = [{...oldMessages}, {data: `Me: ${event.data}`}];

        // const messages =
        //   event.connectionId === myConnectionId
        //     ? [...oldMessages, {data: `Me: ${event.data}`}]
        //     : [...oldMessages, {data: `Other: ${event.data}`}];
        console.log('Messages', messages);
        setMessages(prevMsg => {
          return [...prevMsg, {data: `Me: ${event.data}`}];
        });
      }
    },
  };

  const sendSignal2 = () => {
    if (text) {
      sessionRef.current.signal({
        data: text,
      });
      setText('');
    }
  };
  const sendSignal = () => {
    if (text) {
      setSignal({type: '', data: text});
      setText('');
    }
  };
  const _keyExtractor = (item, index) => index;
  const _renderItem = ({item}) => <Text style={styles.item}>{item.data}</Text>;

  return (
    <View style={{flex: 1}}>
      <Text style={styles.mainText}>
        {' '}
        OpenTok React Native Signaling Functional
      </Text>
      <OTSession
        apiKey={apiKey}
        sessionId={sessionId}
        token={token}
        signal={signal}
        eventHandlers={sessionEventHandlers}
        // ref={e => {
        //   // console.log('ref event', e.state.sessionInfo.connection.connectionId);

        //   // sessionRef = e.state.sessionInfo.connection.connectionId;
        // }}
        ref={sessionRef}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color: 'black',
        }}
        onChangeText={val => {
          setText(val);
        }}
        value={text}
      />
      <Button
        onPress={() => {
          sendSignal2();
        }}
        title="Send Signal"
      />
      <FlatList
        data={messages}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'black',
  },
  mainText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    color: 'black',
  },
});
export default SignalChat;
///////////////////////////////////////////////////////////////////////////////////////

// import React, {useRef} from 'react';
// // import {OTSession} from 'opentok-react';
// import {OTSession} from 'opentok-react-native';
// import {Button} from 'react-native';

// function SignalChat() {
//   const sessionRef = useRef();

//   const sendSignal = () => {
//     sessionRef.current.sessionHelper.session.signal(
//       {
//         type: 'TheSignalType',
//         data: 'TheData',
//       },
//       function (error) {
//         if (error) {
//           console.log('signal error: ' + error.message);
//         } else {
//           console.log('signal sent');
//         }
//       },
//     );
//   };

//   return (
//     <OTSession
//       ref={sessionRef}
//       apiKey="47339381"
//       sessionId="1_MX40NzMzOTM4MX5-MTYzNjU0NzE0NDMzMH41MDR0c2V6VlhVN1Y0Q09aaWJnSjN3N21-fg"
//       token="T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9Yjc0Njg3ZTlmOGY5MDgyZTdmZjdkNTYyZTQ1NjU1OGI4NTU3Y2I5MjpzZXNzaW9uX2lkPTFfTVg0ME56TXpPVE00TVg1LU1UWXpOalUwTnpFME5ETXpNSDQxTURSMGMyVjZWbGhWTjFZMFEwOWFhV0puU2pOM04yMS1mZyZjcmVhdGVfdGltZT0xNjM2NTQ3MTcxJm5vbmNlPTAuNDc3NDc5MTkwMTA0MzY0MjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYzNzE1MTk3MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
//       // eventHandlers={eventHandlers}
//     >
//       <Button title="send" onPress={sendSignal} />
//     </OTSession>
//   );
// }

// export default SignalChat;
