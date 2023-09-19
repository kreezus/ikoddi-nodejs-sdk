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
    private apiKey?: string;
    private apiBaseURL: string;
    private groupId?: string;
    private otpAppId?: string;

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

    private _validateRequiredParameters() {
        const requiredParams = [
            {name: 'Api Base URL', value: this.apiBaseURL},
            {name: 'Api Key', value: this.apiKey},
            {name: 'Group ID', value: this.groupId},
        ];

        for (const {name, value} of requiredParams) {
            if (value === null || value === undefined) {
                throw new Error(`${name} should be defined`);
            }
        }
    }

    private async _makeRequest<T>(
        method: "get" | "post",
        endpoint: string,
        data?: any
    ): Promise<T> {
        this._validateRequiredParameters();
        const url = `${this.apiBaseURL}${this.groupId}${endpoint}`;

        const config = {
            headers: {
                "Content-type": "application/json",
                "x-api-key": this.apiKey,
            },
        };

        try {
            if (method === "get") {
                return (await axios.get<T>(url, config)).data;
            }
            return (await axios.post<T>(url, JSON.stringify(data), config)).data;
        } catch (err) {
            throw err;
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
        return this._makeRequest("post", "/airtimes", {
            sentTo: numbers,
            ref,
            amount,
            campaignName,
            countryNumberCode: phonecode,
            countryStringCode: isoCode,
        });
    }

    async sendSMS(
        numbers: Array<string>,
        from: string,
        message: string,
        smsBroadCast: string,
        phonecode: string = "226",
        isoCode: string = "BF"
    ): Promise<SMS[]> {
        return this._makeRequest<SMS[]>("post", "/sms", {
            sentTo: numbers,
            message,
            from,
            smsBroadCast,
            countryNumberCode: phonecode,
            countryStringCode: isoCode,
        });
    }

    async sendOTP(
        identity: string,
        type: "sms" | "email" = "sms"
    ): Promise<OTPResponse> {
        this._validateRequiredParameters();
        if (!this.otpAppId) {
            throw new Error("OTP App ID should be defined");
        }
        return this._makeRequest<OTPResponse>("post", `/otp/${this.otpAppId}/${type}/${encodeURI(identity)}`);
    }

    async verifyOTP(otpData: {
        verificationKey: string;
        otp: string;
        identity: string;
    }): Promise<VerifyOPTResponse> {
        this._validateRequiredParameters();
        if (!this.otpAppId) {
            throw new Error("OTP App ID should be defined");
        }
        return this._makeRequest<VerifyOPTResponse>("post", `/otp/${this.otpAppId}/verify`, otpData);
    }

    async internetPlans() {
        this._validateRequiredParameters();
        return this._makeRequest("get", '/airtimes/internet-plans');
    }
}
