const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");
const router = express.Router();
router.route("/products").get(getAllProduct);
router.route("/product/new").post(isAuthenticatedUser, authorisedRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorisedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteProduct)
    .get(getProductDetails);



module.exports = router;
