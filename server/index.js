const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 4400;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/launch', (req, res) => {
    const { browser, url } = req.body;

    if (!browser || !url) {
        return res.status(400).send('Missing browser or url parameter');
    }

    switch (browser) {
        case 'chrome':
            exec(`open -a "Google Chrome" "${url}"`);
            break;
        case 'safari':
            exec(`open -a "Safari" "${url}"`);
            break;
        case 'firefox':
            exec(`open -a "Firefox" "${url}"`);
            break;
        default:
            console.log(`No browser match for ${browser}`);
            res.status(400);
            return;
    }

    res.status(200).send('Launch command executed');
});

// Render browser-select.html
app.get('/', (req, res) => {
    res.sendFile('browser-select.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});