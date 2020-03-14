var port = process.env.PORT || 1010;
var express = require('express');
var app = express();
require( "./src" )( app );

app.listen(port, () => {
    console.log( `Listening on port ${port}` );
});