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
export declare type SMSStatus = (typeof SMSStatus)[keyof typeof SMSStatus];
export declare const SMSSMSCStatus: {
    DeliverySuccess: string;
    DeliveryFailure: string;
    MessageBuffered: string;
    SmscSubmit: string;
    SmscReject: string;
};
export declare type SMSSMSCStatus = (typeof SMSSMSCStatus)[keyof typeof SMSSMSCStatus];
export declare type SMS = {
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
export declare type OTPResponse = {
    status: 0 | -1;
    otpToken: string;
};
export declare type VerifyOPTRequest = {
    identity: string;
    otp: string;
    verificationKey: string;
};
export declare type VerifyOPTResponse = {
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
    sendAirtime(numbers: Array<string>, ref: string, amount: string, campaignName: string, phonecode?: string, isoCode?: string): Promise<any>;
    sendSMS(numbers: Array<string>, from: string, message: string, smsBroadCast: string, phonecode?: string, isoCode?: string): Promise<SMS[]>;
    sendOTP(identity: string, type?: "sms" | "email", messageContext?: Record<string, any>): Promise<OTPResponse>;
    verifyOTP(otpData: {
        verificationKey: string;
        otp: string;
        identity: string;
    }): Promise<OTPResponse>;
    internetPlans(): Promise<any>;
}
