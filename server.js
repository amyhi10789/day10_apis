const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let dataStore = [{ name: "Teacher", message: "API is live!" }];

app.get('/api/messages', (req, res) => {
    res.json(dataStore);
});

app.post('/api/messages', (req, res) => {
    dataStore.push(req.body);
    res.status(201).send({ message: "Received!" });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));