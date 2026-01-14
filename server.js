const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});


let dataStore = [{ name: "Teacher", message: "API is live!" }];

app.get('/api/messages', (req, res) => {
    res.json(dataStore);
});

app.post('/api/messages', (req, res) => {

    const { name, message } = req.body;

    if (!name || name.trim() == "") {
        return res.status(400).json({ error: "Name cannot be empty." });
    }

    if (!message || message.trim().length < 5) {
        return res.status(400).json({ error: "Message must be at least 5 characters long" });
    }

    dataStore.push({ name, message });
    res.status(201).json({ message: "Received!" });

});

app.delete('/api/messages/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= dataStore.length) {
        return res.status(400).json({ error: "Invalid index" });
    }

    dataStore.splice(index, 1);
    res.json({ message: "Deleted" });
});


app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));