import { Router } from "express"
import {__DEV__} from "../config";
import {badRequestHandler} from "../error_handler";
import * as client from "../lib";

const router = Router();

/**
 * @swagger
 * /user:
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
router.get("/", async (_req, res, next) => {
  try {
    const wallet = await client.createCredentials();
    await client.deployIdentity(wallet);
    res.send(wallet);
  } catch(err) {
    next(err);
  }
})

/**
 * @swagger
 * /user/recoverFromSeed:
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

/**
 * @swagger
 * /user/recoverFromPrivateKey:
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
