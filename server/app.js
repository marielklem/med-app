require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/recipients', require('./routes/careRecipients'));
app.use('/medications', require('./routes/medications'));
app.use('/doses', require('./routes/doses'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});