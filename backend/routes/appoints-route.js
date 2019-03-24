const appointsService = require('../services/appoints-service.js')

function addAppointsRoutes(app) {
    // app.get(BASE, (req, res) => {
    //     appointsService.query(req.query)
    //         .then( appoints => {
    //             res.json(appoints)
    //         })
    // })

    app.get('/appoints/:businessId', (req, res) => {
        console.log('GET : ',req.params);
        const businessId = req.params.businessId;
        appointsService.query(businessId)
            .then((appoints) => {
                res.json(appoints)
            })
    })

    // app.post(BASE, (req,res) => {
    //     var review ={
    //         // userId: req.session.userId
    //         userId : req.body.userId,
    //         carId : req.body.carId,
    //         content: req.body.content
    //     }
    //     reviewService.addReview(review)
    //         .then(review => res.json(review))
    // })
}


module.exports = addAppointsRoutes;