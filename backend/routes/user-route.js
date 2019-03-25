const userService = require('../services/user-service')
// const reviewService = require('../services/review-service')
const BASE = '/user'

function addRoutes(app) {

    // app.get(BASE, (req, res) => {
    //     userService.query()
    //         .then(users => res.json(users))
    // })
    // app.get(`${BASE}/:id`, (req, res) => {
    //     const userId = req.params.id
    //     Promise.all([
    //         userService.getById(userId),
    //         reviewService.query({ userId })
    //     ])
    //         .then(([user, reviews]) => {
    //             console.log({ user })
    //             res.json({ user, reviews })
    //         })
    // })

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
        console.log(req.body);
        userService.checkLogin(credentials)
            .then(user => {
                req.session.user = user
                console.log('FOUND',user);
                res.json(user)
            })
    })

    app.put(`${BASE}/:userId`, (req, res) => {
        const userId = req.params.userId;
        const user = req.body;
        console.log('ID : ',userId);
        console.log('USER : ',user,);
        userService.update(user)
            .then(user => res.json(user))
    })

}


module.exports = addRoutes;