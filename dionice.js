const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('This will be a great API')
})

app.listen(5000, () => console.log('app istening ona a port 5000!!'))

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

//  Wrong year in the url...host mistake
var yyyy = today.getFullYear();
// var yyyy = '2020';

today = yyyy + '-' + mm + '-' + dd;
// let today2 = '2021-01-04';

const url = `https://rest.zse.hr/web/Bvt9fe2peQ7pwpyYqODM/price-list/XZAG/${today}/json`; // site that doesn’t send Access-Control-*

fetch(url)
.then(response => response.json())
.then(contents => {
    let result = [...contents.securities];
    console.log('Dionice kojima je pala vrijednost:');
    console.log('...')
    let listNegative = result.map(x => { if ((Number(x.open_price) - Number(x.close_price) > 0) && ( x.close_price && x.open_price != null )) {
        console.log(x.symbol + ' je pala vrijednost u iznosu ' + (((Number(x.open_price) - Number(x.close_price))/Number(x.open_price))*100).toFixed(2) + '% po dionici.' );
    }});
    console.log('...');
    console.log('Dionice kojima je narasla vrijednost:');
    console.log('...')
    let listPositive = result.map(x => { if ((Number(x.close_price) - Number(x.open_price) > 0) && ( x.close_price && x.open_price != null )) {
        console.log(x.symbol + ' je narasla vrijednost u iznosu ' + (((Number(x.close_price) - Number(x.open_price))/Number(x.open_price))*100).toFixed(2) + '% po dionici.' );
    }});

    // console.log(list);
    // fs.writeFile('podaci.docx', list, () => console.log('saved'));
})
.catch((err) => console.log(err + 'VJEROJATNO STE ZAHTJEV POSLALI PRERANO, PODACI SU DOSTUPNI TEK PO ZATVARANJU BURZE ILI NISTE SPOJENI NA INTERNET'))

  
