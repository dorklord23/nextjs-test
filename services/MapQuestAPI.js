const fetch = require('isomorphic-unfetch');

const key = 'YcSLQsZDXKIWmnNZl0C3gEGeftxRfhMF';

async function retrievePosition(type, location) {
    const url = `http://www.mapquestapi.com/geocoding/v1/${type}?key=${key}&location=${location}`;
    const response = await fetch(url);
    const json = await response.json();

    if (response.ok) {
        return json;
    }

    throw new Error(json.info.messages.join(`<br>`));
}

class MapQuestAPI {
    static getCoord(location = '') {
        const type = 'address';
        return retrievePosition(type, location);
    }

    static getLocation(lat = '', lng = '') {
        const type = 'reverse';
        return retrievePosition(type, `${lat},${lng}`);
    }
}

module.exports = MapQuestAPI;
