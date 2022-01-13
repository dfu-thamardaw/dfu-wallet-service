import { TLNetwork } from "@trustlines/trustlines-clientlib";
import { __DEV__, clientlibconfig } from "../config";

const TL = new TLNetwork(clientlibconfig);

const rejectAfterTimeout = (time, label) => {
  return new Promise((_resolve, reject) =>
    setTimeout(
      () => reject(new Error(`${label}: Timeout after ${time} ms`)),
      time
    )
  );
};

/**
 * user methods
 */
export const createCredentials = async () => {
  __DEV__ && console.log("ClientLib", "createAccount");

  const wallet = await TL.user.create();
  return wallet;
};

export const deployIdentity = async (walletCredentials) => {
  __DEV__ && console.log("ClientLib", "deployIdentity");

  await loadAccount(walletCredentials);
  const txHash = await TL.user.deployIdentity();
  return txHash;
};

export const loadAccount = async (walletCredentials) => {
  __DEV__ && console.log("ClientLib", "loadAccount");
  await TL.user.loadFrom(walletCredentials);
};

export const recoverCredentialsFromSeed = async (seed) => {
  __DEV__ && console.log("ClientLib", "recoverFromSeed");
  return await TL.user.recoverFromSeed(seed);
};

export const recoverCredentialsFromPrivateKey = async (key) => {
  __DEV__ && console.log("ClientLib", "recoverFromPrivateKey");

  return await TL.user.recoverFromPrivateKey(key);
};

/**
 * trustline methods
 */
export const prepareTrustlineUpdate = (
  networkAddress,
  contactAddress,
  clGiven,
  clReceived
) => {
  __DEV__ && console.log("ClientLib", "prepareTrustlineUpdate");
  const { rawTx } = TL.trustline.prepareUpdate(
    networkAddress,
    contactAddress,
    clGiven,
    clReceived
  );
  return confirmTrustlineTransaction(rawTx);
};

export const prepareTrustlineAccept = (
  networkAddress,
  contactAddress,
  clGiven,
  clReceived
) => {
  __DEV__ && console.log("ClientLib", "prepareTrustlineAccept");
  const { rawTx } = TL.trustline.prepareAccept(
    networkAddress,
    contactAddress,
    clGiven,
    clReceived
  );
  return confirmTrustlineTransaction(rawTx);
};

export const confirmTrustlineTransaction = (tx) => {
  __DEV__ && console.log("ClientLib", "confirmTrustlineTX");

  // if (!tx) {
  //   return Promise.reject(new Error("No TX given"));
  // }

  return TL.trustline.confirm(tx);
};

/**
 * Events based actions
 */
export const getEvents = (networkAddress, filter) => {
  __DEV__ && console.log("ClientLib", "getEvents");
  return Promise.race([
    rejectAfterTimeout(10000, "Events"),
    TL.event.get(networkAddress, filter),
  ]);
};

export const getEventsForAllNetworks = (filter) => {
  __DEV__ && console.log("ClientLib", "getEventsForAllNetworks");
  return Promise.race([
    rejectAfterTimeout(20000, "Events for all Networks"),
    TL.event.getAll(filter),
  ]);
};

/**
 * Network based methods
 */
export const getAllNetworks = () => {
  __DEV__ && console.log("ClientLib", "getNetworks");
  return Promise.race([
    rejectAfterTimeout(10000, "Networks"),
    TL.currencyNetwork.getAll(),
  ]);
};

export const getNetworkUserData = (networkAddress, userAddress) => {
  __DEV__ && console.log("ClientLib", "getNetworkUserData");
  return Promise.race([
    rejectAfterTimeout(10000, "Network"),
    TL.currencyNetwork.getUserOverview(networkAddress, userAddress),
  ]);
};

/**
 * Payment based methods
 */
export const sendPayment = async (networkAddress, receiverAddress, value) => {
  const { rawTx } = await TL.payment.prepare(
    networkAddress,
    receiverAddress,
    value
  );
  const txHash = await TL.payment.confirmPayment({
    rawTx,
    receiverAddress,
  });

  __DEV__ && console.log("Transaction hash: ", txHash);
};
