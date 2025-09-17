    const express = require('express')
    const path = require('path')
    const app = express();
    const axios = require('axios');
    require('dotenv').config();
    const port = 3000;

    const api_key = process.env.WEATHER_API_KEY;


    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')


app.get("/", async (req, res) => {
    try{
        const city = "New Delhi";
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
        console.log(response);
        const currentTime = new Date().toLocaleTimeString();
        res.render("index.ejs", {data: response, time: currentTime});

    }
    catch(error){
        console.log("Failed to make request !", error);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})

app.post("/", async (req, res) =>{
    const {city} = req.body;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
        console.log(response);
        const currentTime = new Date().toLocaleTimeString();
        res.render("index.ejs", {data: response, time: currentTime});

    }
    catch(error){
        console.log("Failed to make request !", error);
        res.render("index.ejs", {
            error: error.message,
        });
    }
})
app.listen(port, () => {
    console.log("Server Running on port 3000 !")
})