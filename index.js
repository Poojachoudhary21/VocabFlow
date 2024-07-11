import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();
const api_url ="https://api.dictionaryapi.dev/api/v2/entries/en/";

app.use(bodyParser.urlencoded({extended : true}));


app.use(express.static("public"));
app.get("/",async(req,res)=>{
    try{
        const respone = await axios.get(`${api_url}world`);
        const result = respone.data;
        res.render("index.ejs",{
            word:result[0].word,
            phonetics:result[0].phonetic,
            definition:result[0].meanings[0].definitions[0].definition,
            example:result[0].meanings[0].definitions[0].example,
            audio:result[0].phonetics[0].audio || "no voice"
        });
    }catch(error){
        console.log("error found " + error.message);
        res.render("index.ejs");
    }
    
    
});

app.post("/",async(req,res)=>{

    const word = req.body.textInput;
    console.log(word);
   
    try{
        console.log("hey");

        const respone = await axios.get(`${api_url}${word}`);
        console.log("helo");
        const result=respone.data;
        console.log(result[0].word);
        console.log(result[0].phonetic);
        console.log(result[0].meanings[0].definitions[0].definition);
        console.log(result[0].meanings[0].definitions[0].example);
        console.log(result[0].phonetics[0].audio);
    
        res.render("index.ejs",{
            word:result[0].word,
            phonetics:result[0].phonetic,
            definition:result[0].meanings[0].definitions[0].definition,
            example:result[0].meanings[0].definitions[0].example,
            audio:result[0].phonetics[0].audio

        });
        
    }catch(error){
        console.log("error found " + error.message);
        res.render("index.ejs");
    }

})

app.listen(3000,()=>{
    console.log("Server start on port 3000");
});