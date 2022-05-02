import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import HandleCityChange from "./component/WeatherButton";
//import ClipLoader from "react-spinners/ClipLoader";
import { SpinnerCircular } from "spinners-react";
//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨 정보에는 도시,섭씨 화시 날씨 상태
//3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른 도시 )
//4. 도시버튼을 클릭할때 마다 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setweather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setloading] = useState(false);
  const cities = ["Suwon-si", "paris", "new york", "tokyo", "seoul"];

  console.log("choice:", city);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getweatherByCurrentLocation(lat, lon);
    });
  };

  const getweatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=103121070517896ae20f370d01d491f0&lang=en&units=metric`;
    setloading(true);
    let response = await fetch(url);
    let data = await response.json();
    setweather(data);
    setloading(false);
  };

  const getweatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=103121070517896ae20f370d01d491f0&units=metric`;
    setloading(true);
    let response = await fetch(url);
    let data = await response.json();
    setweather(data);
    setloading(false);
  };
  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getweatherByCity();
    }
  }, [city]);

  // const handleCityChange=(city)=>{
  //   if(city=='current'){
  //     getCurrentLocation();
  //    }else{
  //      getweatherByCity();
  //    }
  // };

  // const handleCityChange = (city) => {
  //   if (city === "current") {
  //     setCity(null);
  //   } else {
  //     setCity(city);
  //   }
  // };

  return (
    <div>
      {loading ? (
        <div class="container">
          <SpinnerCircular color="#f88c6b" enabled={loading} size={150} />
        </div>
      ) : (
        <div class="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
      ;
    </div>
  );
}

export default App;
