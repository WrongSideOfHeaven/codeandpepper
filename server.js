
const express = require('express');

const app = express();

app.use(express.static('./dist/code-pepper'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/code-pepper/'}),
);

app.listen(process.env.PORT || 8080);