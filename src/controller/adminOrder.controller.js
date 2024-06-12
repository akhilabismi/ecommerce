const orderService = require("../services/order.service.js");

const getAllOrder = async(req,res)=>{
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const confirmedOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const shipOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deliverOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const cancelOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.cancelOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deleteOrder = async(req,res)=>{
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    getAllOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    deleteOrder
}

