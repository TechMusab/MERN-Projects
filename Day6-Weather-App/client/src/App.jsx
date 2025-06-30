import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const handlegetWeather = async (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={23b20e1188aa3ab8fb0086afaa7f71f8}&units=metric`;
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again.");
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-green-400 flex justify-center items-center ">
        <div className="bg-white rounded-lg w-1/3 h-1/2 shadow-2xl p-4">
          <h1 className="font-bold p-4 text-4xl flex justify-center ">
            Weather App
          </h1>

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full py-2 px-4 my-4 border border-green-500 rounded-lg focus:outline-none focus:border-green-700"
            type="text"
            placeholder="Enter city name"
          />
          <div className="flex justify-center">
            <button
              onClick={() => handlegetWeather(city)}
              className="bg-green-400 rounded-lg px-6 py-2 cursor-pointer hover:bg-green-500"
            >
              Get Weather
            </button>
          </div>
          <div className="mt-6 bg-green-50 rounded-xl p-6 shadow-lg border border-green-100">
            <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
              Weather Details
            </h2>

            <div className="space-y-3 text-center text-gray-700 text-lg">
              <p>
                <span className="font-semibold text-green-600">City:</span>{" "}
                {weatherData.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-green-600">
                  Temperature:
                </span>{" "}
                {weatherData.main ? `${weatherData.main.temp} °C` : "N/A"}
              </p>
              <p>
                <span className="font-semibold text-green-600">Condition:</span>{" "}
                {weatherData.weather && weatherData.weather.length > 0
                  ? weatherData.weather[0].description
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
