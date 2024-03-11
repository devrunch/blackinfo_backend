const mongoose = require('mongoose');
const xlsx = require('xlsx');
const multer = require('multer');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user');
const formRouter = require('./routes/formSubmission');
const Accident = require('./model/accident');
const bodyParser = require('body-parser');
const app = express();


dotenv.config();
app.use(cors()); // Add this line to enable CORS
app.use(cookieParser());
app.use(bodyParser({limit: '50mb'}));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const upload = multer({ dest: 'uploads/' });

app.post('/upload/xlsx', upload.single('file'), (req, res) => {
    try {
        console.log('hit')
        const workbook = xlsx.readFile(req.file.path);
        const sheet_name = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheet_name];
        const data = xlsx.utils.sheet_to_json(sheet);
        data.map((val, ind) => {
            const accident = new Accident({
                firstName: "from Bulk Load",
                state: val[' State'],
                firNo: val[' FIR No'],
                accidentCity: val[' District '],
                district: val[' District '],
                policeStation: val[' Police Station'],
                roadNumber: val[' Road Number'],
                noOfLanes: val[' Lanes'],
                dateOfAccident: val[' Date of Accident'],
                typeOfCollision: val[' Type of Collision'],
                typeOfArea: val[' Type of Area'],
                hitAndRun: val[' Hit & Run'],
                accidentType: val[' Type of Collision'],
                noOfVehiclesInvolved: val['No of Vechile involved'],
                noOfFatalities: val[' Number of Persons Injured'],
                noOfInjuredNeedingHospitalisation: val[' Number of Persons Injured'],
                noOfInjuredNotNeedingHospitalisation: 0,
                typeOfWeather: val[' Type of Weather'],
                ongoingRoadWorks: val[' Ongoing Road Works/ Construction'],
                roadName: val[' Road Name '],
                roadType: val[' Road Type'],
                physicalDividerPresent: val[' Physical Divider'],
                roadChainage: val[' Chainage'],
                typeOfRoadSurface: val[' Surface Condition'],
                accidentSpot: val[' Accident Spot'],
                location: {
                    type: "Point",
                    coordinates: [val['Longitude'], val['latitude']]
                },
                typeOfPropertyDamage: val[' Accident Spot'],
                vehicles: [
                    {
                        vehicletype: val['Occupant  Vehicle Type'],
                        registrationPlate: val['Driver of Vehicle Number'],
                        dispositionLoadAfterAccident: '',
                        condition: '',
                        trafficViolation: '',
                        mechanicalViolation: ''
                    }
                ]
            });
            accident.save();
        })
        res.status(200).json({ message: "Form Submitted Successfully", status: 200 });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});






app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.get('/', (req, res) => res.send('Hello World!'));







app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
