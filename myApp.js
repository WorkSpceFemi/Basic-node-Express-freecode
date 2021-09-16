var express = require('express');

var bodyParser=require('body-parser');

var app = express();

//console.log("Hello World");
app.use(bodyParser());
app.use(function(req,res,next){
  console.log(req.method+ " " +req.path+ " - " +req.ip);
  next();
});

app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(bodyParser.json());

/*app.use(function(req,res,next){
  bodyParser.urlencoded({extended: false});
  console.log(bodyParser);
  next();
});*/

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/views/index.html");
  });

app.use("/public",express.static(__dirname+"/public/"));


app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);


app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});
app.get("/name", (req, res) => {
  var first=req.query.first;
  var last=req.query.last;
  var {first:firstName,last:lastName}=req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name",function(req,res){
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});




app.get("/json",function(req,res){
  if(process.env.MESSAGE_STYLE==="uppercase"){
    res.json({"message":"HELLO JSON"});
  }else{
    res.json({"message":"Hello json"});
  }
});






































 module.exports = app;
