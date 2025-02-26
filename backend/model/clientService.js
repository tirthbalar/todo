
module.exports =(sequelize,DataTypes,Model)=>{
class Client extends Model {}

Client.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
            args: true,
            msg: 'Name cannot be empty',
        },
        // isAlpha: {
        //   args: true,
        //   msg: 'Name should only contain alphabetic characters',
        // },
        len: {
            args: [2, 50],
            msg: "Name must be between 2 and 50 characters long."
          },
      }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address',
          }         
        },
    },
    job:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    isactive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    gender:{
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      defaultValue: 'Male',
    }
  },
  {
    sequelize,
    modelName: 'client', 
  },
);
return Client;
}