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
        title: 'Bugs',
        color: 'primary',
      },
      {
        title: 'Design',
        color: 'info',
      },
      {
        title: 'Dev',
        color: 'warning',
      },
      {
        title: 'Feature',
        color: 'success',
      },
      {
        title: 'Landing',
        color: 'danger',
      },
      {
        title: 'Priorities',
        color: 'primary',
      },
      {
        title: 'Product',
        color: 'info',
      },
      {
        title: 'Test',
        color: 'warning',
      },
      {
        title: 'Web',
        color: 'success',
      },
      {
        title: 'Work',
        color: 'danger',
      },
    ];
    data = data.map(i => ({
      ...i,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Tags', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
