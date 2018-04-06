const utils  = require('../utils/utils')
const MESSAGES = require('../constants/constants')
const userDao = require('../dao/userDao')
function callForAllPagination (req, res,next )
{
    userDao.getAllRows(req,res,function(req,res,result){
        utils.SuccessfulPostData(req,res,result)    
    })
}

function createRecord (req, res,next )
{
    var userBody={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobile:req.body.mobile
    }
    userDao.insertRows(req,res,userBody, function(req,res,result){
        utils.SuccessfulPostData(req,res,result)
    })
}


function updateRecord (req, res,next )
{
    if(req.body.id)
    {
        var userBody={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobile:req.body.mobile,
            id:req.body.id
        }
        userDao.updateRows(req,res,userBody, function(req,res,result){
            utils.SuccessfulPostData(req,res,result)
        })
    }
    else
    {
        utils.Error400(req,res,MESSAGES.REST_MESSAGES.EMPTY_ID_FOUND);
    }
    
}

function deleteRecord (req, res,next )
{
    if(req.body.id)
    {
        var userBody={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobile:req.body.mobile,
            id:req.body.id
        }
        userDao.deleteRows(req,res,userBody, function(req,res,result){
            utils.SuccessfulPostData(req,res,result)
        })
    }
    else
    {
        utils.Error400(req,res,MESSAGES.REST_MESSAGES.EMPTY_ID_FOUND);
    }
    
}
module.exports ={ callForAllPagination ,createRecord, updateRecord , deleteRecord};