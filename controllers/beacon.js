const Beacon = require('../models/beacon')

exports.mapBeacon = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == process.env.passkeyStudent){
            const beacon = req.body;
            const result = await Beacon.create(beacon);
            res.status(201).json(result);
        }else{
            res.status(500).json({ error: "Wrong passkey" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
}