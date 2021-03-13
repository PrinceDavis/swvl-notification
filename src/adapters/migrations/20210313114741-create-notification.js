"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notifications", {
      id: {
        defaultValue: Sequelize.DataTypes.UUIDV4,
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
      },
      lastRecipientId: {
        type: Sequelize.DataTypes.UUID,
      },
      userType: {
        type: Sequelize.DataTypes.ENUM({
          values: ["driver", "rider"],
        }),
      },
      message: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.ENUM({
          values: ["bulk", "single"],
        }),
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM({
          values: ["scheduled", "processing", "done"],
        }),
        defaultValue: "scheduled",
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
    await queryInterface.dropTable("notifications");
  },
};
