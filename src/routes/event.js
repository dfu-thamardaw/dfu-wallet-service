import { Router } from "express";
import { isEmpty } from "lodash";
import * as client from "../lib";
import { badRequestHandler } from "../error_handler";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Events:
 *      type: array
 *      items:
 *        type: object
 *        description: any event related to the provided wallet user
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Get all events for provied wallet.
 *     description: Get all events for provided wallet.
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wallet'
 *     responses:
 *       200:
 *         description: Return events of provided user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Events'
 *       400:
 *         description: Invalid wallet
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res, next) => {
  let wallet = req.body;
  if (!wallet || isEmpty(wallet)) {
    const error = new Error("Invalid wallet");
    badRequestHandler(error, req, res, next);
  }
  try {
    await client.loadAccount(wallet);
    const response = await client.getEventsForAllNetworks();
    res.send(response);
  } catch (err) {
    next(err);
  }
});

export default router;
