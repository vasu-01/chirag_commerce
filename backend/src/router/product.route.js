import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addProduct,
  getProducts,
  getProductById,
} from "../controller/product.controller.js";

const router = Router();

router.route("/addProduct").post(
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "galleryImg", maxCount: 5 },
  ]),
  addProduct
);

router.route("/products").get(getProducts);

router.route("/products/:id").get(getProductById);

export default router;
