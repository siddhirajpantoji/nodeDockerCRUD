const { Pool, Client } = require('pg');
const path = require('path');
var dbConfig = require('../../config/dbConfig')
const pool = new Pool(dbConfig);

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
    pool.query('INSERT INTO test(first_name,last_name,mobile) values ($1, $2,$3)',
    [user.firstName, user.lastName,user.mobile], function(err,data){
        if(err)
        {
            console.log(err);
            throw err;
        }
        return callback(req,res,data);
    });
}

module.exports.createUserTable = createUserTable
module.exports.getAllRows = getAllRows
module.exports.createRecord = insertRows