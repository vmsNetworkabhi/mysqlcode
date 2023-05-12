var express = require('express')
const multer = require('multer')
const db = require('../database/db');
const utils = require('../utils');
const router = express.Router()
const upload = multer({dest: 'images'}) 

const {getItem,deleteItem} = require("../controller/itemController");

router.post('/addItem',upload.single('imagepath'),(request, response) => {
    const imagepath = request.file.filename
    const {description,name,note,temp_one,temp_two,category_id,tax_id,unit_id} = request.body
    const connection = db.connect1()
    const statement = `
    insert into item(description,imagepath,name,note,temp_one,temp_two,category_id,tax_id,unit_id) values('${description}','${imagepath}','${name}','${note}','${temp_one}','${temp_two}','${category_id}','${tax_id}','${unit_id}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


router.put("/editItem/:id",upload.single('imagepath'),(request,response) =>{
    const {id} = request.params
    const imagepath = request.file.filename
    const {description,name,note,temp_one,temp_two,category_id,tax_id,unit_id} = request.body
    const connection = db.connect1()

    const statement = `update item set description='${description}',imagepath='${imagepath}',name='${name}',note='${note}',temp_one='${temp_one}',temp_two='${temp_two}',category_id='${category_id}',tax_id='${tax_id}',unit_id='${unit_id}' where id =${id}`
    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
});



router.post('/getItem',getItem);
router.delete("/deleteItem/:id",deleteItem);


module.exports = router;