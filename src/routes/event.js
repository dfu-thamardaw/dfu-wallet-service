import { Router } from "express"
import {isEmpty} from "lodash";
import * as client from "../lib";

const router = Router();

router.post("/", async (req, res, next) => {
  let filter = req.body.filter;
  let wallet = req.body.wallet;
  if(!wallet || !isEmpty(wallet)) {
    const error = new Error("Invalid wallet");
    badRequestHandler(error, req, res, next);
  }
  if(!filter) filter = {};
  try {
    await client.loadAccount(wallet);
    const response = await client.getEventsForAllNetworks(filter);
    res.send(response);
  } catch(err) {
    next(err);
  }
});

export default router;
