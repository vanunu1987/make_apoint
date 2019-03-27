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
        console.log('appoints filter : ',filterBy);
        // var user = req.session.user;
        // const appointsQuery = {listRequire,listRequireId}
        // const listRequireId = req.params.listRequireId;
        appointsService.query(filterBy)
            .then((appoints) => {
                console.log('APPOINTS : ',appoints);
                res.json(appoints)
            })
    })

    app.get('/business', (req, res) => {
        var filterBy = (Object.keys(req.query).length > 0) ? req.query : ''
        businessService.query(filterBy)
            .then(business => {
                var newArr = business.map((bus) => {
                    bus.dist = geolib.getDistance(   
                    {latitude: bus.location.lat, longitude: bus.location.lng},
                    {latitude: filterBy.locationLat, longitude: filterBy.locationLng}
                    );
                    return bus
                })
                newArr.sort((busA,busB) => {
                    return busA.dist - busB.dist;
                })
                res.json(newArr)
            })
    })

    app.post('/appoints',_checkAdmin, (req, res) => {
        var appoint = req.body
        console.log('got this in backend : ',appoint)
        appointsService.add(appoint)
        .then((appoint) => {
            console.log('APPOINT ADDED ON BACK : ',appoint);
            res.json(appoint)
        })
    })



    app.get('/appoints/data/:businessId',_checkAdmin,(req,res) => {
        console.log(req.params)
        var businessId = req.params.businessId
        appointsService.getBusinessData(businessId)
        .then((appoints) => {
            console.log('DATA : ', appoints);
            res.json(appoints)
        })
    })
    
}


module.exports = addAppointsRoutes;