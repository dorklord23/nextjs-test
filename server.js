const express = require('express');
const next = require('next');

const ds = require('./services/DarkSkyAPI');
const mq = require('./services/MapQuestAPI');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.get('/weather/:lat,:lng', (req, res) => {
            const actualPage = '/weather';
            const queryParams = {
                cityName: 'XXX',
                lat: req.params.lat,
                lng: req.params.lng,
            };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('/forecast/:lat,:lng', async (req, res) => {
            try {
                const { lat, lng } = req.params;
                const json = await ds.getForecast(lat, lng);
                res.json(json);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        server.get('/coord/:location', async (req, res) => {
            try {
                const { location } = req.params;
                const json = await mq.getCoord(location);
                res.json(json);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        server.get('/location/:lat,:lng', async (req, res) => {
            try {
                const { lat, lng } = req.params;
                const json = await mq.getLocation(lat, lng);
                res.json(json);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
