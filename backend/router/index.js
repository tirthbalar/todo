const { Router } = require("express");
const clientRouter = require('./clientRouter')
const userRouter = require('./userRouter')

const router = Router();

router.use(clientRouter); 
router.use(userRouter);

module.exports = router;