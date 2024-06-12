const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller.js");
const { authenticate } = require("../middleware/authenitcate.js");

router.get("?", authenticate, orderController.getAllOrder);
router.put('/:orderId/confirmed',authenticate, orderController.confirmedOrder);
router.put('/:orderId/ship',authenticate, orderController.shipOrder);
router.put('/:orderId/deliver',authenticate, orderController.deliverOrder);
router.put('/:orderId/cancel',authenticate, orderController.cancelOrder);
router.put('/:orderId/delete',authenticate, orderController.deleteOrder);


module.exports=router;
