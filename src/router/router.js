const express = require("express");
const router = express.Router();
const { class1 } = require("../controller/controller");

router.get("/", class1.a);
router.get("/Sign", class1.b);
router.post("/Sign", class1.c);
router.get("/deposit", class1.d);
router.post("/deposit", class1.e);
router.get("/change", class1.f);
router.post("/change", class1.g);
router.get("/withdrawal", class1.h);
router.post("/withdrawal", class1.i);

module.exports = router;
