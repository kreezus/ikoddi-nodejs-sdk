export declare const SMSStatus: {
    SendingOK: string;
    SendingOKNoReport: string;
    SendingError: string;
    DeliveryOK: string;
    DeliveryFailed: string;
    DeliveryPending: string;
    DeliveryUnknown: string;
    Error: string;
};
export type SMSStatus = (typeof SMSStatus)[keyof typeof SMSStatus];
export declare const SMSSMSCStatus: {
    DeliverySuccess: string;
    DeliveryFailure: string;
    MessageBuffered: string;
    SmscSubmit: string;
    SmscReject: string;
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
export declare class Ikoddi {
    private apiKey;
    private apiBaseURL;
    private groupId;
    private otpAppId;
    constructor();
    withApiKey(apiKey: string): Ikoddi;
    withApiBaseURL(apiBaseURL: string): Ikoddi;
    withGroupId(groupId: string): Ikoddi;
    withOtpAppId(otpAppId: string): Ikoddi;
    _assertAllParametersAreCorrect(): void;
    sendAirtime(numbers: Array<string>, ref: string, amount: string, campaignName: string, phonecode?: string, isoCode?: string): Promise<import("axios").AxiosResponse<any, any>>;
    sendSMS(numbers: Array<string>, from: string, message: string, smsBroadCast: string, phonecode?: string, isoCode?: string): Promise<SMS[]>;
    sendOTP(identity: string, type?: "sms" | "email" | "whatsapp", messageContext?: Record<string, any>): Promise<OTPResponse>;
    sendMultiOTP(data: {
        identities: Array<{
            identity: string;
            channel: "SMS" | "EMAIL" | "WHATSAPP";
        }>;
        messageContext?: Record<string, any>;
    }): Promise<OTPResponse>;
    verifyOTP(otpData: {
        verificationKey: string;
        otp: string;
        identity: string;
    }): Promise<OTPResponse>;
    internetPlans(): Promise<import("axios").AxiosResponse<any, any>>;
}
