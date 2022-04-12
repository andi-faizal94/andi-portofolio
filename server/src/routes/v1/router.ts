import * as express from "express";
import * as UserController from "../../controllers/user.controller";

const router = express.Router();

router.get("/user", UserController.index);
router.get("/user/:id", UserController.show);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

export default router;
