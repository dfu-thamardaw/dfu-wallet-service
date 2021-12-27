/**
 * @swagger
 * components:
 *   schemas:
 *     Amount:
 *       type: object
 *       properties:
 *         decimals:
 *           type: integer
 *           example: 2
 *         raw:
 *           type: string
 *           example: 200000
 *         value:
 *           type: string
 *           example: 2000
 *     Wallet:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *           example: 0x...
 *         version:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           example: identity
 *         meta:
 *           type: object
 *           properties:
 *             signingKey:
 *               type: object
 *               properties:
 *                 mnemonic:
 *                   type: string
 *                   example: awake depart...
 *                 privateKey:
 *                   type: string
 *                   example: 0x...
 */
