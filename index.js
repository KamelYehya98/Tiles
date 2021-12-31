const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     password: 'password',
//     host: 'localhost',
//     database: 'unmatch_the_tiles'
// });

const db = mysql.createConnection({
    user: 'epiz_30694021',
    password: '12g58TBTttu',
    host: 'sql108.epizy.com',
    database: 'epiz_30694021_unmatch_the_tiles'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected To Database Successfully');
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});


const getMatrixID = (col, row) =>{
    return new Promise((resolve, reject)=>{
        db.query("SELECT id FROM matrices WHERE _col=? and _row=?", [col, row],  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results[0].id);
        });
    });
};

const insertScore = (username, password, moves, matrix_id) =>{
    return new Promise((resolve, reject)=>{
        db.query("INSERT INTO scores (username, password, moves, matrix_id) VALUES (?, ?, ?, ?)", [username, password, moves, matrix_id],
            (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

const getScores = async (col, row) => {
    const matrix_id = await getMatrixID(col, row);
    return new Promise((resolve, reject)=>{
        db.query("SELECT * FROM scores WHERE matrix_id=? ORDER BY moves ASC;", [matrix_id],
            (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            }
        );
    });
};

const checkIfUserExists = (username) => {
    return new Promise((resolve, reject)=>{
        db.query("SELECT * FROM scores WHERE username=?", [username],
            (error, results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length === 0)
                    return resolve(false);
                else
                    return resolve(true);
            }
        );
    });
};

const checkCredentials = (username, password) => {
    return new Promise((resolve, reject)=>{
        db.query("SELECT * FROM scores WHERE username=? and password=?", [username, password],
            (error, results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length === 0)
                    return resolve(false);
                else
                    return resolve(true);
            }
        );
    });
};

const getMoves = async (username, password, matrix_id) => {
    return new Promise((resolve, reject)=>{
        db.query("SELECT * FROM scores WHERE username=? and password=? and matrix_id=?", [username, password, matrix_id],
            (error, results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length == 0){
                    return resolve(false);
                }
                return resolve(results[0].moves);
            }
        );
    });
};

const updateMoves = (username, password, matrix_id, moves) => {
    return new Promise((resolve, reject)=>{
        db.query("UPDATE scores SET moves=? WHERE username=? and password=? and matrix_id=?", [moves, username, password, matrix_id],
            (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(true);
            }
        );
    });
};

//API REQUESTS
 app.post('/add', async (req, res)=>{
    const {col, row, moves, username, password} = req.body;
    const exists = await checkIfUserExists(username);
    if(exists == true){
        res.send(false);
    }else{
        const matrix_id = await getMatrixID(col, row);
        console.log(matrix_id);
        const result = await insertScore(username, password, moves, matrix_id);
        res.send("Your HighScore Has Been Added Successfully !");
    }
});

app.post('/save', async (req, res)=>{
    const {col, row, moves, username, password} = req.body;
    console.log(moves);
    const matrix_id = await getMatrixID(col, row);
    const exists = await checkCredentials(username, password);
    if(exists == false){
        res.send(false);
    }else{
        const oldMoves = await getMoves(username, password, matrix_id);
        if(oldMoves == false){
            await insertScore(username, password, moves, matrix_id);
        }else{
            if(oldMoves > moves){
                const result = await updateMoves(username, password, matrix_id, moves);
                if(result == true)
                    res.send("Score Updated Successfully !");
                else
                    res.send(result);
            }else{
                res.send("This Score Is Lower Than Your HighScore !");
            }
        }
    }
});

app.post('/getScores', async (req, res)=>{
    const {col, row} = req.body;
    console.log("COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLS: " + col + "       " + row);
    const result = await getScores(col, row);
    res.send(result);
});

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//checking if app is running on Heroku
if (process.env.NODE_ENV === 'production')
{
  //starts React from build folder
  app.use(express.static(path.resolve(__dirname, './client/build')));

  //for reconnecting purposes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}
else
{
  //app running locally
  app.use(express.static(path.resolve(__dirname, './client/build')));

  //for reconnecting purposes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}