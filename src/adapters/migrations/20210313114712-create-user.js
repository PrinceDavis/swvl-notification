"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        defaultValue: Sequelize.DataTypes.UUIDV4,
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      deviceId: {
        type: Sequelize.DataTypes.STRING,
      },
      userType: {
        type: Sequelize.DataTypes.ENUM({
          values: ["driver", "rider"],
        }),
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      prefferEmail: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      prefferPush: {
        type: Sequelize.DataTypes.BOOLEAN,
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
