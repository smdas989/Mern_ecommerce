const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");



//Create Product - Admin
exports.createProduct = async(req, res, next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All product
exports.getAllProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true, 
        products})

}

// Get product detail
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        product
    })
})

// Update Product -- Admin
exports.updateProduct = async(req, res, next)=> {
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, 
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}

exports.deleteProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message: "Product deleted successfully"
    })
}