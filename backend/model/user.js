module.exports =(sequelize,DataTypes,Model)=>{
    class User extends Model {}
    
    User.init(
      {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              notEmpty: {
                args: true,
                msg: 'Username cannot be empty',
              },
              isAlphanumeric: {
                args: true,
                msg: 'Username must only contain alphanumeric characters',
              },
              len: {
                args: [2, 50],
                msg: "Name must be between 2 and 50 characters long."
              },
            },
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
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            // validate:{
            //   len: {
            //     args: [6, 12],
            //     msg: 'Password must be between 6 and 12 characters long',
            //   }
            // }
        }
      },
      {
        sequelize,
        modelName: 'user', 
      },
    );
    return User;
    }