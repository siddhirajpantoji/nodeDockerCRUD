const { Pool, Client } = require('pg');
const path = require('path');
var dbConfig = {
    "user": process.env.user,
    "host": process.env.host,
    "database": process.env.database,
    "password": process.env.password,
    "port":  process.env.port
}
const pool = new Pool(dbConfig);
const client = new Client(dbConfig);
function createUserTable() {
    // This function will create User Table In Db 
    /**
     * Id: Auto Increment 
     * first_name: String
     * last_name: String
     * mobile:String
     */
    /**
     * create sequence  if not exists test_id_seq;
create table if not exists test (
id integer NOT NULL DEFAULT nextval('test_id_seq'),
   first_name varchar(100),
    last_name varchar(100),
    mobile varchar(100)
)*/
    var sequence_query = "create sequence  if not exists test_id_seq";
    const query = pool.query(sequence_query, function(err,result) {
        // done(); // closing the connection;
         if(err){
             console.log(err);
             throw err;
         }
       //  console.log(result.rows);
       var createQuery = "create table if not exists test (id integer NOT NULL DEFAULT nextval('test_id_seq'),"+
           "first_name varchar(100),"+
            "last_name varchar(100),"+
            " mobile varchar(100))"
            pool.query(createQuery);
     });
}

function getAllRows(req,res,callback)
{
    var sequence_query = "Select * From test ";
    const query = pool.query(sequence_query, function(err,result) {
        // done(); // closing the connection;
         if(err){
             console.log(err);
             throw err;
         }
       //  console.log(result.rows);
         return callback(req,res,result.rows);
     });
}

function insertRows(req,res,user,callback)
{
    var sequence_query = "Select * From test ";
    pool.query('INSERT INTO test(first_name,last_name,mobile) values ($1, $2,$3) RETURNING *',
    [user.firstName, user.lastName,user.mobile], function(err,data){
        if(err)
        {
            console.error(err);
            throw err;
        }
        return callback(req,res,data.rows[0]);
    });
}

function updateRows(req,res,user,callback)
{
    var updateQuery = "update  test  SET first_name = $1 , last_name = $2, mobile = $3 where id = $4 ";
    pool.query(updateQuery,
    [user.firstName, user.lastName,user.mobile, user.id], function(err,data){
        if(err)
        {
            console.log(err);
            throw err;
        }
        return callback(req,res,data);
    });
}

function deleteRows(req,res,user,callback)
{
    var deleteQuery = "delete from   test   where id = $1 ";
    pool.query(deleteQuery,
    [ user.id], function(err,data){
        if(err)
        {
            console.log(err);
            throw err;
        }
        return callback(req,res,data);
    });
}

module.exports = {createUserTable, getAllRows,insertRows, updateRows, deleteRows }