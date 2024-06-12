const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller.js");
const authenticate = require("../middleware/authenitcate.js");


router.get("/",authenticate,cartController.findUserCart);
router.put("/add",authenticate,cartController.addItemToCart);

module.exports=router;