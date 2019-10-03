import { CashTokenApiCredentials } from "./services/interfaces";
import { V1 } from "./services/v1";

export class CashToken {
	public static V1(config: CashTokenApiCredentials) {
		return new V1(config);
	}
}
