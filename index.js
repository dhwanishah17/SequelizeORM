const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');
const db = require("./models");
const {Employee, Sequelize} = require('./models');
const {Department} = require('./models');
const Op = Sequelize.Op
const { QueryTypes } = require('sequelize');
// Raw-Queries
app.get("/raw-query", async(req,res)=>{
    await db.sequelize.query(
        'SELECT * FROM Employees WHERE last_name = ?',
        {
          replacements: ['Shah'],
          type: QueryTypes.SELECT
        }
      ).then((emloyees)=>{
        res.send(emloyees);
        console.log(emloyees);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

//fetching employees 
// app.get("/selectemp", (req,res)=>{
//     Employee.findAll({attributes: ['id', 'First_name','department']},{order: [
//         ['first_name', 'ASC'],
//     ]},).then((emloyees)=>{
//         res.send(emloyees);
//     }).catch((err)=>{
//         if(err){
//             console.log(err);
//         }
//     })
// })

app.get("/insertemp", (req,res)=>{
    Employee.create({
        // id : 1,
        first_name: "Dhwani",
        last_name: "Shah",
        date_of_joining: "2022-01-12",
        dob: "2000-04-12",
        department: "NodeJS",
        email: "dhwani.shah@sarvadhi.com",
        password: "147258369"
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
    res.send("inserted");
})

// fetch employees with based on deparment field in ascending order
app.get("/get", (req,res)=>{
    Employee.findAll({where : {department : "NodeJS"}},{order: [
        ['first_name', 'ASC'],
    ]},).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

//AND operator
app.get("/selectand", (req,res)=>{
    Employee.findAll( { where: {[Op.and] : [{department : "NodeJS"},{first_name : "Mann"}]}}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){    
            console.log(err);
        }
    })
})

//OR operator
app.get("/selector", (req,res)=>{
    Employee.findAll( { where: {[Op.or] : [{department : "NodeJS"},{first_name : "Dhwani"}]}}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){    
            console.log(err);
        }
    })
})

//LIKE operator
app.get("/selectlike", (req,res)=>{
    Employee.findAll( { where: {department : {[Op.like]: '%JS'}}}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){    
            console.log(err);
        }
    })
})

//NE Operator
app.get("/selectne", (req,res)=>{
    Employee.findAll( { where: {department : {[Op.ne]: 'NodeJS'}}}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){    
            console.log(err);
        }
    })
})



// GT LT operator
app.get("/selectemp", (req,res)=>{
var today = new Date();
var NOW = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    date = "2021-12-13"
    Employee.findAll({where : {date_of_joining  :{ [Op.gt]: date,
        [Op.lt]: NOW }}},{order: [
        ['first_name', 'ASC'],
    ]},).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

app.get("/deleteemp", (req,res)=>{  
    Employee.destroy({where : {id : 1}})
    res.send("deleted");
})

// one-to-one association
app.get("/onetoone", (req,res)=>{
    Employee.findAll({include : [{model: Department}]}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

app.get("/select", (req,res)=>{
    Department.findAll()
        .then((department)=>{
        res.send(department);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

app.get("/insert", (req,res)=>{
    Department.create({
        id : "3",
        name: "Python",
        
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
    res.send("inserted");
})
// one-to-one association
app.get("/onetoone", (req,res)=>{
    Department.findAll({where :{ name : "NodeJS"},include : [{model: Employee }]}).then((emloyees)=>{
        res.send(emloyees);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
})

app.get("/delete", (req,res)=>{  
    Department.destroy({where : {id : 1}})
    res.send("deleted");
})


db.Employee.hasOne(db.Department );
db.Department.belongsTo(db.Employee,{foreignKey:{
    allopwNull: false
}});

app.use(express.json());

db.sequelize.sync().then((req)=>{
app.listen(5000,()=>{
console.log("App is listening to port 5000");
});
});