module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Device", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serial_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
