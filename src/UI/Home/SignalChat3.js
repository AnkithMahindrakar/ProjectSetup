import React, {Component} from 'react';
import {Button} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

class SignalChat3 extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47339381';
    this.sessionId =
      '1_MX40NzMzOTM4MX5-MTYzNjU0NzE0NDMzMH41MDR0c2V6VlhVN1Y0Q09aaWJnSjN3N21-fg';
    this.token =
      'T1==cGFydG5lcl9pZD00NzMzOTM4MSZzaWc9Yjc0Njg3ZTlmOGY5MDgyZTdmZjdkNTYyZTQ1NjU1OGI4NTU3Y2I5MjpzZXNzaW9uX2lkPTFfTVg0ME56TXpPVE00TVg1LU1UWXpOalUwTnpFME5ETXpNSDQxTURSMGMyVjZWbGhWTjFZMFEwOWFhV0puU2pOM04yMS1mZyZjcmVhdGVfdGltZT0xNjM2NTQ3MTcxJm5vbmNlPTAuNDc3NDc5MTkwMTA0MzY0MjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYzNzE1MTk3MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
    this.state = {
      isConnected: false,
    };
    this.otSessionRef = React.createRef();
    this.sessionEventHandlers = {
      streamCreated: event => {
        console.log('Stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Stream destroyed!', event);
      },
      sessionConnected: event => {
        this.setState({
          isConnected: true,
        });
      },
      signal: event => {
        console.log('signal event', event);
      },
    };
  }

  sendSignal = () => {
    // const {isConnected} = this.state;
    console.log('sendsignal');
    // if (isConnected) {
    this.otSessionRef.current.signal({
      data: 'hello world',
      //   to: '', // optional - connectionId of connected client you want to send the signal to
      //   type: '', // optional
    });
    // }
  };

  render() {
    return (
      <>
        <OTSession
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}
          eventHandlers={this.sesssionEventHandlers}
          ref={this.otSessionRef}>
          {/* <OTPublisher style={{width: 100, height: 100}} />
        <OTSubscriber style={{width: 100, height: 100}} /> */}
        </OTSession>
        <Button title="send" onPress={this.sendSignal} />
      </>
    );
  }
}

export default SignalChat3;
