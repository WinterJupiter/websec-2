let PORT = process.env.PORT || 5500;
let http = require('http');
let express = require('express');
let app = express();
let server = http.Server(app);


app.use(express.static(__dirname));
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(PORT, () => {
    console.log('Listening on 5500');
});