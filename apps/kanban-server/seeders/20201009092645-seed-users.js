'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password:
          '$2a$10$dOLnlGhejQxXEmCxaaDg8eQond/jJK2zgnnZfvPRRLQ23DqJaYHU2',
        role: 'admin',
        organization: 'Hacktiv8',
      },
    ];
    data = data.map(i => ({
      ...i,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
