const express=require("express")

const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message : "Welcome To Ecommerce api - node",status:true})
})

const authRouters = require("./routes/auth.route.js") 
app.use("/auth",authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/api/users",userRouters);

const productRouter = require("./routes/product.route.js");
app.use("/api/products",productRouter);

const adminProductRouter = require("./routes/adminProduct.routes.js");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart",cartRouter);

const cartItemRouter = require("./routes/cartItem.route.js");
app.use("/api/cart_items",cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders",orderRouter);

const adminOrderRouter = require("./routes/adminOrder.route.js");
app.use("/api/admin/orders",adminOrderRouter);

const reviewRouter = require("./routes/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter = require("./routes/rating.routes.js");
app.use("/api/ratings",ratingRouter);


module.exports=app;