let mjml = require('mjml');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.post('/render', (req, res) => {

    if(!req.body.mjml) {
        res.status(400).json({code: 400, message: 'No mjml provided'});
        return;
    }

    let htmlEmail = new mjml(req.body.mjml);
    res.status(200).json(htmlEmail);

});

let port = process.env.PORT || 8997;
let httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('mjml engine running on port ' + port + '.');
});


