import axios from "axios";

export const SMSStatus = {
  SendingOK: "SendingOK",
  SendingOKNoReport: "SendingOKNoReport",
  SendingError: "SendingError",
  DeliveryOK: "DeliveryOK",
  DeliveryFailed: "DeliveryFailed",
  DeliveryPending: "DeliveryPending",
  DeliveryUnknown: "DeliveryUnknown",
  Error: "Error",
};
export type SMSStatus = (typeof SMSStatus)[keyof typeof SMSStatus];

export const SMSSMSCStatus = {
  DeliverySuccess: "DeliverySuccess",
  DeliveryFailure: "DeliveryFailure",
  MessageBuffered: "MessageBuffered",
  SmscSubmit: "SmscSubmit",
  SmscReject: "SmscReject",
};

export type SMSSMSCStatus = (typeof SMSSMSCStatus)[keyof typeof SMSSMSCStatus];
export type SMS = {
  id: string;
  to: string;
  message: string;
  from: string;
  cost: number;
  smsAccountId: string;
  status: SMSStatus;
  smscStatus: SMSSMSCStatus | null;
  smsBroadCast: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OTPResponse = {
  status: 0 | -1;
  otpToken: string;
};

export type VerifyOPTRequest = {
  identity: string;
  otp: string;
  verificationKey: string;
};
export type VerifyOPTResponse = {
  identity: string;
  otp: string;
  verificationKey: string;
};

export class Ikoddi {
  private apiKey: string | undefined;
  private apiBaseURL: string;
  private groupId: string | undefined;
  private otpAppId: string | undefined;
  constructor() {
    this.apiBaseURL = "https://api.ikoddi.com/api/v1/groups/";
  }

  withApiKey(apiKey: string): Ikoddi {
    this.apiKey = apiKey;
    return this;
  }
  withApiBaseURL(apiBaseURL: string): Ikoddi {
    this.apiBaseURL = apiBaseURL;
    return this;
  }
  withGroupId(groupId: string): Ikoddi {
    this.groupId = groupId;
    return this;
  }
  withOtpAppId(otpAppId: string): Ikoddi {
    this.otpAppId = otpAppId;
    return this;
  }
  _assertAllParametersAreCorrect() {
    if (this.apiBaseURL === null || this.apiBaseURL === undefined) {
      throw new Error("Api Base URL should be defined");
    }
    if (this.apiKey === null || this.apiKey === undefined) {
      throw new Error("Api Key should be defined");
    }
    if (this.groupId === null || this.groupId === undefined) {
      throw new Error("The group ID should be defined");
    }
  }
  async sendAirtime(
    numbers: Array<string>,
    ref: string,
    amount: string,
    campaignName: string,
    phonecode: string = "226",
    isoCode: string = "BF"
  ) {
    this._assertAllParametersAreCorrect();
    const data = {
      sentTo: numbers,
      ref: ref,
      amount: amount,
      campaignName: campaignName,
      countryNumberCode: phonecode,
      countryStringCode: isoCode,
    };
    try {
      const airtime = await axios.post(
        `${this.apiBaseURL}${this.groupId}/airtimes`,
        JSON.stringify(data),
        {
          headers: {
            "Content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return airtime;
    } catch (err) {
      throw err;
    }
  }
  async sendSMS(
    numbers: Array<string>,
    from: string,
    message: string,
    smsBroadCast: string,
    phonecode: string = "226",
    isoCode: string = "BF"
  ): Promise<SMS[]> {
    this._assertAllParametersAreCorrect();
    const data = {
      sentTo: numbers,
      message: message,
      from: from,
      smsBroadCast: smsBroadCast,
      countryNumberCode: phonecode,
      countryStringCode: isoCode,
    };
    try {
      const sms = await axios.post(
        `${this.apiBaseURL}${this.groupId}/sms`,
        JSON.stringify(data),
        {
          headers: {
            "Content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return sms.data;
    } catch (err) {
      throw err;
    }
  }
  async sendOTP(
    identity: string,
    type: "sms" | "email" = "sms"
  ): Promise<OTPResponse> {
    this._assertAllParametersAreCorrect();
    if (this.otpAppId === null || this.otpAppId === undefined) {
      throw new Error("OTP App ID should be defined");
    }
    try {
      const otpResponse = await axios.post(
        `${this.apiBaseURL}${this.groupId}/otp/${
          this.otpAppId
        }/${type}/${encodeURI(identity)}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return otpResponse.data;
    } catch (err) {
      throw err;
    }
  }
  async verifyOTP(otpData: {
    verificationKey: string;
    otp: string;
    identity: string;
  }): Promise<OTPResponse> {
    this._assertAllParametersAreCorrect();
    if (this.otpAppId === null || this.otpAppId === undefined) {
      throw new Error("OTP App ID should be defined");
    }
    try {
      const otpResponse = await axios.post(
        `${this.apiBaseURL}${this.groupId}/otp/${this.otpAppId}/verify`,
        otpData,
        {
          headers: {
            "Content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return otpResponse.data;
    } catch (err) {
      throw err;
    }
  }
  async internetPlans() {
    this._assertAllParametersAreCorrect();
    try {
      const internetPlans = await axios.get(
        `${this.apiBaseURL}${this.groupId}/airtimes/internet-plans`,
        {
          headers: {
            "Content-type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return internetPlans;
    } catch (err) {
      throw err;
    }
  }
}
