import crypto from '../Helper/crypto';
import DataHelper from '../Helper/DataHelper';
import {subscriptionKey} from '../Constants';
import {apiAppId} from '../Constants';
import {apiKey} from '../Constants';
import {apiIv} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urls} from './ApiURLS';
import axios from 'axios';

export const getRetailerConfig = async () => {
  try {
    const data = await AsyncStorage.getItem('RETAILER_CONFIG');
    console.log('Async DATA', data);
    if (data) {
      const configData = JSON.parse(data).data;
      console.log('Retailer config data', configData);
      return configData;
    }
  } catch {
    console.log('Error while getting config data');
  }
};

export const makeHeader = async (value, requestMethod) => {
  const nonce = DataHelper.nonce();
  const timeStamp = Math.floor(new Date().getTime() / 1000);
  const signatureRawData = `${apiAppId}${requestMethod}${timeStamp}${nonce}`;
  const key = crypto.CryptoJS.enc.Utf8.parse(apiKey);
  const iv = crypto.CryptoJS.enc.Utf8.parse(apiIv);
  const options = {
    keySize: 128 / 8,
    iv: iv,
    mode: crypto.CryptoJS.mode.CBC,
    padding: crypto.CryptoJS.pad.Pkcs7,
  };
  const requestSignatureBase64 = crypto.encrypt(
    crypto.CryptoJS.enc.Utf8.parse(signatureRawData),
    key,
    options,
  );
  const authorizationHeader = `aes ${apiAppId}:${requestSignatureBase64}:${nonce}:${timeStamp}`;
  if (value === 'static') {
    console.log('Static subscription key');
    return {
      headers: {
        Authorization: authorizationHeader,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        // 'Content-Type': 'application/json',
      },
    };
  } else {
    console.log('Dynamic subscription key');
    const retConfigData = await getRetailerConfig();
    const decSubKey = crypto.decrypt(
      retConfigData.ApiSubscriptionKey,
      key,
      options,
    );
    console.log('Decrypted ApiSubscriptionKey:', decSubKey);
    return {
      headers: {
        Authorization: authorizationHeader,
        'Ocp-Apim-Subscription-Key': decSubKey,
      },
    };
  }
};

export const login = async (email, password) => {
  // console.log('in login call', email, password);
  const key = crypto.CryptoJS.enc.Utf8.parse(apiKey);
  const iv = crypto.CryptoJS.enc.Utf8.parse(apiIv);
  const options = {
    keySize: 128 / 8,
    iv: iv,
    mode: crypto.CryptoJS.mode.CBC,
    padding: crypto.CryptoJS.pad.Pkcs7,
  };
  const encryptedPassword = crypto.encrypt(
    crypto.CryptoJS.enc.Utf8.parse(password),
    key,
    options,
  );
  const header = await makeHeader('static', 'POST');
  const data = {Email: email, EncPassword: encryptedPassword};
  console.log('Login details:', data);
  console.log(urls.user.login);
  console.log('header....', JSON.stringify(header.headers));
  console.log('Data', data);

  const result = await axios.post(urls.user.login, data, header);

  console.log('Login API Result:', result.status);
  // console.log('Result status:', result.status);
  if (result.status === 200) {
    console.log('Login API Result Data:', JSON.stringify(result.data));
    // console.log('Login API Result Data2:', JSON.stringify(result));
    const localData = {
      data: result.data.data,
      agentSessionID: result.data.agentSessioinId,
    };
    console.log('======================', localData);

    await AsyncStorage.setItem('LOGIN_DATA', JSON.stringify(localData));
    return result;
  } else {
    throw new Error('Invalid login, please try again');
  }
};

export const retailerConfig = async (
  retailerID,
  retailerUserID,
  agentSessionID,
) => {
  const data = {
    RetailerId: retailerID,
    RetailerUserId: retailerUserID,
    AgentSessionId: agentSessionID,
    UserType: 'Agent',
  };

  const header = await makeHeader('static', 'POST');
  console.log('Retailer config params:', data);
  const result = await axios.post(urls.user.retailerConfig, data, header);

  if (result.status === 200) {
    console.log(
      'Retailer config API Result Data:',
      JSON.stringify(result.data),
    );
    const retailerConfigData = {data: result.data.data};
    await AsyncStorage.setItem(
      'RETAILER_CONFIG',
      JSON.stringify(retailerConfigData),
    );
    return result;
  } else {
    throw new Error('Retailer config failed');
  }
};

export const deviceToken = async (
  email,
  appDeviceToken,
  voipToken,
  platform,
  version,
  retailerID,
  retailerUserID,
  agentSessionID,
  oneSignalPlayerID,
) => {
  const data = {
    Email: email,
    AppDeviceToken: appDeviceToken,
    VOIPToken: voipToken,
    DeviceType: platform,
    AppVersion: version,
    RetailerId: retailerID,
    RetailerUserId: retailerUserID,
    AgentSessionId: agentSessionID,
    OneSignalPlayerId_NormalPN: oneSignalPlayerID,
  };

  const header = await makeHeader('static', 'POST');
  console.log('Retailer config params:', data);
  const result = await axios.post(urls.user.token, data, header);

  if (result.status === 200) {
    console.log('Device token API Result Data:', JSON.stringify(result.data));

    return result.data;
  } else {
    throw new Error('Device token failed');
  }
};
