const Product = require("../models/productModel");
const ErrorHandeler = require("../utils/errorHandeler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeature = require("../utils/apiFeature");
const cloudinary = require("cloudinary");


// Create Product--------   Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);

    } else {
        images = req.body.images;

    }
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });


    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    })
});

// Get all Products--------
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productcount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query).search().filter();

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productcount,
        resultPerPage,
        filteredProductsCount,

    })
});
// GET all products(Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    })
});

// Update Products---------Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }
    // Images start here
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);

    } else {
        images = req.body.images;

    }
    if (images !== undefined) {
        // Deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);

        }
        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });


        }
        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
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
    // Deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

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
        product,
    });
});

// Create new Review and update review -------------------------
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isReviewd = product.reviews.find(
        (rev) => (rev.user.toString() === req.user._id.toString())
    );

    if (isReviewd) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {

                rev.rating = rating,
                    rev.comment = comment
            }

        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }


    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {

        avg += rev.rating;
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    })
});

// Get all reviews-------
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandeler("Product not found"), 404);

    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

// Delete review-----------

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandeler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.reviewId.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});




