import { Router } from "express";

const router = Router();

router.use("/user", require("./user"));

export default router;
