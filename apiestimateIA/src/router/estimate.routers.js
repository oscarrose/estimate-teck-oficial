import { Router } from "express";
import { testIa, generationSoftwareRequirements, classifictionRequirementsSoftware,evaluateFeatureSystem } from "../controllers/estimate.js"
const router = Router();

router.get("/test", testIa);

router.post("/software-requirements", generationSoftwareRequirements)

router.post("/classifiction-requeriments-SW", classifictionRequirementsSoftware)

router.post("/evaluate-feature-System",evaluateFeatureSystem )


export default router;