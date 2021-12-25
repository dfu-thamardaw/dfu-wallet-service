import { Router } from "express"
import {badRequestHandler} from "../error_handler";
import * as client from "../lib";

const router = Router();

router.post("/", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const receiverAddress = req.body.receiverAddress;
  const value = req.body.value;
  const wallet = req.body.wallet;

  if(
    !networkAddress 
    || !receiverAddress 
    || !value
    || !wallet
    || !isEmpty(wallet)
  ){
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next);
  }
  
  try {
    await client.loadAccount(wallet);
    await client.sendPayment(
      networkAddress,
      receiverAddress,
      value
    );
    res.json("ok");
  } catch(err) {
    next(err);
  }
});

export default router;
