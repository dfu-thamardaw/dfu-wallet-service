import { Router } from "express";
import { isEmpty } from "lodash";
import { badRequestHandler } from "../error_handler";
import * as client from "../lib";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TrustlineRequest:
 *      type: object
 *      properties:
 *        networkAddress:
 *          type: string
 *          example: 0x...
 *        contactAddress:
 *          type: string
 *          example: 0x...
 *        clGiven:
 *          type: string
 *          example: 1000
 *        clReceived:
 *          type: string
 *          example: 1000
 *        wallet:
 *          $ref: '#components/schemas/Wallet'
 */

/**
 * @swagger
 * /trustline/update:
 *   post:
 *     summary: Update trustline.
 *     description: Update trustline.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrustlineRequest'
 *     responses:
 *       200:
 *         description: Return transaction hash.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 txHash:
 *                   type: string
 *                   example: 0x...
 *       400:
 *         description: Invaid argument
 *       500:
 *         description: Internal server error
 */
router.post("/update", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const contactAddress = req.body.contactAddress;
  const clGiven = req.body.clGiven;
  const clReceived = req.body.clReceived;
  const wallet = req.body.wallet;

  if (
    !networkAddress ||
    !contactAddress ||
    !clGiven ||
    !clReceived ||
    !wallet ||
    isEmpty(wallet)
  ) {
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next);
  }

  try {
    await client.loadAccount(wallet);
    const txHash = await client.prepareTrustlineUpdate(
      networkAddress,
      contactAddress,
      clGiven,
      clReceived
    );
    res.send({ txHash });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /trustline/accept:
 *   post:
 *     summary: Accept trustline.
 *     description: Accept trustline.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrustlineRequest'
 *     responses:
 *       200:
 *         description: Return transaction hash.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 txHash:
 *                   type: string
 *                   example: 0x...
 *       400:
 *         description: Invaid argument
 *       500:
 *         description: Internal server error
 */
router.post("/accept", async (req, res, next) => {
  const networkAddress = req.body.networkAddress;
  const contactAddress = req.body.contactAddress;
  const clGiven = req.body.clGiven;
  const clReceived = req.body.clReceived;
  const wallet = req.body.wallet;

  if (
    !networkAddress ||
    !contactAddress ||
    !clGiven ||
    !clReceived ||
    !wallet ||
    isEmpty(wallet)
  ) {
    const error = new Error("Invalid argument");
    badRequestHandler(error, req, res, next);
  }

  try {
    await client.loadAccount(wallet);
    const txHash = await client.prepareTrustlineAccept(
      networkAddress,
      contactAddress,
      clGiven,
      clReceived
    );
    res.send({ txHash });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /trustline/request:
 *   post:
 *     summary: Return trustline requests.
 *     description: Return trustline requests.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               networkAddress:
 *                 type: string
 *                 example: 0x...
 *               wallet:
 *                 $ref: '#/components/schemas/Wallet'
 *     responses:
 *       200:
 *         description: Return trustline requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NetworkTrustlineUpdateEvent'
 *       400:
 *         description: Invaid argument
 *       500:
 *         description: Internal server error
 */
router.post("/request", async (req, res, next) => {
  const { networkAddress, wallet } = req.body;
  if (isEmpty(wallet) || isEmpty(networkAddress)) {
    const error = new Error("Bad request");
    badRequestHandler(error, req, res, next);
  }
  try {
    await client.loadAccount(wallet);
    const response = await client.requestTrustlines(networkAddress);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

// router.post("/confirm", async (req, res, next) => {
//   const tx = req.body.tx;
//   if(
//     !tx
//     || !wallet
//     || !isEmpty(wallet)
//   ){
//     const error = new Error("Invalid argument");
//     badRequestHandler(error, req, res, next);
//   }
//   try {
//   const response = await client.confirmTrustlineTransaction(tx);
//   res.send(response);
//   } catch(err) {
//     next(err);
//   }
// })

export default router;
