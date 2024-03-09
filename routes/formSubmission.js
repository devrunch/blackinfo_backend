const express = require("express");
const  VerifyToken  = require("../middleware/verifyToken");
const {SiteInvestigationSubmit,accidentSubmit,getNearLocations, getAccidents, getAnalysis} = require('../controllers/formSubmit');
const router = express.Router();
router.post("/accident/:token", accidentSubmit)
router.post("/siteInvestigation/:token", SiteInvestigationSubmit)
router.get("/getaccidents/:token",getAccidents)
router.get("/getnearlocations/:lat/:lng", getNearLocations);
router.get("/getanalysis/:lat/:lng", getAnalysis);
module.exports = router;