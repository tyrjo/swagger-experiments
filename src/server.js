var swaggerServer = require('swagger-server');
var app = swaggerServer('src/swagger.yaml');
 
// GET /users
/*
app.get('/users', function(req, res, next) {
    res.send(myListOfUsers);
});
*/
 
// Start listening on port 8000 
app.listen(8000, function() {
  console.log('Your REST API is now running at http://localhost:8000');
});