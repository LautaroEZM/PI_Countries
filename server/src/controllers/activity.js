const { Activity } = require("../db");

const getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se puede obtener la información de las actividades.",
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
      seasons: req.body.seasons?.length ? req.body.seasons.join(", ") : null,
    });

    await record.setCountries(req.body.countries);

    res.json(record);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({
        error: "Element already exists.",
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: "Can't create the activity.",
        message: error.message,
      });
    }
  }
};

module.exports = {
  getAll,
  createActivity,
};
