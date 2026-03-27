'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Deprecated migration kept as no-op to preserve migration history.
    return Promise.resolve();
  },
  async down(queryInterface, Sequelize) {
    // No-op rollback for deprecated migration.
    return Promise.resolve();
  }
};