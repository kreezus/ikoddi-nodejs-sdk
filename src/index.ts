import axios from 'axios'

export class Ikoddi {
    private apiKey: string | undefined;
    private apiBaseURL: string;
    private groupId: string | undefined;
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
    async sendAirtime(numbers: Array<string>, ref: string, amount: string, campaignName: string, phonecode: string = "226", isoCode: string = "BF") {

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
            const airtime = await axios.post(`${this.apiBaseURL}${this.groupId}/airtimes`, JSON.stringify(data), {
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": this.apiKey,
                },
            });
            return airtime;
        }
        catch (err) {
            throw err;
        }

    }
    async sendSMS(numbers: Array<string>, from: string, message: string, smsBroadCast: string, phonecode: string = "226", isoCode: string = "BF") {

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
            const sms = await axios.post(`${this.apiBaseURL}${this.groupId}/sms`, JSON.stringify(data), {
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": this.apiKey,
                },
            });
            return sms;
        }
        catch (err) {
            throw err;
        }

    }
    async internetPlans() {

        this._assertAllParametersAreCorrect();
        try {
            const internetPlans = await axios.get(`${this.apiBaseURL}${this.groupId}/airtimes/internet-plans`, {
                headers: {
                    "Content-type": "application/json",
                    "x-api-key": this.apiKey,
                },
            });
            return internetPlans;
        }
        catch (err) {
            throw err;
        }
        ;
    }

}