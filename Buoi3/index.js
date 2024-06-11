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
app.use(bodyParser.urlencoded({ extended: true }));

//Cấu hình kết nối MSSQL
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

//Hiển thị dữ liệu theo route /danhsach dưới dạng JSON
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
// Hiển thị dữ liệu theo route /hienthi đổ vào các tag <table>
app.get('/hienthi', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Persons`;
        res.render('hienthi', { persons: result.recordset });
    } catch (err) {
        res.status(500).send('Error fetching Persons: ' + err);
    }
});
//Thêm dữ liệu
//Tạo trang thêm dữ liệu
app.get('/themdulieu', (req,res)=>{
    res.render('themdulieu');
})

//xử lý thêm dữ liệu
app.post('/themdulieu', async (req, res) => {
    try {
        const { LastName,FirstName,Address,City } = req.body;
        await sql.query`INSERT INTO dbo.Persons (LastName,FirstName,Address,City) VALUES (${LastName},${FirstName},${Address},${City});`;
        return res.redirect('/hienthi');
    } catch (err) {
        console.error('Loi khong them duoc du lieu',err);
    }
});

//Cập nhật dữ liệu
// Tạo trang cập nhật dữ liệu
app.get('/update/:PersonID', async (req, res) => {
    try {
        const { PersonID } = req.params;
        const result = await sql.query`SELECT * FROM Persons WHERE PersonID = ${PersonID}`;
        if (result.recordset.length > 0) {
            res.render('update', { persons: result.recordset[0] });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching user: ' + err);
    }
});

// Xử lý cập nhật dữ liệu
app.post('/update/:PersonID', async (req, res) => {
    try {
        const { PersonID } = req.params;
        const { Address, City} = req.body;
        await sql.query`UPDATE Persons SET Address = ${Address}, City = ${City} WHERE PersonID = ${PersonID}`;
        return res.redirect('/hienthi');
    } catch (err) {
        res.status(500).send('Error updating user: ' + err);
    }
});

//Xóa dữ liệu
app.post('/delete/:PersonID', async (req, res) => {
    try {
        const { PersonID } = req.params;
        await sql.query`DELETE FROM Persons WHERE PersonID = ${PersonID}`;
        return res.redirect('/hienthi');
    } catch (err) {
        return res.status(500).send('Error deleting user: ' + err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})