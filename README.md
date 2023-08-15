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
