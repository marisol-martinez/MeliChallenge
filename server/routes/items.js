
const express = require('express');
const router=express.Router();
const { getItemById, getItems} = require('../controllers/item');

router.get('/items/:id', getItemById );
router.get('/items', getItems );

module.exports = router;