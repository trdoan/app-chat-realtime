"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        displayName: "Cong Tan",
        email: "tan@gmail.com",
        password:
          "$2a$10$55tusl.gQDWqVB1ybKG2u.AEy0IRxI8sd.LYR1RsJLT3GI4O7ZyCi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayName: "Đuong Doan",
        email: "doan@gmail.com",
        password:
          "$2a$10$55tusl.gQDWqVB1ybKG2u.AEy0IRxI8sd.LYR1RsJLT3GI4O7ZyCi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayName: "Phu Loc",
        email: "loc@gmail.com",
        password:
          "$2a$10$55tusl.gQDWqVB1ybKG2u.AEy0IRxI8sd.LYR1RsJLT3GI4O7ZyCi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayName: "Bao Luu",
        email: "luu@gmail.com",
        password:
          "$2a$10$55tusl.gQDWqVB1ybKG2u.AEy0IRxI8sd.LYR1RsJLT3GI4O7ZyCi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
