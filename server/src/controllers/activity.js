const { Activity } = require('../db');

const getAll = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.json(activities);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'No se puede obtener la información de las actividades.',
            message: error.message,
        });
    }
};

const createActivity = async (req, res) => {
    try {
        const record = await Activity.create({
            name: req.body.name,
            difficulty: req.body.difficulty,
            duration: req.body.duration,
            season: req.body.season,
        });

        await record.setCountries(req.body.countries);

        res.json(record);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'No se pudo crear la actividad.',
            message: error.message,
        });
    }
};

module.exports = {
    getAll,
    createActivity,
};
