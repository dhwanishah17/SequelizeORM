
module.exports = (sequelize, DataTypes) => {
    const Department= sequelize.define("Department", {
        name: {
            type: DataTypes.STRING,
        },
        

    });
     return Department;

    
}