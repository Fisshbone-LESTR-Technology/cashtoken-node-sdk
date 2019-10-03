import { IncomingHttpHeaders } from "http";

export type CashTokenRequestTracer = (message: string) => {};

export class CashTokenApiResponse {
	constructor(public statusCode: number, public headers: IncomingHttpHeaders, public body: any) {}

	private isValidBody() {
		return typeof this.body === "object";
	}

	public get isOk() {
		if (this.statusCode !== 200 || !this.isValidBody()) {
			return false;
		}
		return this.status === "succeeded";
	}

	public get status() {
		return this.body.status;
	}

	public get data() {
		return this.body.data || {};
	}

	public get message() {
		return this.data.message || null;
	}
}

export interface CashTokenApiCredentials {
	privateKey: string;
	publicKey: string;
	env: "staging" | "production";
	baseUrl?: string;
	trace?: boolean | CashTokenRequestTracer;
}

export interface GetAccessTokenRequest {
	userPhoneNo: string;
	userPin: string;
	expire?: boolean;
}

export interface UserAccessToken {
	userId: string;
	accessToken: string;
}

export interface DataPayload<T = any> {
	data: T;
}

export interface AuthPayload<T> extends UserAccessToken, DataPayload<T> {}

export interface GiftCashTokenRequest {
	customerPhoneNo: string;
	quantity: number;
	reason?: string;
}
