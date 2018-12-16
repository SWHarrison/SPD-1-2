var request = require('request');
var cheerio = require('cheerio');

var tableText = []
var officials = []

request('https://ballotpedia.org/Maryland_state_executive_offices', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //Grabs information from given page, goes to item with id #Current_officeholders
    $('#Current_officeholders').each(function(i, element){
      var a = $(this).parent().next().children('tbody')
      const b = $(this).parent().next();
      const c = $(b).find('td');
      c.each((i, el) => {
          tableText[i] = $(el).text().trim()
          // console.log(tableText[i])
      })
      for(var i = 0; i < 16; i++){
          //var name = tableText[i*3];
          //var party = tableText[i*3+1];
          //var title = tableText[i*3+2];
          //officials[i] = new Official(name, party, title);
          //console.log(officials[i])
          officials.push({
              "name" : tableText[i*3],
              "party" : tableText[i*3+1],
              "title" : tableText[i*3+2]
          })
          // console.log("this ran" + i)
          // console.log(officials[i])
      }
    });
  }
});

//
// var tableText_Maryland = [48];
//
// request('https://ballotpedia.org/Maryland_state_executive_offices', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     //Grabs information from given page, goes to item with id #Current_officeholders
//     $('#Current_officeholders').each(function(i, element){
//       var a = $(this).parent().next().children('tbody')
//       const b = $(this).parent().next();
//       const c = $(b).find('td');
//       c.each((i, el) => {
//           tableText_Maryland[i] = $(el).text().trim();
//           // obj2[i] = document.getElementById(tableText_Maryland[i]);
//           // console.log(obj2[tableText_Maryland[i]])
//           if((i%3) == 0) { //every 4th element is a new representative
//               // console.log(i);
//           };
//           // console.log(tableText_Maryland[i]);
//       });
//
//       // console.log($(this).parent().next().html())
//       // var text = a.text();
//       // var url = a.attr('href');
//       // var metadata = {
//       //     text: text,
//       //     url: url
//       // }
//       // console.log(text);
//     });
//   }
// });

var tableText_USHouse = [48]
var people = []

request('https://ballotpedia.org/United_States_congressional_delegations_from_Maryland', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //Grabs information from given page, goes to item with id #U.S._House
    $('#U\\.S\\._House').each(function(i, element){
      const b = $(this).parent().next().next();
      const c = $(b).find('td');
      c.each((i, el) => {
          tableText_USHouse[i] = $(el).text().trim();
          // obj1[i] = document.getElementById(tableText_Maryland[i]);
          // console.log(i)
          if((i%6) == 0) { //every 7th element is a new representative
              console.log(i);
          };
          //console.log(tableText_USHouse[i])
      })
      for(var i = 0; i < 8; i++){
          //var name = tableText[i*3];
          //var party = tableText[i*3+1];
          //var title = tableText[i*3+2];
          //officials[i] = new Official(name, party, title);
          //console.log(officials[i])
          people.push({
              "name" : tableText_USHouse[i*6],
              "party" : tableText_USHouse[i*6+1],
              "title" : tableText_USHouse[i*6+2],
              "date" : tableText_USHouse[i*6+3],
              "website" : tableText_USHouse[i*6+5]
          })
          // console.log("this ran" + i)
          // console.log(officials[i])
      }
    });
  }
});

module.exports = app => {

    app.get('/', (req, res) => {
        console.log("this ran");
        res.render("index", {officials});
    });



    app.get('/District1', (req, res) => {
        d1 = people.slice(0,1);
        res.render("District1", {d1});
    });
    app.get('/District2', (req, res) => {
        d1 = people.slice(2,3);
        res.render("District2", {d1});
    });
    app.get('/District3', (req, res) => {
        d1 = people.slice(6,7);
        res.render("District3", {d1});
    });
    app.get('/District4', (req, res) => {
        d1 = people.slice(1,2);
        res.render("District4", {d1});
    });
    app.get('/District5', (req, res) => {
        d1 = people.slice(7,8);
        res.render("District5", {d1});
    });
    app.get('/District6', (req, res) => {
        d1 = people.slice(5,6);
        res.render("District6", {d1});
    });
    app.get('/District7', (req, res) => {
        d1 = people.slice(3,4);
        res.render("District7", {d1});
    });
    app.get('/District8', (req, res) => {
        d1 = people.slice(4,5);
        res.render("District8", {d1});
    });
}
