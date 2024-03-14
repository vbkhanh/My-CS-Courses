import { CognitoUserPool } from "amazon-cognito-identity-js";

const PoolData = {
    UserPoolId: "us-east-1_bi2dfZRYh",
    ClientId: "5nm2j7bm1f1csber7s92vvdp7r"
};

export default new CognitoUserPool(PoolData);