"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ikoddi = void 0;
const axios_1 = __importDefault(require("axios"));
class Ikoddi {
    constructor() {
        this.apiBaseURL = "https://api.ikoddi.com/api/v1/groups/";
    }
    withApiKey(apiKey) {
        this.apiKey = apiKey;
        return this;
    }
    withApiBaseURL(apiBaseURL) {
        this.apiBaseURL = apiBaseURL;
        return this;
    }
    withGroupId(groupId) {
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
    sendAirtime(numbers, ref, amount, campaignName, phonecode = "226", isoCode = "BF") {
        return __awaiter(this, void 0, void 0, function* () {
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
                const airtime = yield axios_1.default.post(`${this.apiBaseURL}${this.groupId}/airtimes`, JSON.stringify(data), {
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
        });
    }
    sendSMS(numbers, from, message, smsBroadCast, phonecode = "226", isoCode = "BF") {
        return __awaiter(this, void 0, void 0, function* () {
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
                const sms = yield axios_1.default.post(`${this.apiBaseURL}${this.groupId}/sms`, JSON.stringify(data), {
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
        });
    }
    internetPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            this._assertAllParametersAreCorrect();
            try {
                const internetPlans = yield axios_1.default.get(`${this.apiBaseURL}${this.groupId}/airtimes/internet-plans`, {
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
        });
    }
}
exports.Ikoddi = Ikoddi;
