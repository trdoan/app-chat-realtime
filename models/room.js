"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        allowNull: true,
        foreignKey: "hostId",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      });
    }
  }
  Room.init(
    {
      name: DataTypes.TEXT,
      hostId: DataTypes.INTEGER,
      password: DataTypes.STRING,
      type: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Room",
    },
  );
  return Room;
};
