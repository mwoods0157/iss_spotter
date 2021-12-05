//const {fetchMyIP, fetchCoordsByIp} = require('./iss');
//const {fetchISSFlyOverTimes} = require('./iss');
const nextISSTimesForMyLocation = require('./iss');
/*
fetchMyIP((error, ip) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    } else {
        console.log("It worked! Returned IP:", ip);
    }
});

fetchCoordsByIp(ip, (error, coordinates) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    } else {
        console.log("It worked! Return data:", coordinates);
    }
});

const data = { latitude: 43.6567, longitude: -79.34 };

fetchISSFlyOverTimes(data, (error, pass) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    } else {
        console.log("It worked! Returned flyover times: ", pass);
    }
}); */


nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log("It didn't work!", error);
    }

    console.log(passTimes);
});

const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
        const startDate = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
};