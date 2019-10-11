const express = require('express')
const route = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')



route.post('/api/signup', (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) res.status(401).json({ message: "all fields need to be filled" })

    User.findOne({ username: username })
        .then(alreadySignedUpUser => {
            if (alreadySignedUpUser !== null) return res.status(401).json({ message: "username already taken" })
        })

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    User.create({
        username,
        password: encryptedPassword
    }).then(user => {
        res.status(200).json({ user })
    })
})


// route.post("/api/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, failureDetails) => {
//         if (err) {
//             res.status(500).json({ message: "Something went wrong with login." })
//         }
//         if (!user) {
//             res.status(401).json(failureDetails);
//         }
//         req.login(user, (err) => {
//             if (err) {
//                 res.status(500).json({ message: "Something went wrong with getting user object from DB" })
//                 return;
//             }
//             user.encryptedPassword = undefined;
//             res.status(200).json({ user });
//         })
//     })(req, res, next);
// })

route.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
        if (!user) {
            res.status(401).json(failureDetails);
            return;
        }
        // save user in session
        req.login(user, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
            user.encryptedPassword = undefined
            res.status(200).json({ user });
        });
    })(req, res, next);
});






module.exports = route