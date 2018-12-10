var request = require('request');
var cheerio = require('cheerio');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const express = require('express')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(expressValidator());

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var tableText = [48]

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
          //console.log(tableText[i])
      })
    });
  }
});

class Official {
    constructor(name, party, title){
        this.name = name;
        this.party = party;
        this.title = tile;
    }
}

var officials = [16]

for(var i; i < 16; i++){
    var name = tableText[i*3];
    var party = tableText[i*3+1];
    var title = tableText[i*3+2];
    officials[i] = new Official(name, party, title);
}

app.listen(process.env.PORT || '3000', () => {
    console.log(`App listening on port 3000!`)
})


app.get('/', (req, res) => {
    res.render("index", {officials});
});
