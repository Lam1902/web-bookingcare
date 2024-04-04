'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('markdowns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      contentHTML: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
      },
      contentMarkdown: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      clinicId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT('long'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('markdowns');
  }
};