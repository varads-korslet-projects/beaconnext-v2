const Beacon = require('../models/beacon')

exports.mapBeacon = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
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

exports.getRoom = async (req, res) => {
    try {
        const beaconUuid = req.body.uuid;
        if(!beaconUuid) {
            return res.status(404).json({ error: 'UUID not found in reqest' });
        }
        const beacon = await Beacon.findOne({ Id: beaconUuid });

        if (!beacon) {
            return res.status(404).json({ error: 'Beacon not found' });
        }

        const roomNumber = beacon.RoomNo;
        res.status(200).json({ roomNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
