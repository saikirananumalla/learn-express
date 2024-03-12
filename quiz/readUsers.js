const express = require('express')
const router = express.Router();

router.get('/usernames', (req, res) => {
    let usernames = req.users.map(function(user) {
        return {id: user.id, username: user.username};
    });
    res.send(usernames);
});

router.get('/username/:name', (req, res) => {
    let name = req.params.name;
    const mailUser = req.users.filter(user => user.username === name);

    if(mailUser.length === 0) {
        res.send({
                     error: {message: `${name} not found`}
                 })
    }

    res.send(mailUser);
})

module.exports = router