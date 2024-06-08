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
      new sql.Request().query("SELECT * FROM Persons", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            res.send(result.recordset);
            console.dir(result.recordset);
        }
    });
})
app.get('/hienthi', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Persons`;
        res.render('hienthi', { persons: result.recordset });
    } catch (err) {
        res.status(500).send('Error fetching Persons: ' + err);
    }
});


app.get('/themdulieu', (req,res)=>{
    res.render('themdulieu');
})

app.post('/themdulieu', async (req, res) => {
    try {
        const { PersonID, LastName,FirstName,Address,City } = req.body;
        await sql.query`INSERT INTO dbo.Persons (PersonID, LastName,FirstName,Address,City) VALUES (${PersonID},${LastName},${FirstName},${Address},${City});`;
        return res.redirect('/hienthi');
    } catch (err) {
        console.error('Loi khong them duoc du lieu',err);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})