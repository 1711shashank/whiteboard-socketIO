const { db } = require("../models/mongoDB");

module.exports.getData = async function getData(req, res) {
    try {

        console.log('------------------getData--------------------')

        console.log('params',req.params);
        let canvasData = await db.find({ roomId: req.query.roomId });

        res.status(200).json({
            data: canvasData[0]
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports.addData = async function addData(req, res) {
    try {

        const { roomId, canvasData } = req.body;
        // console.log(roomId, canvasData);

        await db.findOneAndUpdate(
            { roomId: roomId }, // filter
            { "canvasData": canvasData }, // update
            { upsert: true, new: true } // conduction
        );


        res.status(200).json({
            Message: "User data added successfully"
        });

    } catch (err) {
        console.log(err);
    }
}