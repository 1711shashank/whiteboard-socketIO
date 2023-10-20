const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const db_link = process.env.MONGO_URL;

mongoose.set('strictQuery', false);
mongoose.connect(db_link)
    .then(() => {
        console.log("db connected");
    }).catch((err) => {
        console.log(err);
    })

const canvasData = mongoose.Schema([{
    roomId: String,
    canvasData: String,
}])

const db = mongoose.model("canvasData", canvasData);
module.exports = { db };