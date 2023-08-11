const { Ikoddi } = require("./src/ikoddi");

const smsAccount = new Ikoddi()
  .withApiKey("9V1yvLG5m6zOp6zz4X6HI6N1YbZgdIQj")
  .withApiBaseURL("https://api.staging.ikoddi.com/api/v1/groups/")
  .withGroupId("10268496");
const airtimeAccount = new Ikoddi()
  .withApiKey("OyDOoUbrAaWMm5U67j4JIzwhzUeZvGWT")
  .withApiBaseURL("https://api.staging.ikoddi.com/api/v1/groups/")
  .withGroupId("10268496");

// const sendAirtime = async () => {
//   try {
//     const response = await airtimeAccount.sendAirtime(
//       ["22660101825"],
//       "12131",
//       "1000",
//       "Ma Campagne"
//     );
//     console.log(JSON.stringify(response.data));
//   } catch (error) {
//     console.error("(TEST)Error sending airtime ", error);
//   }
// };

const sendSMS = async () => {
  await smsAccount
    .sendSMS(["22660101825"], "Raoul", "Hello la famille de dev", "Ma Campagne")
    .then((res) => {
      console.log(res);
    });
};

const getInternetPlans = async () => {
  await airtimeAccount.internetPlans().then((res) => {
    console.log(res);
  });
};

// sendAirtime().catch((error) => console.error(error));
getInternetPlans().catch((error) => console.error(error));
// sendSMS().catch((error) => console.error(error));
