const { Router } = require("express");
const countryController = require('../controllers/country');
const activityController = require('../controllers/activity');


const router = Router();

// Countries routes
router.get('/countries', countryController.getAll);

// Activities routes
router.get('/activities', activityController.getAll);
router.post('/activities', activityController.createActivity);

module.exports = router;
