export const clientlibconfig = {
  relayUrl: "https://wallet.dfumm.com/api/v1",
  messagingUrl: "wss://wallet.dfmm.com/api/v1",
  chainId: 4660,
  walletType: "identity",
  identityImplementationAddress: "0x0F9cBe23B774951cc5a8187C1685bD00F6e3be2d",
  identityFactoryAddress: "0xe648409Ef281B06E4a48e1c8225eF45bAB0FB399"
}

export const __DEV__ = process.env.NODE_ENV === "development";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trustline Clientlib API",
      version: "0.1.0",
      description: "Trustline clientlib API for use with flutter",
    },
  },
  apis: ["./src/routes/*.js"]
}
