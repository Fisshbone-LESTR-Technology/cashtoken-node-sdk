# cashtoken-node-sdk
CashToken NodeJS SDK for Gifting CashTokens

### Installation

```sh
$ npm install --save cashtoken-node-sdk
```

### Usage

```typescript
import { CashToken } from "cashtoken-node-sdk"
```
or 

```javascript
const { CashToken } = require("cashtoken-node-sdk")
```

#### Test Keys
```typescript
const PUBLIC_KEY = "TESTPUBLICKEY01";
const PRIVATE_KEY = "YEKCILBUPTSET6NOITCES";
```

#### Instantiate
```typescript
const cashToken = CashToken.V1({
    privateKey: PRIVATE_KEY, //your private key
    publicKey: PUBLIC_KEY, //your public key
    env: "staging", //or production
    trace: true // or false, determines whether to log request and response to console, you may also pass your own logging function instead
});
```

#### Get Access Token
```typescript
const response = await cashToken.getAccessToken({
    data: {
        userPhoneNo: "MY PHONE NUMBER",
        userPin: "MY PASSWORD"
    }
});

console.log(response.status); // succeeded or failed
console.log(response.message); // response message
if(response.isOk){ // all is well, correct response, we have access token
    console.log(response.data.userId);
    console.log(response.data.accessToken);
}
```

#### Gift CashToken
```typescript
const response = cashToken.giftCashToken({
    userId: "MY USER ID", //user id gotten from getAccessToken call
    accessToken: "ACCESS TOKEN" //access token gotten from getAccessToken call,
    data: {
        customerPhoneNo: "09011112222",
        quantity: 10,
        reason: 'SDK Test'
    }
});

console.log(response.status); // succeeded or failed
console.log(response.message); // response message
if(response.isOk){ // all is well, correct response, we have access token
    console.log(response.data.userId);
    console.log(response.data.accessToken);
}
```