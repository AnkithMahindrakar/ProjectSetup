import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Dimensions} from 'react-native';
import {OTPublisher, OTSession, OTSubscriber} from 'opentok-react-native';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function App() {
  SplashScreen.hide();
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
    streamCreated: event => {
      console.log('Publisher stream created!');
    },
    streamDestroyed: event => {
      console.log('Publisher stream destroyed!');
    },
    // audioLevel: (number) =>{
    //   console.log('audiolevel', number);
    // }
  };
  const sessionId = value => {
    console.log('the session', value);
  };
  return (
    // <OTSession apiKey="47338451" sessionId="1_MX40NzMzODQ1MX5-MTYzMjE5ODUyMDk3Nn40cGVDQ294NWRlUGl2RERZQ0d5ZlR0aHB-fg"
    // token="T1==cGFydG5lcl9pZD00NzMzODQ1MSZzaWc9MGYwMmFlN2I3Y2E2ZjU3YTM1NzE2MmY2NGQ3ODJmODBiZjQ2YzdmNzpzZXNzaW9uX2lkPTFfTVg0ME56TXpPRFExTVg1LU1UWXpNakU1T0RVeU1EazNObjQwY0dWRFEyOTROV1JsVUdsMlJFUlpRMGQ1WmxSMGFIQi1mZyZjcmVhdGVfdGltZT0xNjMyMTk4NTQ2Jm5vbmNlPTAuNTcwMjk3Mzk2MzkzNTg5NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjMyMjIwMTQ1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9">
    <OTSession
      apiKey="47339381"
      sessionId="1_MX40NzMzOTM4MX5-MTYzMjEzMzM3MjIzOX5QcVovZEg4UEdqRjkrSXdiU0pOeERMYmh-fg"
      token="T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9MGRkZTE2NTFhYTRiZTMzZDYwZGQ4OWZhODA1MzI5Mzg0ZGFhNTc1ODpzZXNzaW9uX2lkPTFfTVg0ME56TXpPVE00TVg1LU1UWXpNakV6TXpNM01qSXpPWDVRY1ZvdlpFZzRVRWRxUmprclNYZGlVMHBPZUVSTVltaC1mZyZjcmVhdGVfdGltZT0xNjMyMTMzNDA5Jm5vbmNlPTAuNjk4MjI0OTg2MzA2MjY2NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjMyMjE5ODE1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9">
      <OTPublisher
        properties={publisherProperties}
        eventHandlers={publisherEventHandlers}
        style={{height: 400, width: 500}}
      />
      <OTSubscriber
        style={{height: 400, width: 500}}
        eventHandlers={subscriberEventHandlers}
        sessionId={sessionId}
      />
    </OTSession>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    position: 'absolute',
    fontSize: 2,

    top: windowWidth * 0.8 * 0.7,
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: windowHeight * 0.8,
    fontFamily: 'Quicksand-Medium',
    left: 35,
  },

  centerItem: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 55,
    position: 'absolute',
    top: 100,
  },
});
export default App;
