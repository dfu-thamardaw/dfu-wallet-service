import { Router } from "express";
import { badRequestHandler } from "../error_handler";
import * as client from "../lib";
import { isEmpty } from "lodash";
import { User } from "../models/user";
import { networkAddress } from "../config";

const router = Router();

/**
 * @swagger
 *   components:
 *     schemas:
 *       PaymentRequestV2:
 *         type: object
 *         properties:
 *           receiverAddress:
 *             type: string
 *             example: 0x...
 *           value:
 *             oneOf:
 *               - type: string
 *               - type: number
 *             example: 2000
 */

/**
 * @swagger
 * /v2/payment/{userId}:
 *   post:
 *     summary: Transfer.
 *     description: Transfer.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of user
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequestV2'
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
router.post("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const receiverAddress = req.body.receiverAddress;
  const value = req.body.value;

  if (
    !userId ||
    !networkAddress ||
    !receiverAddress ||
    !value
  ) {
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next);
  }

  try {
    const user = await User.findOne({uid: userId})
    if(!user) {
      const error = new Error("User does not exist");
      badRequestHandler(error, req, res, next);
    }
    const wallet = {
      address: user.address,
      version: user.version,
      type: user.type,
      meta: {
        signingKey: {
          mnemonic: user.meta.signingKey.mnemonic,
          privateKey: user.meta.signingKey.privateKey,
        },
      }
    }
    await client.loadAccount(wallet);
    await client.sendPayment(networkAddress, receiverAddress, value);
    res.json("ok");
  } catch (err) {
    next(err);
  }
});

export default router;
