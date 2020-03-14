const controller = require( "./controller" );
const express = require( "express" );
const router = express.Router( );

router.get( "/event/id=:eventid", controller.detail );

module.exports = router;