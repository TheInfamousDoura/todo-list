const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//************************************************************************************* */

//first route
app.get("/", function(req, res){
    let day = date.getDate();
    //let weekday = date.getDay();
    res.render("list", {listTitle: day, newListItems: items});
});

//************************************************************************************* */

//second route
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

//************************************************************************************* */

//Third route

app.get("/about", function(req, res){
    res.render("about");
});

//************************************************************************************* */

// first route response

// logic error line : 58 : solved here
// solution is to use the response of the root route to have some logic (descision making) to see if the title
// is work list or main list and choose wether to render back to the root route or the work route 


app.post("/", function(req, res){
    let item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

//************************************************************************************* */
// this part cause a logical error, as everytime i add a new value to the work list , it gets added 
// to the items array not the workItems array. becaue the form has a method of post to the root route
// not the work route
// solution line : 41
// second route response code that caused the logical error!!
        // app.post("/work", function(req, res){
        //     let item = req.body.newItem;
        //     workItems.push(item);
        //     res.redirect("/work");
        // });


app.listen(3000, function (req,res){
    console.log("server is running at port 3000");
});