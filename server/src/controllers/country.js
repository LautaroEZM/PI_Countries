const { Country } = require("../db");
const fs = require("fs");
const path = require("path");

const getAll = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se puede obtener la información de los países.",
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const country = await Country.findOne({
      where: {
        idCode: req.params.idCode,
      },
    });
    res.json(country);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se puede obtener la información de los países.",
      message: error.message,
    });
  }
};

const getByName = async (req, res) => {
  try {
    const countries = await Country.findAll();
    const filteredCountries = countries.filter((country) => {
      console.log(country.name, req.query.name);
      return country.name.toLowerCase().includes(req.query.name.toLowerCase());
    });
    res.json(filteredCountries);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se puede obtener la información de los países.",
      message: error.message,
    });
  }
};

const populateDb = async () => {
  try {
    const jsonContent = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../api", "db.json")),
    );
    const countriesToInsert = jsonContent.countries.map((country) => {
      return {
        idCode: country.cca3,
        name: country.name.official,
        imageFlag: country.flags.svg,
        continent: country.continents ? country.continents[0] : "",
        capital: country.capital ? country.capital[0] : "",
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(countriesToInsert, { ignoreDuplicates: true });
    console.log("All countries were created successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getByName,
  getById,
  populateDb,
};
