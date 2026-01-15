# ikoddi-nodejs-sdk

The NodeJS Client SDK to communicate with IKODDI, the airtime and SMS delivery plateform in West Africa

## How to install

```sh
npm install --save ikoddi-client-sdk
```

## How to use it ?

```ts

import { Ikoddi } from "ikoddi-client-sdk";

/**AIRTIME**/

//Initialization of the API key for sending AIRTIME, the URL, and the GroupId (organization_id)
const ikoddiClient = new Ikoddi()
  .withApiKey("OyDOoUbrAaWMm5U67j4JIzwhzUeZvGWT")
  .withGroupId("10268496");
/*For testing purposes,
add .withApiBaseURL("https://api.staging.ikoddi.com/api/v1/groups/")
during initialization.*/

// Retrieve all internet plans
const internetPlans = await ikoddiClient.internetPlans();

// Send airtime
ikoddiClient.sendAirtime(["22660101825"], "12131", "1000", "Monthly recharge");

/* sendAirtime methode attributes :
numbers : List of number to send airtime,
ref : The airtime reference;
      for mobile credit, use 11101 for Orange operator, 12131 for Moov operator, 13160 for Telecel operator.
      for the internet package, use a reference that you obtain by retrieving the reference list.
amount : airtime amount,
campagnName : This is the name you give to this transaction,
phoneCode : This is your international phone identifier. Default is 226,
isoCode : This is the ISO code of your country. Default is BF
*/

/**SMS**/

//Initialization of the API key for sending SMS, the URL, and the GroupId (organization_id)
const ikoddiClient = new Ikoddi()
  .withApiKey("OyDOoUbrAaWMm5U67j4JIzwhzUeZvGWT")
  .withGroupId("10268496");
/*For testing purposes,
add .withApiBaseURL("https://api.staging.ikoddi.com/api/v1/groups/")
during initialization.*/

//Send SMS
ikoddiClient.sendSMS(["22660101825"],"Raoul","Hello les devs","Daily message");

/* sendAirtime methode attributes :
numbers : List of number to send sms,
from : The person or organization sending the message,
message : The message,
smsBroadCast :This is the name you give to this bulk message sending,
phoneCode : This is your international phone identifier. Default is 226,
isoCode : This is the ISO code of your country. Default is BF
*/
```

## OTP As A Service

```ts
// 1- Initialize Ikoddi Client
const ikoddiClient = new Ikoddi()
  .withApiKey("OyDOoUbrAaWMm5U67j4JIzwhzUeZvGWT")
  .withGroupId("10268496")
  // Create an OTP App and set its value
  .withOtpAppId("clmecvbby0000j39j4ozy2z3c");

// 2- Send OTP Code
//send on a single OTP channel
const otpResponse = await ikoddiClient.sendOTP("22670707070", "sms");
console.log(otpResponse);
// {"status":0,"otpToken":"UCQS2bNyfVOKENFcCnQTV17OTL/Ja2rt0ku5C0aZMopzE0kQOX10OQ4RF8aT2zQTN0LsTiozcY9e1YMxK7xAd8Tbz1xNnFMlIfz43D0ZQofy3TVAed1zmg52a1+29GGYGuN0NSzvE5fVPFxWvk0jC0f8q8R/84BxhmZD2OaMGVkh1DufftnSXvnV8LXtCMI3"}

// or
// send to multiple OTP channels

const otpResponse = await ikoddiClient.sendMultiOTP({
    identities: [
      {
        identity: "22670707070",
        channel: "SMS",
      },
      {
        identity: "22670707070",
        channel: "WHATSAPP",
      },
    ],
  });
console.log(otpResponse);
// {
//   status: 0,
//   otpToken: 'o2G3oFb4QdJJTqqrnFE67XzVbeVin8n22H4PnzWAYsrwqWWYT01U9RFxLd9ZTdSd6TQy5XSnNiTF+5TeCYakq7OdYWQKAg4TudNvAXjARoSbnLRHpQhruKp2Roz0743lTXIwhnvGhHIrGTZLm3iEZ+mx+4L8ama2ZGLCmSiyKrJfMPDq8YA29oEBu+fwOfa2JalPSZosknTdu4iYOKpXHoOAhdoZRhFqVROX8lOzz5SViVH5PhKnJyNh9GOXRcMN',
//   results: [
//     { identity: '22670707070',
//       channel: 'SMS',
//       success: true 
//     },
//     {
//       identity: '22670707070',
//       channel: 'WHATSAPP',
//       success: true,
//     }
//   ]
// }

// The User should receive an OTP code

// 3- Verify the OTP
const otpVerifyResponse = await ikoddiClient
  .verifyOTP({ identity: "22670707070", otp: "629185", verificationKey: otpResponse.otpToken })
console.log(otpVerifyResponse);
// {"status":0,"message":"OTP Matched for 22670707070"}


```