const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'phy-simpleUser-email-invalid' },
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [6, 200],
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });

  return user;
};
