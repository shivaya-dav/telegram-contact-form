const express = require('express');
const request = require('request');
const multer = require('multer');
const path = require('path');
const app = express();
const botToken = 'your telegram bot token';
const channelID = 'your chat id or channel, group id';
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.use(express.static(path.join(__dirname, 'public')));
app.post('/send-message', upload.none(), (req, res) => {
    const { name, username, message } = req.body;
    let text = `Name: ${name}\nTelegram Username: ${username}\nMessage: ${message}`;
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
        chat_id: channelID,
        text,
        parse_mode: 'Markdown'
    };

    request.post({
        url: apiUrl,
        json: payload
    }, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ ok: false });
        } else {
            if (body.ok) {
                res.json({ ok: true });
            } else {
                res.status(500).json({ ok: false });
            }
        }
    });
});

// Error handle
/* app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ ok: false });
}); */

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
