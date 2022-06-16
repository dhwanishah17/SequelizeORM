
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
        id:{
type: DataTypes.UUID,
primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
            
        },
        date_of_joining: {
            type: DataTypes.DATE,
        },
        dob: {
            type: DataTypes.DATE,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                isEmail :true
            }
        },
        password: {
            type: DataTypes.STRING,
        },
      
    });

 return Employee;
    
}