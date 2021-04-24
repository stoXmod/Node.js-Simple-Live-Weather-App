const { response } = require("express");
var express = require("express");
var router = express.Router();
const request = require("request");

/* GET home page. */
router.get("/", async function(req, res, next) {
    function apiCall(reqOps) {
        return new Promise((resolve, reject) => {
            request(reqOps, (err, res, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(res.body));
                }
                reject(err);
            });
        });
    }

    var getGeo = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=Bandarawela,+CA&key=AIzaSyBViPksJ5V993T1QOXq3TZqDKMux6t3eq0&limit=1`
    };

    var getWhether = {
        url: `http://api.weatherstack.com/current?access_key=621487873cf0ef750195cd8f66b36f56&query=Bandarawela`
    };

    try {
        let geoData = await apiCall(getGeo);
        const x = geoData.results;
        const y = x[0];
        const latitude = y.geometry.location.lat;
        const longitude = y.geometry.location.lng;

        let wData = await apiCall(getWhether);
        const Whdata = wData.current;
        const Whlocat = wData.location;
        console.log(Whdata.weather_descriptions[0])

        res.render("pages/index", {
            title: `Home`,
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            Query: `Bandarawela , Sri Lanka`,
            lname: `${Whlocat.name}`,
            lcountry: `${Whlocat.country}`,
            temp: `${Whdata.temperature}`,
            whetherIcon: `${Whdata.weather_icons}`,
            whetherDes: `${Whdata.weather_descriptions[0]}`,
            windSpeed: `${Whdata.wind_speed}`,
            humidity: `${Whdata.humidity}`,
            winddeg: `${Whdata.wind_degree}`,
            windder: `${Whdata.wind_dir}`,
            pressure: `${Whdata.pressure}`,
            visibility: `${Whdata.visibility}`,
            precip: `${Whdata.precip}`,
            cc: `${Whdata.cloudcover}`,
            feelslike: `${Whdata.feelslike}`,
            uv: `${Whdata.uv_index}`,
            obsTime: `${Whdata.observation_time}`
        });
    } catch (err) {
        console.log("Error occurred in one of the API call: ", err);
    };

});

// get current location webstartup

// get geo and whether info
router.post('/', async(req, res) => {
    var searchQuery = req.body.searchedQ;
    console.log(searchQuery);

    function apiCall(reqOps) {
        return new Promise((resolve, reject) => {
            request(reqOps, (err, res, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(res.body));
                }
                reject(err);
            });
        });
    }

    var getGeo = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery},+CA&key=AIzaSyBViPksJ5V993T1QOXq3TZqDKMux6t3eq0&limit=1`
    };

    var getWhether = {
        url: `http://api.weatherstack.com/current?access_key=621487873cf0ef750195cd8f66b36f56&query=${searchQuery}`
    };

    try {
        let geoData = await apiCall(getGeo);
        const x = geoData.results;
        const y = x[0];
        const latitude = y.geometry.location.lat;
        const longitude = y.geometry.location.lng;

        let wData = await apiCall(getWhether);
        const Whdata = wData.current;
        const Whlocat = wData.location;
        console.log(Whdata.weather_descriptions[0])

        res.render("pages/index", {
            title: `${searchQuery}`,
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            Query: `${searchQuery}`,
            lname: `${Whlocat.name}`,
            lcountry: `${Whlocat.country}`,
            temp: `${Whdata.temperature}`,
            whetherIcon: `${Whdata.weather_icons}`,
            whetherDes: `${Whdata.weather_descriptions[0]}`,
            windSpeed: `${Whdata.wind_speed}`,
            humidity: `${Whdata.humidity}`,
            winddeg: `${Whdata.wind_degree}`,
            windder: `${Whdata.wind_dir}`,
            pressure: `${Whdata.pressure}`,
            visibility: `${Whdata.visibility}`,
            precip: `${Whdata.precip}`,
            cc: `${Whdata.cloudcover}`,
            feelslike: `${Whdata.feelslike}`,
            uv: `${Whdata.uv_index}`,
            obsTime: `${Whdata.observation_time}`
        });
    } catch (err) {
        console.log("Error occurred in one of the API call: ", err);
    };

})


// get current location
router.post('/current', async(req, res) => {
    geoCodes = {
        lat: req.body.lat,
        lng: req.body.lng
    }

    console.log(geoCodes.lat)

    function apiCall(reqOps) {
        return new Promise((resolve, reject) => {
            request(reqOps, (err, res, body) => {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(res.body));
                }
                reject(err);
            });
        });
    }

    var getWhether = {
        url: `http://api.weatherstack.com/current?access_key=621487873cf0ef750195cd8f66b36f56&query= ${geoCodes.lat},${geoCodes.lng}`
    };

    console.log(getWhether.url)

    try {
        let wData = await apiCall(getWhether);
        const Whdata = wData.current;
        const Whlocat = wData.location;
        console.log(Whdata.weather_descriptions[0])

        res.send({
            title: '',
            msg: 'success',
            success: true,
            latitude: ``,
            longitude: ``,
            Query: `${Whlocat.name}`,
            lname: `${Whlocat.name}`,
            lcountry: `${Whlocat.country}`,
            temp: `${Whdata.temperature}`,
            whetherIcon: `${Whdata.weather_icons}`,
            whetherDes: `${Whdata.weather_descriptions[0]}`,
            windSpeed: `${Whdata.wind_speed}`,
            humidity: `${Whdata.humidity}`,
            winddeg: `${Whdata.wind_degree}`,
            windder: `${Whdata.wind_dir}`,
            pressure: `${Whdata.pressure}`,
            visibility: `${Whdata.visibility}`,
            precip: `${Whdata.precip}`,
            cc: `${Whdata.cloudcover}`,
            feelslike: `${Whdata.feelslike}`,
            uv: `${Whdata.uv_index}`,
            obsTime: `${Whdata.observation_time}`
        });
    } catch (err) {
        console.log("Error occurred in one of the API call: ", err);
    };

})

module.exports = router;