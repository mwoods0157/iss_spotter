const request = require('request');

//Good function
const fetchMyIP = function(callback) { 
    // use request to fetch IP address from JSON API
    request('https://api.ipify.org?format=json', (error, response, body) => {
        //console.log('error', error);
        //console.log('status code', response && response.statusCode);
        //console.log('body', body);
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
            callback(Error(msg), null);
            return;
        }
        const data = JSON.parse(body);
        return callback(null, data['ip']);
    })
} 
//Good function
const fetchCoordsByIp = function(ip, callback) {
    request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
        //console.log('error', error);
        //console.log('status code', response && response.statusCode);
        //console.log('body', body);
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
        }
        const data = JSON.parse(body);
        let newData = {};
        for (const [key, value] of Object.entries(data)) {
            if (key === 'latitude' || key === 'longitude') {
                newData[key] = value;
            }
        }
        console.log(newData);
        return callback(ip, (error, newData));
    })
}


const fetchISSFlyOverTimes = function(data, callback) {
    request(`https://iss-pass.herokuapp.com/json/?lat=${data.latitude}&lon=${data.longitude}`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode !== 200) {
            callback(Error(`status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
            return;
        }

        const pass = JSON.parse(body).response;
        callback(null, pass);
    });
};

const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error, null);
        }

        fetchCoordsByIp(ip, (error, loc) => {
            if (error) {
                return callback(error, null);
            }

            fetchISSFlyOverTimes(loc, (error, pass) => {
                if (error) {
                    return callback(error, null);
                }

                callback(null, pass);
            });
        });
    });
};

module.exports = {nextISSTimesForMyLocation};
//module.exports = {fetchISSFlyOverTimes};
//module.exports = { fetchMyIP, fetchCoordsByIp };