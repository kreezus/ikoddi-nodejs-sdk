# ikoddi-nodejs-sdk
The NodeJS Client SDK to communicate with IKODDI, the airtime and SMS delivery plateform in West Africa

## How to install
```sh
npm install --save @ikoddi/client-sdk
```

## How to use it ?

```ts
import {Ikoddi} from '@ikoddi/client/sdk';

// Initialize Ikoddi client with GroupID(account ID) and Api Key
const ikoddiClient = new Ikoddi()
    .withApiKey('XXXXXXXX')
    withGroupId('XXXXX');

// Send SMS
ikoddiClient.sendSMS(['xxxxxxx'],'SENDER', 'My short message');

// Airtime
// Retrieve all internet plans
ikoddiClient.internetPlans();
// Send Airtime
ikoddiClient.sendAirtime(['xxxxxxx'],'11232', '1000');
```