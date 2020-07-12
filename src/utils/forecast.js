const request = require('request')
const forecast = (latitude, longitude, callback) => {

    const urlweather = 'http://api.weatherstack.com/current?access_key=d55315028ce77b45f81345f0e18f59d7&query=' + latitude + ',' + longitude + '&units=m'
        

    request({ url: urlweather, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)

           } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, "Weather in " + body.location.region + "." + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out.")
        }
     })

}

module.exports = forecast