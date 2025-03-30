const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const passport = require('passport');


router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/books", require("./books"));
router.use("/readers", require("./readers"));

router.get('/login',passport.authenticate('github'),(req,res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
                return res.status(500).send("Error logging out");
            }
            res.redirect('/');
        });
    });
});


module.exports = router;
