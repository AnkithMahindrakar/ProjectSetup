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
