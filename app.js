// var request = require('request');
// var cheerio = require('cheerio');
//
//
// // request('https://ballotpedia.org/Maryland_state_executive_offices', function (error, response, html) {
// //  if (!error && response.statusCode == 200) {
// //   var $ = cheerio.load(html);
// //   //Grabs information from given page, goes to item with id #Current_officeholders
// //   $('#Current_officeholders').each(function(i, element){
// //    var a = $(this).parent().next().children('tbody')
// //    var text = a.text();
// //    var url = a.attr('href');
// //    var metadata = {
// //      text: text,
// //      url: url
// //    }
// //    console.log(text);
// //   });
// //  }
// // });
//
// var obj1 = {};
// var obj2 = {};
//

//
// /*request('https://ballotpedia.org/Maryland', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     console.log(html);
//   }
// });*/
//
//
//
//
// //This one takes the articles from the given site and pulls relevant data
// /*request('https://news.ycombinator.com', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('span.comhead').each(function(i, element){
//       var a = $(this).prev();
//       var rank = a.parent().parent().text();
//       var title = a.text();
//       var url = a.attr('href');
//       var subtext = a.parent().parent().next().children('.subtext').children();
//       var points = $(subtext).eq(0).text();
//       var username = $(subtext).eq(1).text();
//       var comments = $(subtext).eq(2).text();
//       // Our parsed meta data object
//       var metadata = {
//         rank: parseInt(rank),
//         title: title,
//         url: url,
//         points: parseInt(points),
//         username: username,
//         comments: parseInt(comments)
//       };
//       console.log(metadata);
//     });
//   }
// });*/





const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const express = require('express')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(expressValidator());

app.use(express.static('./public'));

const route = require('./controllers/routes.js');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


route(app)

app.listen(process.env.PORT || '11000', () => {
    console.log(`App listening on port 11000!`)
})
