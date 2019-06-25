const fetch = require('isomorphic-unfetch');

const key = 'df81b9878845e6510058e9dad1ebace7';

class DarkSkyAPI {
    static async getForecast(lat = '', lng = '') {
        const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=si`;
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
            return json;
        }

        throw new Error(json.error);
    }
}

// export default DarkSkyAPI;
module.exports = DarkSkyAPI;
