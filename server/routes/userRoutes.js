const express = require("express");
const {getUserById,createUser} = require("../controllers/userConroller");

const router = express.Router();


router.post("/findUser",getUserById);
router.post("/createUser",createUser);


module.exports = router;