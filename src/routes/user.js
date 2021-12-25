import { Router } from "express"
import {__DEV__} from "../config";
import {badRequestHandler} from "../error_handler";
import * as client from "../lib";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const wallet = await client.createCredentials();
    const txHash = await client.deployIdentity(wallet);
    res.send({
      txHash,
      wallet
    });
  } catch(err) {
    next(err);
  }
})

router.post("/recoverFromSeed", async (req, res, next) => {
  const seed = req.body.seed;
  if(!seed) {
    const error = new Error("Invalid seed");
    badRequestHandler(error, req, res, next);
  }
  try {
    const wallet = await client.recoverCredentialsFromSeed(seed);
    res.send(wallet);
  } catch(err) {
    next(err);
  }
})

router.post("/recoverFromPrivateKey", async (req, res, next) => {
  const key = req.body.key;
  if(!key) {
    const error = new Error("Invalid key");
    badRequestHandler(error, req, res, next);
  }
  try {
    const wallet = await client.recoverCredentialsFromPrivateKey(key);
    res.send(wallet);
  } catch(err) {
    next(err);
  }
})

export default router;
