const express = require('express');
const router = express.Router();

const registrations = require('../models').registration;
const educations = require('../models').education;

//-----------------PASSPORT-----------------//
const passport = require('passport');
const auth = require("../middleware/auth");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

//REG
router.get("/", async(req, res, next) => {
    res.render('admin')
})

router.post("/reg", async(req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const cvBase64 = 'qLDlpr0zZdzielY4PQVd3AhX4/uL0x9CN8q5MtugiPVgKN2L9XsV';
    const degree0 = req.body.degree;
    const university0 = req.body.university;
    const startdate0 = req.body.startdate;
    const enddate0 = req.body.enddate;
    const edurow = JSON.parse(req.body.edurow);
    console.log(req.body);

    user = await registrations.create({
        name: name,
        address: address,
        phone: phone,
        email: email,
        password: password,
        cv: cvBase64
    })

    await educations.create({ eid: user.id, degree: degree0, university: university0, startdate: startdate0, enddate: enddate0 })

    const degree = edurow.map(value => value.degree)
    const university = edurow.map(value => value.university)
    const startdate = edurow.map(value => value.startdate)
    const enddate = edurow.map(value => value.enddate)

    for (let i = 0; i < edurow.length; i++) {
        await educations.create({ eid: user.id, degree: degree[i], university: university[i], startdate: startdate[i], enddate: enddate[i] })
    }

    console.log(req.body)
    res.json({
        code: 200,
        message: "form submitted"
    })
});

//LOGIN
router.get("/login", async(req, res) => {
    res.render('login', { title: 'Login' })
})

router.post("/loginpost", passport.authenticate("local", {

    failureRedirect: "/loginpost",
    failureFlash: true
}), async(req, res) => {
    const userid = req.user.id;
    res.json({
        success: true,
        code: 200,
        message: "successfull login",
        userid: userid
    })
})

module.exports = router;