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
 *    NetworkTrustlineUpdateEvent:
 *      type: object
 *      properties:
 *        blockHash:
 *          type: string
 *          example: 0x...
 *        blockNumber:
 *          type: string
 *          example: 0x...
 *        counterParty:
 *          type: string
 *          example: 0x...
 *        direction:
 *          type: string
 *          example: received
 *        from:
 *          type: string
 *          example: 0x...
 *        given:
 *          $ref: '#/components/schemas/Amount'
 *        interestRateGiven:
 *          $ref: '#/components/schemas/Amount'
 *        interestRateReceived:
 *          $ref: '#/components/schemas/Amount'
 *        isFrozen:
 *          type: boolean
 *          example: false
 *        logIndex:
 *          type: number
 *  `       example: ...
 *        networkAddress:
 *          type: string
 *          example: 0x...
 *        received:
 *          $ref: '#/components/schemas/Amount'
 *        status:
 *          type: string
 *          example: confirmed
 *        timestamp:
 *          type: number
 *          example: ...
 *        to:
 *          type: string
 *          example: 0x...
 *        transactionHash:
 *          type: string
 *          example: 0x...
 *        type:
 *          type: string
 *          example: TrustlineUpdate
 *        user:
 *          type: string
 *          example: 0x...
 */
