"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      deviceId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      userType: {
        type: Sequelize.DataTypes.ENUM({
          values: ["driver", "passenger"],
        }),
        allowNull: false,
      },
      messagePreference: {
        type: Sequelize.DataTypes.ENUM({
          values: ["sms", "push"],
        }),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
