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
const app = express();


dotenv.config();
app.use(cors()); // Add this line to enable CORS
app.use(cookieParser());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = xlsx.utils.sheet_to_json(sheet);

    YourModel.insertMany(data, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to import data');
        }
        res.send('Data imported successfully');
    });
});






app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.get('/', (req, res) => res.send('Hello World!'));







app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
