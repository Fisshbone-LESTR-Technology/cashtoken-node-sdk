import crypto from "crypto";
import { RequestAPI, RequiredUriUrl, Response } from "request";
import request from "request-promise";
import { CashTokenApiCredentials, CashTokenApiResponse } from "./../interfaces";

enum HttpMethod {
	POST = "POST",
	GET = "GET",
}

const transform = (body: any, response: Response) => {
	return new CashTokenApiResponse(response.statusCode, response.headers, body);
};

export class Service {
	private baseRequest: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
	constructor(protected config: Required<CashTokenApiCredentials>) {
		this.baseRequest = request.defaults({
			baseUrl: this.config.baseUrl,
			simple: false,
			// tslint:disable-next-line:object-literal-sort-keys
			resolveWithFullResponse: true,
			json: true,
			headers: {
				"Content-Type": "application/json",
				// tslint:disable-next-line:object-literal-sort-keys
				Accepts: "application/json",
			},
			transform,
		});
	}

	public static get HttpMethod() {
		return HttpMethod;
	}

	public sendRequest(method: HttpMethod, endpoint: string, payload?: any) {
		method = method.toUpperCase() as HttpMethod;
		const options: request.RequestPromiseOptions = {
			method,
		};
		let usePayloadInSignature = false;
		if (payload) {
			if (method === "GET") {
				options.qs = payload;
			} else {
				usePayloadInSignature = true;
				options.json = payload;
			}
		}
		options.auth = {
			bearer: `${this.config.publicKey} ${this.sign(usePayloadInSignature ? payload : undefined)}`,
		};
		this.trace(`Sending ${method} request to ${endpoint}`);
		this.trace(`Request: ${JSON.stringify(options)}`);
		return new Promise<CashTokenApiResponse>((resolve, reject) => {
			this.baseRequest(endpoint, options)
				.then(response => {
					this.trace(`Response: ${JSON.stringify(response)}`);
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	public sign(payload: any | null = null) {
		let data = this.config.privateKey;
		if (payload) {
			data = `${JSON.stringify(payload)}${data}`;
		}
		return crypto
			.createHash("sha512")
			.update(data)
			.digest("hex");
	}

	protected trace(message: string) {
		if (this.config.trace === true) {
			// tslint:disable-next-line: no-console
			console.log(message);
		} else if (typeof this.config.trace === "function") {
			this.config.trace(message);
		}
	}
}
