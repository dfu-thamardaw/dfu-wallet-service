import { Router } from "express"
import {__DEV__} from "../config";
import * as client from "../lib";

const router = Router();

router.post("/all", async (_req, res, next) => {
  try {
    const response = await client.getAllNetworks();
    res.send(response);
  } catch(err) {
    next(err)
  }
});

router.post("/user", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const userAddress = req.body.userAddress;

  try {
    const response = await client.getNetworkUserData(networkAddress, userAddress);
    res.send(response);
  } catch(err) {
    next(err)
  }
});

export default router;
