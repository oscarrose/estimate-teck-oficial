import { Router } from "express";
import {testIa,generationSoftwareRequirements} from "../controllers/estimate.js"
const router =Router();

router.get("/test",testIa);

router.post("/software-requirements", generationSoftwareRequirements)

export default router;