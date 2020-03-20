const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

app.get("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.post("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.delete("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.put("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.patch("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.listen(port);
