const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();

  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setWeatherData(data, place.formatted_address);
    });
});

var icon = new Skycons({ color: '#222' });
const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const temperatureElement = document.querySelector('[data-temperature]');
const precipitationElement = document.querySelector('[data-precipitation]');
const windElement = document.querySelector('[data-wind]');
icon.set('icon', 'clear-day');

function setWeatherData(data, place) {
  locationElement.textContent = place;
  statusElement.textContent = data.condition.text;
  temperatureElement.textContent = `${data.temp_c} ℃`;
  precipitationElement.textContent = `${data.precip_in * 1000}%`;
  windElement.textContent = `${data.wind_kph} km/h`;
  icon.set('icon', 'partly-cloudy-day');
}
