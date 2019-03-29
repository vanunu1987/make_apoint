const appointsService = require('../services/appoints-service.js')

function addAppointsRoutes(app) {

    function _checkAdmin(req, res, next) {
        console.log('INSIDE MIDDLEWARE: ', req.session.user);
        // if (!req.session.user || !req.session.user.business_id ) {
        if (!req.session.user ) {
            res.status(401).end('Unauthorized');
            return;
        }
        next();
    }

    app.get('/appoints', (req, res) => {
        var filterBy = (Object.keys(req.query).length > 0) ? req.query : ''
        appointsService.query(filterBy)
            .then((appoints) => {
                res.json(appoints)
            })
    })

    app.delete('/appoints/:appointId',_checkAdmin, (req, res) => {
        const appointId = req.params.appointId;
        appointsService.remove(appointId)
            .then(() => res.end(`Deleted`))
    })
   
    app.post('/appoints',_checkAdmin, (req, res) => {
        var appoint = req.body
        appointsService.add(appoint)
        .then((appoint) => {
            res.json(appoint)
        })
    })



    app.get('/appoints/data/:businessId',_checkAdmin,(req,res) => {
        var businessId = req.params.businessId
        appointsService.getBusinessData(businessId)
        .then((appoints) => {
            res.json(appoints)
        })
    })
    
}


module.exports = addAppointsRoutes;