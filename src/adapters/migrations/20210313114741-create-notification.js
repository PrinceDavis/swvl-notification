"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notifications", {
      id: {
        defaultValue: Sequelize.DataTypes.UUIDV4,
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      recipientId: {
        references: { model: "users", key: "id" },
        type: Sequelize.DataTypes.INTEGER,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      lastRecipientId: {
        type: Sequelize.DataTypes.INTEGER,
      },
      recipientType: {
        type: Sequelize.DataTypes.ENUM({
          values: ["driver", "passenger"],
        }),
        allowNull: false,
      },
      message: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      multipleRecipient: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
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
