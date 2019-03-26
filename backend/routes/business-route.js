const businessService = require('../services/business-service.js')
// const reviewService = require('../services/review-service.js')
const geolib = require('geolib')

function addBusinessRoutes(app) {

    function _checkAdmin(req, res, next) {
        console.log('INSIDE MIDDLEWARE: ', req.session.user);
        if (!req.session.user || !req.session.user._id ) {
            res.status(401).end('Unauthorized');
            return;
        }
        next();
    }

    // LIST
    app.get('/business', (req, res) => {

        // var dist = geolib.getDistance(
        //     {latitude: 51.5103, longitude: 7.49347},
        //     {latitude: "51° 31' N", longitude: "7° 28' E"}
        // );
        // console.log('dist : ',dist);
        // console.log('FILTER:', req.query)
        var filterBy = (Object.keys(req.query).length > 0) ? req.query : ''
        businessService.query(filterBy)
            .then(business => {
                // console.log('HERE', business);
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
    app.get('/business/imgs', (req, res) => {
        var filterBy = req.query
        console.log('imgs query : ', filterBy);
        businessService.getImgs(filterBy)
            .then(imgs => {
                res.json(imgs)
            })

    })



    // SINGLE - GET Full details including reviews
    app.get('/business/:businessId', (req, res) => {
        const businessId = req.params.businessId;

            businessService.getById(businessId)
            // reviewService.query({ toyId })
    
            .then((business) => {
                res.json(business)
            })
    })

    
    // // DELETE
    // app.delete('/toy/:toyId',_checkAdmin, (req, res) => {
    //     const toyId = req.params.toyId;
    //     toyService.remove(toyId)
    //         .then(() => res.end(`Toy ${toyId} Deleted `))
    // })

    // CREATE
    app.post('/business',_checkAdmin, (req, res) => {
        console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeee');
        const business = req.body;
        businessService.add(business)
            .then(business => {
                res.json(business)
            })
    })

    // // UPDATE
    // app.put('/toy/:toyId',_checkAdmin, (req, res) => {
    //     const toy = req.body;
    //     toyService.update(toy)
    //         .then(toy => res.json(toy))
    // })

}


module.exports = addBusinessRoutes;