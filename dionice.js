const fetch = require('node-fetch');
const fs = require('fs');

// const func = () => {return fetch("https://rest.zse.hr/web/Bvt9fe2peQ7pwpyYqODM/price-list/XZAG/2020-12-30/json")
//   .then(response => {return response.json()})
//   .then(data => {let database = data; return database;}).then(() => console.log('Ovaj dio znam da radi'))
//   .catch(err => console.log(err));
// }

// func();
// console.log(database);

// let dateAndTime = new Date(database.timestamp).toDateString();


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

// Idiotima je u fetch url kriva godina 2020
// var yyyy = today.getFullYear();
var yyyy = '2020';

today = yyyy + '-' + mm + '-' + dd;

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
.catch((err) => console.log(err))

  
