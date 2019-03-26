const appointsService = require('../services/appoints-service.js')

function addAppointsRoutes(app) {

    app.get('/appoints/:listRequireId', (req, res) => {
        console.log('ID : ',req.params);
        var listRequireId = req.params.listRequireId;
        var user = req.session.user;
        console.log('USER : ',user);
        var listRequire = (user.business_id) ? 'business' : 'user'
        const appointsQuery = {listRequire,listRequireId}
        // const listRequireId = req.params.listRequireId;
        appointsService.query(appointsQuery)
            .then((appoints) => {
                res.json(appoints)
            })
    })
    
}


module.exports = addAppointsRoutes;