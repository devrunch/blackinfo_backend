
const Accident = require('../model/accident');
const User = require('../model/User');
const SiteInvestigation = require('../model/siteInvestigation');
const { severityCalculator } = require('../utils/severityCalculator');
const { Analysis } = require('../utils/analysisUtil')
const Loc = require('../model/location');


exports.accidentSubmit = async (req, res) => {
    try {
        const token = req.params.token;
        // console.log(token)
        if (!token) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }
        let form = req.body;
        form["userId"] = user._id;
        form["gpsLocation"] = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        // console.log(form);
        const accident = new Accident({
            userId: form.userId,
            firstName: form.firstName,
            lastName: form.lastName,
            state: form.state,
            firNo: form.firNo,
            accidentCity: form.accidentCity,
            district: form.district,
            policeStation: form.policeStation,
            roadNumber: form.roadNumber,
            noOfLanes: form.noOfLanes,
            dateOfAccident: form.dateOfAccident,
            timeOfAccident: form.timeOfAccident,
            typeOfCollision: form.typeOfCollision,
            typeOfArea: form.typeOfArea,
            hitAndRun: form.hitAndRun,
            accidentType: form.accidentType,
            noOfVehiclesInvolved: form.noOfVehiclesInvolved,
            noOfFatalities: form.noOfFatalities,
            noOfInjuredNeedingHospitalisation: form.noOfInjuredNeedingHospitalisation,
            noOfInjuredNotNeedingHospitalisation: form.noOfInjuredNotNeedingHospitalisation,
            typeOfWeather: form.typeOfWeather,
            ongoingRoadWorks: form.ongoingRoadWorks,
            roadName: form.roadName,
            roadType: form.roadType,
            physicalDividerPresent: form.physicalDividerPresent,
            roadChainage: form.roadChainage,
            typeOfRoadSurface: form.typeOfRoadSurface,
            accidentSpot: form.accidentSpot,
            location: {
                type: "Point",
                coordinates: [form.longitude, form.latitude]
            },
            typeOfPropertyDamage: form.typeOfPropertyDamage,
            vehicles: [
                {
                    vehicletype: form.vehicles[0].type,
                    registrationPlate: form.vehicles[0].registrationPlate,
                    dispositionLoadAfterAccident: form.vehicles[0].dispositionLoadAfterAccident,
                    condition: form.vehicles[0].condition,
                    trafficViolation: form.vehicles[0].trafficViolation,
                    mechanicalViolation: form.vehicles[0].mechanicalViolation
                }
            ]
        });
        const t = await accident.save();
        res.status(200).json({ message: "Form Submitted Successfully", status: 200 });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};



exports.SiteInvestigationSubmit = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === 'undefined' || token === 'null' || token === '' || token == null) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", status: 401 });
        }
        const siteInvestigation = new SiteInvestigation({
            siteReference: req.body.siteReference,
            state: req.body.state,
            roadNo: req.body.roadNo,
            locationDescription: req.body.locationDescription,
            policeStation: req.body.policeStation,
            landmarks: req.body.landmarks,
            blackspotId: req.body.blackspotId,
            location: {
                type: "Point",
                coordinates: [req.body.gpsCoordinates.longitude, req.body.gpsCoordinates.latitude],
            },
            blackspotType: req.body.blackspotType,
            district: req.body.district,
            chainage_from: req.body.chainage_from,
            chainage_to: req.body.chainage_to,
            site_images: req.body.site_images,
            comments:req.body.comments ,
            isQuest: req.body.isQuest,
            isQuestOperational: req.body.isQuestOperational,
            commentsOperational: req.body.commentsOperational,
        });
        await siteInvestigation.save();
        res.status(200).json({ message: "Form Submitted Successfully", status: 200 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}



exports.getAccidents = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token === 'undefined' || token === 'null' || token === '' || token == null) {
            return res.status(401).send('Access Denied');
        }
        const user = await User.findByToken(token)
        if (!user) {
            return res.status(402).json({ message: "Unauthorized", status: 401 });
        }
        const locations = await Accident.find();
        res.status(200).json({ message: locations, status: 200 });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: err.message });
    }
}

exports.getNearLocations = async (req, res) => {
    try {
        const { lat, lng } = req.params;
        const locations = await Accident.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 500
                }
            }
        });
        const investigations = await SiteInvestigation.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 500
                }
            }
        });
        res.status(200).json({ message: locations, investigations: investigations, status: 200 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
exports.getAnalysis = async (req, res) => {
    try {
        const { lat, lng } = req.params;
        console.log(parseFloat(lng), parseFloat(lat))
        const locations = await Accident.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 500
                }
            }
        });

        const analysis = await Analysis(locations)
        res.status(200).json({ message: analysis, status: 200 });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}