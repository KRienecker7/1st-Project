var express  = require("express");
var server = express();

/*****************************************************************************/
/**********Server Configuartion */
/* win: ctr + p
/*****************************************************************************/

// render HTML from endpoints
var ejs = require('ejs');
server.set('views', __dirname + "/public");
server.engine('html', ejs.renderFile);
server.set('view engine', ejs);

//Server Static files (js, css, img, pdf, doc, .... which allows server to access all files in public)
server.use(express.static(__dirname + "/public"));


// body-parse to read paylod (ajax data) directly to object
var bparser = require('body-parser');
server.use(bparser.json());


/*****************************************************************************/
/**********Web Server which sends the intructions*/  
/*****************************************************************************/

//THESE ARE AN ENDPOINTS
server.get("/", function(req, res){
    res.render("index.html");
});

server.get("/admin", function(req, res){
    res.render("admin.html");
});

server.get("/about", function(req, res){
    res.render("about.html");
});

server.get("/work", function(req, res){
    res.send("Page Coming Soon...");
});

server.get("/contact", function(req, res){
    res.send("Page Coming Soon...");
});


/*****************************************************************************/
/*******Rest API is where the end points that don't respond to html but work nire with end point i.e.json*/
/*****************************************************************************/

var data = [];
var cnt = 1;

server.post('/api/items', function(req, res){
    //code here to save the item
    var item = req.body;

    if(!item.price){
        res.status(400); //bad request
        res.send("Price is required on the Item");
    }

    else{
        data.push(item);
        
        item.id = cnt;
        cnt +=1;
        item.status = 'Saved!';

        res.status(201); //created
        res.json(item);
    }
});


server.get('/test/1',(req, res) => {
    //sole the problem and reply results

    //data
    var nums = [81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99];

    //problem: find the biggest number in the array
    //your code
    greater: function(81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99){
        var greater = Math.max(81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99);  
    }
    //result

    res.send("Res: " +3);
});

// > 3000
server.listen(8080, function(){
    console.log("Server running at http://:localhost:8080");
});

//Rest API
// Mongo DB and Mongoose
// npm install --global nodemon