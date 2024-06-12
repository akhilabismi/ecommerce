const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const cartService  = require("../services/cart.service.js")

async function createOrder(user,shipAddress){
    let address;

    if(shipAddress._id){
        let existAddress = await Address.findById(shipAddress._id);
        address=existAddress;

    }else{
        address= new Address(shipAddress);
        address.user=user;
        await address.save();

        user.addresses.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems=[];

    for(const item of cart.cartItems){
        const orderItem=new orderItems({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem)
    }

    const createdOrder=new orderItems({
        user,
        orderItems,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discount:cart.discount,
        totalItem:cart.totalItem,
        shipAddress:address,

    })

    const savedOrder= await createdOrder.save();

    return savedOrder;

}

async function placeOrder(oredrId){
    const order= await findOrderById(oredrId);

    order.orderStatus="PLACED";
    oredrId.paymentDetails.status="COMPLETED";

    return await order.save();

}

async function confirmedOrder(oredrId){
    const order= await findOrderById(oredrId);

    order.orderStatus="CONFIRMED";

    return await order.save();

}

async function shipOrder(oredrId){
    const order= await findOrderById(oredrId);

    order.orderStatus="SHIPPED";

    return await order.save();

}
async function deliverOrder(oredrId){
    const order= await findOrderById(oredrId);

    order.orderStatus="DELIVERED";

    return await order.save();

}

async function cancelOrder(oredrId){
    const order= await findOrderById(oredrId);

    order.orderStatus="CANCELLED";

    return await order.save();

}

async function findOrderById(orderId){

    const order=await Order.findById(orderId)
    .populate("user")
    .populate({path:"oredrItems",populate:{path:"product"}})
    .populate("shippinAddress")

    return order
}

async function usersOrderHistory(userId){
    try {
        const orders=await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return orders;

    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

async function deleteOrder(orderId){
    const order= await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);

}

module.exports={
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
    

};




