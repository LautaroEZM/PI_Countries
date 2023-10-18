const { Router } = require("express");
const countryController = require('../controllers/country');
const activityController = require('../controllers/activity');


const router = Router();

// Countries routes
router.get('/countries', countryController.getAll);
router.get('/countries/name', countryController.getByName);
router.get('/countries/:idCode', countryController.getById);


// Activities routes
router.get('/activities', activityController.getAll);
router.post('/activities', activityController.createActivity);

module.exports = router;
