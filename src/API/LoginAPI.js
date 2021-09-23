// [
//   {
//     customStatusCode: 200,
//     message: 'Valid OTP',
//     data: {
//       RetailerUserId: '4e693c3c-3ba1-4823-b668-7394e0e26fb3',
//       RetailerId: 'ad1e4b59-3179-45e3-a58c-c93da19a0429',
//       FirstName: 'Test',
//       LastName: 'Popcornapps',
//       Email: 'test@popcornapps.com',
//       MobileNumber: '+917896541510',
//       EmployeeId: '7',
//       Skills: 'Sales Representative',
//       Status: 'Available',
//       IsActive: true,
//       ProfilePicture: null,
//       StoreId: '10007',
//       StoreName: 'Pop Store',
//       Address: 'Hyderabad',
//       CityName: 'Hyderabad',
//       StateName: 'Telangana',
//       PostalCode: '532211',
//       CountryName: 'India',
//       StoreGuid: '53af697e-9538-4a66-ba87-ef1024a19159',
//     },
//   },
// ];

// {"Email": "aman@popcornapps.com", "Password": "", "EncPassword":"AgAdmPmPdShxwq5sX72IHA== "}
// https://videosolutionapi-stage.azurewebsites.net/Agent/AgentLogin

// export const retailerConfig = async (
//   retailerID,
//   retailerUserID,
//   agentSessionID,
// ) => {
//   const data = {
//     RetailerId: retailerID,
//     RetailerUserId: retailerUserID,
//     AgentSessionId: agentSessionID,
//     UserType: 'Agent',
//   };

//   const header = await makeHeader('static', 'POST');
//   console.log('Retailer config params:', data);
//   const result = await axios.post(urls.user.retailerConfig, data, header);
//   console.log('Retailer config API Result:', result);
//   if (result.status === 200) {
//     console.log(
//       'Retailer config API Result Data:',
//       JSON.stringify(result.data),
//     );
//     const retailerConfigData = {data: result.data.data};
//     await AsyncStorage.setItem(
//       'RETAILER_CONFIG',
//       JSON.stringify(retailerConfigData),
//     );
//   } else {
//     throw new Error('Retailer config failed');
//   }
// };

// const LoginResponseData = await retailerConfig(
//   'ad1e4b59-3179-45e3-a58c-c93da19a0429',
//   'e145e1dc-9f7d-4a13-8bb6-6513e52dfbae',
//   'b3c5b76f-3683-475d-b05f-e0fbfb1060c1',
// );

// [
//   {
//     customStatusCode: 200,
//     data: {
//       Address: '9750 Irvine Blvd',
//       AddtoCart: true,
//       AgentCamera: true,
//       AllSkills: null,
//       ApiSubscriptionKey:
//         'xjHuwhEidM6W0KkWU2MYOcq4Ch5W0Sf4GJdepgfy+Cbw/Hn22tgCMJCl8BuSzk9h',
//       CallLogsLimit: 30,
//       CallRouteTimeinSecs: '55',
//       CallRoutingCount: '3',
//       CallTransferEnabled: true,
//       ChatBackgroundColour: '#000',
//       ChatDesktopBackgroundURL:
//         'https://content.tap-a-tech.com/devadminportal/ad1e4b59-3179-45e3-a58c-c93da19a0429/ChatDesktopBgImages/ad1e4b59-3179-45e3-a58c-c93da19a0429.png',
//       ChatPhoneBackgroundURL:
//         'https://content.tap-a-tech.com/devadminportal/ad1e4b59-3179-45e3-a58c-c93da19a0429/ChatPhoneBgImages/ad1e4b59-3179-45e3-a58c-c93da19a0429.png',
//       ChatUploadFileTypes: 'pdf,png,jpg,jpeg',
//       ChatUploadMaxFileSize: '2048',
//       CityName: 'Irvine',
//       ConnectKey: '/z7RUIa7C4xR2DY4LPg1zw==',
//       CountryName: null,
//       CustomerCamera: true,
//       EnableReserveSession: true,
//       FileUploadAccountKey:
//         'vZRQ+1zpfVTheh1ym93IfOYjC6SvCoM9BqJwT5V0bnBC5UC6IhYLPMuCEuNCq583/4s4BsCVPEvx4cs6UsW+JFGQeGLtM8BQ5J7HkGe9si1GcYMm6/OJCSw2LMzhElIY',
//       FileUploadAccountName: '+WMNlxebxuMsDfv2LWApTqAwWg4WXu/G4arkZgwH43Q=',
//       FileUploadContainerName: 'EZDVwaPtZpN8duZeKMCfMg==',
//       FileUploadStorageUrl: 'BkvScsKtgToCF0+LL/hvm57/g6/QhT4LMSlddCJA1mA=',
//       IsCallRoutingEnabled: true,
//       IsChatEnable: true,
//       IsShopperPassEnabled: true,
//       IsWebViewEnabled: true,
//       JoinSessionPriorTimeInMinutes: 60,
//       PostalCode: '92618',
//       RetailerCurrency: '$',
//       RetailerCurrencyShown: 'Prefix',
//       RetailerName: 'Popcornapps Store',
//       RetailerSupportEmail: 'support@connect.com',
//       RetailerWebsite:
//         'https://www.amazon.in/Zebra-Technologies-DS2278-SR-Wireless-Bluetooth/dp/B076N6FMFJ',
//       ShopperPassName: 'popretail',
//       StateName: 'CA',
//       VideoAppBgImageURL:
//         'https://content.tap-a-tech.com/devadminportal/ad1e4b59-3179-45e3-a58c-c93da19a0429/ExtraAppVideoBgImage/ad1e4b59-3179-45e3-a58c-c93da19a0429.png',
//       VideoDesktopBgImageURL: null,
//       VideoPhoneBgImageURL:
//         'https://devvsrchatcontent.blob.core.windows.net/devadminportal/ad1e4b59-3179-45e3-a58c-c93da19a0429/PhoneBgImgForVideoCall/ad1e4b59-3179-45e3-a58c-c93da19a0429.png',
//     },
//     message: '',
//   },
// ];

[
  {
    customStatusCode: 200,
    message: '',
    agentSessioinId: 'c5a0b9e6-8cc8-4843-8d25-582e2bb72b5c',
    data: {
      SkillIds: [],
      RetailerUserId: '6429b9a2-5000-46c3-a095-003c2a55f33b',
      RetailerId: 'ad1e4b59-3179-45e3-a58c-c93da19a0429',
      FirstName: 'Chintalapudi',
      LastName: 'Pop Dev',
      Email: 'naveen.chintalapudi@popcornapps.com',
      MobileNumber: '9676252145',
      EmployeeId: null,
      Skills: '',
      Status: 'NotAvailable',
      IsActive: true,
      ProfilePicture: null,
      Password: null,
      Username: null,
      IsEmailVerified: true,
    },
  },
];
