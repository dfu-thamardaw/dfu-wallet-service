import { Router } from "express"
import {isEmpty} from "lodash";
import {badRequestHandler} from "../error_handler";
import * as client from "../lib";

const router = Router();

router.post("/update", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const contactAddress = req.body.contactAddress;
  const clGiven = req.body.clGiven;
  const clReceived = req.body.clReceived;
  const wallet = req.body.wallet;

  if(
    !networkAddress 
    || !contactAddress 
    || !clGiven
    || !clReceived
    || !wallet
    || !isEmpty(wallet)
  ){
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next)
  }
  
  try {
    await client.loadAccount(wallet);
    const response = await client.prepareTrustlineUpdate(
      networkAddress,
      contactAddress,
      clGiven,
      clReceived
    );
    res.send(response);
  } catch(err) {
    next(err);
  }
})

router.post("/accept", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const contactAddress = req.body.contactAddress;
  const clGiven = req.body.clGiven;
  const clReceived = req.body.clReceived;
  const wallet = req.body.wallet;
  
  if(
    !networkAddress 
    || !contactAddress 
    || !clGiven
    || !clReceived
    || !wallet
    || !isEmpty(wallet)
  ){
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next)
  }
  
  try {
    await client.loadAccount(wallet);
    const response = await client.prepareTrustlineAccept(
      networkAddress,
      contactAddress,
      clGiven,
      clReceived
    );
    res.send(response);
  } catch(err) {
    next(err);
  }
})

router.post("/confirm", async (req, res, next) => {
  const tx = req.body.tx;

  if(
    !tx 
    || !wallet
    || !isEmpty(wallet)
  ){
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next);
  }
  
  try {
  const response = await client.confirmTrustlineTransaction(tx);
  res.send(response);
  } catch(err) {
    next(err);
  }
})

export default router;
