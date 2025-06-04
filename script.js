const API_KEY = "1e51bdbfae664a1d982140222250406";

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!location) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://corsproxy.io/?https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>❌ ${data.error.message}</p>`;
    } else {
      resultDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${data.current.condition.icon}" class="weather-icon" alt="Weather Icon">
        <p><strong>${data.current.temp_c}°C</strong></p>
        <p>${data.current.condition.text}</p>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>⚠️ Error fetching data. Please try again later.</p>`;
  }
}
