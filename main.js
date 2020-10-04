const vision = require('@google-cloud/vision');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());

app.set('view-enbgine', 'ejs');

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.post('/cuit', async (req,res) => {
    const cuit = req.body.cuit;
    const detections = await testOCR(cuit);
    const isCuitFound = detections.find(element => element.description == cuit);
    console.log(isCuitFound);
    const body = {cuit, isCuitFound, detections}
    res.render('cuit.ejs', body);     
})

app.listen(5000, '127.0.0.1', ()=> console.log("Server Running"));

let cuit = 123;

async function testOCR(cuit){
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'apiKey.json'
    });
    const fileName = './resources/ticket.png';
    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    //detections.forEach(text => console.log(text));
    return detections;
}

testOCR(123);


