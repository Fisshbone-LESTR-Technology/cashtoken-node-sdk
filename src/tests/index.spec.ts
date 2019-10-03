import { CashToken } from "./../index";

const PUBLIC_KEY = "TESTPUBLICKEY01";
const PRIVATE_KEY = "YEKCILBUPTSET6NOITCES";

const cashToken = CashToken.V1({
	privateKey: PRIVATE_KEY,
	publicKey: PUBLIC_KEY,
	env: "staging",
	trace: true,
});

describe("CashToken Node SDK", () => {
	it("Test Login Endpoint", async () => {
		const login = await cashToken.getAccessToken({
			data: {
				userPhoneNo: "MY PHONE NUMBER",
				userPin: "MY PASSWORD",
			},
		});
		expect(login.isOk).toBe(true);
		expect(login.status).toBe("succeeded");
		expect(login.statusCode).toBe(200);
		expect(login.data.userId).toBe("98");
		const giftToken = await cashToken.giftCashToken({
			userId: "MY USER ID",
			accessToken: "ACCESS TOKEN",
			data: {
				customerPhoneNo: "09011112222",
				quantity: 10,
				reason: "SDK Test",
			},
		});
		expect(giftToken.isOk).toBe(true);
		expect(giftToken.status).toBe("succeeded");
		expect(giftToken.statusCode).toBe(200);
	});
});
