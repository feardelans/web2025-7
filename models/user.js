module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};
