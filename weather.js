
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/weather.html");
});

app.post("/",function(req,res){
  const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + req.body.cityname + "&appid=c105d11229bb56aa82af0dc91e2aa9eb";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const WeatherData=JSON.parse(data);
      const temp=WeatherData.main.temp;
      const humidity=WeatherData.main.humidity;
      const icon = "http://openweathermap.org/img/wn/" + WeatherData.weather[0].icon + "@2x.png";
      const discription=WeatherData.weather[0].description;
      res.write("<h1>The temperature in " + req.body.cityname + " is " + temp + "  deg. C</h1>");
      res.write("<h2> The weather is " + discription + "</h2>");
      res.write("<h2>Humidity is " + humidity + "</h2>");
      res.write("<img src=" + icon + ">");
      res.send();
    });

  });

});

app.listen(3000);
