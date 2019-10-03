import { AuthPayload, CashTokenApiCredentials, DataPayload, GetAccessTokenRequest, GiftCashTokenRequest } from "./../interfaces";
import { Service } from "./service";

// Environment Base URLS
const PROD_URL = "https://cashtoken.ng/apis/";
const STAGING_URL = "https://staging.cashtoken.ng/apis/";

// Endpoints
const GET_ACCESSTOKEN_URI = "celdmobile/login";
const GIFT_CASHTOKEN_URI = "celdmobile/giftTokens";

export class V1 extends Service {
	constructor(config: CashTokenApiCredentials) {
		if (!config.baseUrl) {
			switch (config.env) {
				case "staging":
					config.baseUrl = STAGING_URL;
					break;
				case "production":
					config.baseUrl = PROD_URL;
					break;
				default:
					throw new Error("Unknown environment config. Please pass a custom base url");
			}
		}
		if (config.trace === undefined) {
			config.trace = false;
		}
		super(config as Required<CashTokenApiCredentials>);
	}

	public getAccessToken(payload: DataPayload<GetAccessTokenRequest>) {
		return this.sendRequest(Service.HttpMethod.POST, GET_ACCESSTOKEN_URI, payload);
	}

	public giftCashToken(payload: AuthPayload<GiftCashTokenRequest>) {
		return this.sendRequest(Service.HttpMethod.POST, GIFT_CASHTOKEN_URI, payload);
	}
}
