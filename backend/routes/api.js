var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const authController = require("./../controllers/auth.controller");
const couchesController = require("./../controllers/users.controller");
const appointmentsController = require("./../controllers/appointments.controller")
const UserSchema = require("./../models/users.schema")

//TODO: Auth Model




//Use model
/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: name
 *         password:
 *           type: string
 *           description: password
 *         gender:
 *           type: string
 *           description: gender
 *         mobile:
 *           type: string
 *           description: mobile
 *         pinCode:
 *           type: string
 *           description: pinCode
 *         city:
 *           type: string
 *           description: city
 *         state:
 *           type: string
 *           description: state
 *         country:
 *           type: string
 *           description: country
 *         userType:
 *           type: string
 *           description: userType, 0 => normal user, 1 => life couch
 *         specialty:
 *           type: string
 *           description: Specialty, this is required when userType is 1 (couch)
 *         birthday:
 *           type: string
 *           format: date
 *           description: birth date
 *      Token:
 *          type: object
 *          properties:
 *              access_token:
 *                  type: string
 *                  descriprion: access token value
 *              expires_at:
 *                  type: string
 *                  description: token expiration time
 *      Auth:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  descriprion: User Id value or email
 *              password:
 *                  type: string
 *                  description: Password value
 */



//!endpoiints
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth Controller
 * /auth/token:
 *   post:
 *     summary: request an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Token generated succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       500:
 *         description: Invalid Credentials
 *       401:
 *          description: Invalid Credentials
 * /auth/registerCouch:
 *   post:
 *     summary: register couch
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered suuccesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 * /auth/registerUser:
 *   post:
 *     summary: register normal user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered suuccesfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.use("/auth", authController);

/**
 * @swagger
 * tags:
 *   name: Couches
 *   description: Users Controller
 * /api/v1/couches:
 *   get:
 *     summary: Lists all couches
 *     tags: [Couches]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.use("/api/v1/couches", couchesController);


router.use('/api/v1/appointments',appointmentsController)

module.exports = router;