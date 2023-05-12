const utils = require('../utils');
const db = require('../database/db');

/*
exports.getItem = (request, response) => {
    const connection = db.connect1()

const catdata = `select * from item`
connection.query(catdata, (error, data) => {
  var state
  var result="";
    
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
       var catid = element.category_id
       var myarray = catid.split(',');

       for(var i = 0; i < myarray.length; i++)
       {
           result = myarray[i]
          // console.log(result)
          
    
       /*
        state=`select * from category WHERE  id IN ('${result}')`
        connection.query(state, (error, datas) => {
            console.log(datas)
        })
        
    }
}

    console.log(result)
    const statements=`SELECT * FROM item as j 
    outer apply STRING_SPLIT(j.[category_id], ',') s
    left join dbo.category as c on c.id =s.value
`

connection.query(statements, (error, data) => {
    connection.end()
    response.send(utils.createResult(error, data))
})
})}

*/
    /*
      from item
    inner join category
    on item.category_id = category.id
    inner join tax_master
    on item.tax_id = tax_master.id
    inner join unit
    on item.unit_id = unit.id`
    
    /*`SELECT *
    FROM table1
    INNER JOIN table2
    ON table1.id = table2.id
    INNER JOIN table3
    ON table2.id = table3.id;`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
}

/******
 * 
 * multiple id possing in query
 *   var myarray = separateprint.split(',');
        const statement2 = `select * from  category WHERE id IN (${myarray})`
 */

// simple get
// 1)  const statement = `select * from  item`

// get single by id
// 2)  const statement = `select * from  item where id= '1'`

//inner join or comman join same name column not fatch
// first to second table
/*3)  const statement = `select *
    from  item , tax_master
    where item.tax_id = tax_master.id`
  3)  const statement = `select *from  item 
    join tax_master
    on item.tax_id = tax_master.id`
*/
/*
//second to first table
//outer join selected particular columan
//same table selecting error use target particular table.columan
  4) const statement = `select  item.id,item.name, temp_one, note, temp_two, percentage 
    from item
    join tax_master
    on item.tax_id = tax_master.id`
   
    5) left join  complete data in first table match id in secand table    
    const statement =  select temp_one, temp_two from item 
    LEFT JOIN category 
    on item.category_id = category.id

    6) Right join  total data in table two match value in firest table id value seen other will be in empty
  select temp_one, temp_two from item 
   const statement =   RIGHT JOIN category 
    on item.category_id = category.id

    7) cross join keyword returns all records from both tables (table1 and table2).
    const statement = `select * 
    from item
    cross join category`

    8) join three table using ids print fisrt table value
    const statement = `select
    item.temp_one,
    item.temp_two
    from item
    join category
    on category.id = item.category_id
    join tax_master
    on tax_master.id = item.tax_id`

    9) join three table all three data print in one obj
    const statement = `select *
    from item 
    inner join category 
    on item.category_id = category.id
    INNER JOIN tax_master
    on item.tax_id = tax_master.id`
  *********************************************************
   10) join 3 table print an particular columan name
    const statement = `select t1.temp_one, t2.category_name, t3.name
    from item t1
    inner join category t2
    inner join tax_master t3 
    where t1.category_id = t2.id and t1.tax_id = t3.id`

***********************************************************************
   11)  ORDER BY $category ASC limit $row,

   12)   total no of item printing 
         const statement =    `SELECT COUNT(*) FROM item`

   13) count with only maching numbers
      const statement = `SELECT COUNT(*) FROM item WHERE category_id=102`

   15) average and sume in condtion in tables

   SELECT AVG(column_name)
FROM table_name
WHERE condition;

SELECT SUM(column_name)
FROM table_name
WHERE condition;

*/ 


/**
 * 
SELECT t1.col1, t1.col2, t1.col3, t2.col1, t2.col2, t2.col3
FROM table1 t1
LEFT JOIN table2 t2

item.tax_id = tax_master.id
 */

exports.getItem = (request, response) => {
    const connection = db.connect1()
     if(request.body.task_status!="" && request.body.progress==""){
        const statement = `select t.task_name,t.progress,t.task_status, u.full_name,p.project_name
        from tasks t
        inner join users u
        inner join projects p
        where t.user_id = u.id and t.project_id = p.id and t.task_status ='${request.body.task_status}'`
        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error,data));
        })
    }
   else if(request.body.progress!="" && request.body.task_status==""){
            const statement = `select t.task_name,t.progress,t.task_status, u.full_name,p.project_name
            from tasks t
            inner join users u
            inner join projects p
            where t.user_id = u.id and t.project_id = p.id and t.progress=${request.body.progress}`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error,data));
            })
        }
     
 else if(request.body.task_status!="" && request.body.task_status!=""){
        const statement = `select t.task_name,t.progress,t.task_status, u.full_name,p.project_name
        from tasks t
        inner join users u
        inner join projects p
        where t.user_id = u.id and t.project_id = p.id and t.progress=${request.body.progress} and t.task_status='${request.body.task_status}'`
        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error,data));
        })
    }
  else if(request.body.progress =="" && request.body.task_status==""){
        const statement = `select t.task_name,t.progress,t.task_status, u.full_name,p.project_name
        from tasks t
        inner join users u
        inner join projects p
        where t.user_id = u.id and t.project_id = p.id`
        connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error,data));
        })
    }
    else{
        response.send({msg:"messagess"})
    }



}



exports.deleteItem = (request, response) => {
    const {id} = request.params
    const connection = db.connect1()
    const statement = `select * from item where id = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
}

