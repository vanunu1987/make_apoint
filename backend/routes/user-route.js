const userService = require('../services/user-service')
// const reviewService = require('../services/review-service')
const BASE = '/user'

function addRoutes(app) {

    app.post(`${BASE}/signup`, (req, res) => {
        const credentials = req.body
        userService.addUser(credentials)
            .then(user =>{
                req.session.user = user
                res.json(user)
            })
    })

    app.put(`${BASE}/login`, (req, res) => {
        const credentials = req.body
        console.log(credentials);
        if (Object.keys(credentials).length===0){
            req.session.user=null
            return res.json(null)
        }
        
        userService.checkLogin(credentials)
        .then(user => {
            req.session.user = user
            res.json(user)
            console.log(user);
            })
    })

    app.put(`${BASE}/:userId`, (req, res) => {
        const userId = req.params.userId;
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })

    app.get(`${BASE}/:userId`, (req, res) => {
        const userId = req.params.userId;
        userService.query(userId)
            .then(user => res.json(user))
    })

}


module.exports = addRoutes;