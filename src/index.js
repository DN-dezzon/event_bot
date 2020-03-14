const eventrouter = require( "./app/router" );

module.exports = ( app ) => {
    app.use( "/program", eventrouter );
};
