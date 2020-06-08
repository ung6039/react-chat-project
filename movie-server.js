const express=require('express')
const app=express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(3355,()=>{
    console.log("Server Start...","http://localhost:3355")
})

const Client=require("mongodb").MongoClient

app.get('/movie',(req,res)=>{

    var url="mongodb://211.238.142.181:27017";
    // 연결
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb")
        db.collection("movie").find({cateno:1})
            .toArray((err,docs)=>{
                res.json(docs)
                client.close()
            })
    })
})