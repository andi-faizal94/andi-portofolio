import * as express from "express";
import User from "./v1/router";
const router = express.Router();

router.use("/v1", User);

export default router;
