import { Router } from "express"
import {badRequestHandler} from "../error_handler";
import * as client from "../lib";

const router = Router();

/**
 * @swagger
 *   components:
 *     schemas:
 *       PaymentRequest:
 *         type: object
 *         properties:
 *           networkAddress:
 *             type: string
 *             example: 0x...
 *           receiverAddress:
 *             type: string
 *             example: 0x...
 *           value:
 *             oneOf:
 *               - type: string
 *               - type: number
 *             example: 2000
 *           wallet:
 *             $ref: '#/components/schemas/Wallet'
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Transfer.
 *     description: Transfer.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Transfer to provided receiver
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: ok
 *       400:
 *         description: Invalid argument
 *       500:
 *         description: Internal server error
 */
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
