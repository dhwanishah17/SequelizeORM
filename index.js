const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');
const db = require("./models");
const {Employee, Sequelize} = require('./models');
const {Department} = require('./models');
const Op = Sequelize.Op

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

app.get("/delete", (req,res)=>{  
    Department.destroy({where : {id : 1}})
    res.send("deleted");
})


app.use(express.json());

db.sequelize.sync().then((req)=>{
app.listen(5000,()=>{
console.log("App is listening to port 5000");
});
});