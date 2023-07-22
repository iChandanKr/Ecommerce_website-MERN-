const Product = require("../models/productModel");
const ErrorHandeler = require("../utils/errorHandeler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeature = require("../utils/apiFeature");


// Create Product--------   Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Get all Products--------
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;
    const productcount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query).search().filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productcount,
    })
});

// Update Products---------Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete Product ------Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "product is deleted successfully",
    });
});


// Get Product Details--------
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// -------------------------




