const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/',userController.callForAllPagination);
router.post('/',userController.createRecord)
router.put('/',userController.updateRecord)
router.delete('/',userController.deleteRecord)
module.exports = router;