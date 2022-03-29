import { Router } from "express";
import { __DEV__ } from "../config";
import { badRequestHandler } from "../error_handler";
import * as client from "../lib";
import { User } from "../models/user";

const router = Router();

/**
 * @swagger
 * /v2/user/{userId}:
 *   get:
 *     summary: Create identity type trustline wallet.
 *     description: Create identity type trustline wallet and return wallet data.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of user
 *     responses:
 *       200:
 *         description: Return wallet address.
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 */
router.get("/:userId", async (req, res, next) => {
  try {
    console.log(req.params);
    const wallet = await client.createCredentials();
    await client.deployIdentity(wallet);
    const user = new User({
      uid: req.params.userId,
      address: wallet.address,
      version: wallet.version,
      type: wallet.type,
      meta: {
        signingKey: {
          mnemonic: wallet.meta.signingKey.mnemonic,
          privateKey: wallet.meta.signingKey.privateKey,
        },
      },
    });
    await user.save();
    res.send(wallet.address);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /v2/user/:
 *   get:
 *     summary: Create identity type trustline wallet.
 *     description: Create identity type trustline wallet and return wallet data.
 *     responses:
 *       200:
 *         description: Return wallet data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v2/user/recoverFromSeed:
 *   post:
 *     summary: Recover wallet data from seed.
 *     description: Recover wallet data from seed.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seed:
 *                 type: string
 *                 example: awake depart...
 *     responses:
 *       200:
 *         description: Return wallet data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       400:
 *         description: Invalid seed
 *       500:
 *         description: Internal server error
 */

router.post("/recoverFromSeed", async (req, res, next) => {
  const seed = req.body.seed;
  if (!seed) {
    const error = new Error("Invalid seed");
    badRequestHandler(error, req, res, next);
  }
  try {
    const wallet = await client.recoverCredentialsFromSeed(seed);
    res.send(wallet);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /v2/user/recoverFromPrivateKey:
 *   post:
 *     summary: Recover wallet data from private key.
 *     description: Recover wallet data from private key.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: 0x...
 *     responses:
 *       200:
 *         description: Return wallet data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       400:
 *         description: Invalid key
 *       500:
 *         description: Internal server error
 */
router.post("/recoverFromPrivateKey", async (req, res, next) => {
  const key = req.body.key;
  if (!key) {
    const error = new Error("Invalid key");
    badRequestHandler(error, req, res, next);
  }
  try {
    const wallet = await client.recoverCredentialsFromPrivateKey(key);
    res.send(wallet);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /v2/deleteUser/{userId}:
 *   delete:
 *     summary: Delete user
 *     descriptions: Delete user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID of user
 *     responses:
 *       200:
 *         description: Return ok.
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *               example: ok
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteUser/:userId", async (req, res, next) => {
  try {
    await User.deleteOne({ uid: req.params.userId });
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

export default router;
