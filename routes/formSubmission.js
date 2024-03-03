const express = require("express");
const  VerifyToken  = require("../middleware/verifyToken");
const {SiteInvestigationSubmit,accidentSubmit,getLocations, getAccidents} = require('../controllers/formSubmit');
const router = express.Router();
router.post("/accident/:token", accidentSubmit)
router.post("/siteInvestigation/:token", SiteInvestigationSubmit)
router.get("/getaccidents/:token",getAccidents)
module.exports = router;