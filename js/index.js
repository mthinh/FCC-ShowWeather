$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){

      var lat = position.coords.latitude; //vi do 
      var long = position.coords.longitude;//kinh do 
      var api = "https://api.darksky.net/forecast/c2967b46e19d21c46c7c787d3ddf92c6/"+lat+"," +long+"?callback=?";

      $.getJSON(api,function(data){
        console.log(data);
        var tempInF= Math.floor(data.currently.temperature);
        var tempInC=Math.floor((tempInF - 32)/1.8);
        var tempSwap = true;

        var weatherDes= data.currently.summary;
        var cityArr = data.timezone.split("/");
        var cityName = cityArr[1].replace(/[^a-z0-9]/gi," ");
        // console.log(tempInC);

        $("#des").html(weatherDes); //Weather condition 
        $("#city-name").html(cityName); //city
        $("#temp").html(tempInC);//Temp in C
        //click C -> F
        //use tempSwap to track the click 
        $("#weather-temp").on('click',function(){
          if(tempSwap===false){
            $("#temp").html(tempInF);
            $("#degree-sym").html('&#8457');
            tempSwap=true;
          }else{
            $("#temp").html(tempInC);
            $("#degree-sym").html("&#8451");
            tempSwap=false;
          }
        });
        //     end of C -> F
        var icon = data.currently.icon;
        console.log(icon);
        switch(icon){
          case "clear-day":
            $("#weather-icon").addClass("wi wi-day-sunny");
            $(".container").css("background","linear-gradient(to right, #ff5f6d, #ffc371), #29323c)");
            break;

          case "clear-night":
            $("#weather-icon").addClass("wi wi-night-clear");
            $(".container").css("background","linear-gradient(to right, #2980b9, #2c3e50)");
            break;

          case "partly-cloudy-day":
            $("#weather-icon").addClass("wi wi-day-cloudy");
            $(".container").css("background","linear-gradient(to right, #00d2ff, #3a7bd5)");
            break;

          case "partly-cloudy-night":
            $("#weather-icon").addClass("wi wi-night-alt-cloudy");
            $(".container").css("background","linear-gradient(to right, #2c3e50, #4ca1af)");        
            break;

          case "cloudy":
            $("#weather-icon").addClass("wi wi-cloudy");
            $(".container").css("background"," linear-gradient(to right, #0575e6, #021b79)");  
            break;

          case "rain":
            $("#weather-icon").addClass("wi wi-rain");
            $(".container").css("background","linear-gradient(to right, #485563, #29323c)");
            break;

          case "sleet":
            $("#weather-icon").addClass("wi wi-sleet");
            $(".container").css("background","linear-gradient(to right, #485563, #29323c)");
            break;

          case "snow":
            $("#weather-icon").addClass("wi wi-snow");
            $(".container").css("background"," linear-gradient(to right, #6190e8, #a7bfe8)");
            break;

          case "wind":
            $("#weather-icon").addClass("wi wi-windy");
            $(".container").css("background"," linear-gradient(to right, #ffd89b, #19547b)");
            break;

          case "fog":
            $("#weather-icon").addClass("wi wi-fog");
            $(".container").css("background"," linear-gradient(to right, #b993d6, #8ca6db)");
            break;
                   }
        //     end of switch
      });
      //     end of get json
    });
  }

  //get current location  
});