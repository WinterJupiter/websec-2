let PORT = process.env.PORT || 5500;
let XMLHttpRequest = require('xhr2');
const fs = require("fs");
let http = require('http');
let path = require('path');
let express = require('express');
let app = express();
let server = http.Server(app);
const unirest = require("unirest");


app.use(express.static(__dirname));
app.get('/', function(req, res) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
    console.log('Listening on 5500');
});

app.get('/rasp', (req, res) => {
    let url = "https://ssau.ru" + req.url;
    let request = new XMLHttpRequest();
    let jsonData;
    request.open("GET", url, true);
    request.send(null);
    currentWeek = 17;
    var result = getHTML('https://ssau.ru/rasp?groupId=531030143', 'schedule__item');
    result.then(function(data) {
        console.log(data); 
        console.log(typeof data);
        jsonData = JSON.stringify(handling(data));
    })
    res.send(jsonData);
});


const getHTML = async(url, tag) => {
    const response = await unirest.get(url);
    let data = response.body;
    if(response.status !== 200){
        return null;
    }
    //console.log(data);
    const cheerio = require('cheerio');
    const $ = cheerio.load(data);
    //console.log($.text());
    const divsWithClass = $(`div.${tag}`);
    result = [];
    divsWithClass.each((i, div) => {
        result.push($(div).text());
        //console.log($(div).text());
    });
    return result;
}

function handling(data) {

};

app.get('/getTeachers', (req, res) => res.sendFile(path.join(__dirname, 'teacher.json')))
app.get('/getGroups', (req, res) => res.sendFile(path.join(__dirname, 'group.json')))

