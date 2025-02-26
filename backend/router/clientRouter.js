const express = require('express');
require('../config/connected')
const clientCtrl = require('../controller/clientcontroller');
const { clientUpdateSchema, validateRequest } = require('../middeleware/clientUpdateschema');
const { isAuthenticated } = require('../middeleware/authanticated');

const router = express.Router();
 

router.get('/clients',isAuthenticated, clientCtrl.getClient);
router.post('/clients',isAuthenticated, clientCtrl.addClient);
router.put('/clients/:id',isAuthenticated,clientUpdateSchema,validateRequest, clientCtrl.updateClient);
router.delete('/clients/:id',isAuthenticated, clientCtrl.deleteClient);
router.get('/clients/search',isAuthenticated, clientCtrl.searchClients);

module.exports = router;