const express = require('express')
const app = express()
const port = 3000
const path = require('path')
app.use(express.static('public'))
const ejs = require('ejs')
app.set('view engine', 'ejs')
const sql = require("mssql/msnodesqlv8");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var config = {
    user: 'sa',
    password: 'admin',
    server: "DESKTOP-E1ED7QQ\\NGUYENMINH", //Khac nhau voi moi may
    database: "testnodejs",
    options: {
        trustedConnection: true
  }
}
sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/danhsach', (req, res) => {
      // Execute a SELECT query
      new sql.Request().query("SELECT * FROM Persons", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
})
app.get('/hienthi', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Persons`;
        res.render('hienthi', { accounts: result.recordset });
    } catch (err) {
        res.status(500).send('Error fetching users: ' + err);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})