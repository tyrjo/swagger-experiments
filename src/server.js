var swaggerServer = require('swagger-server');
var Resource = swaggerServer.Resource;
var app = swaggerServer('src/swagger.yaml');
 
// GET /users
/*
app.get('/users', function(req, res, next) {
    res.send(myListOfUsers);
});
*/
app.dataStore.save(
    new Resource('/pets/Neko', {name: 'Neko', type: 'cat'} )
);
 
// Start listening on port 8000 
app.listen(8000, function() {
  console.log('Your REST API is now running at http://localhost:8000');
});