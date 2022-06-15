'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        first_name: 'John',
        last_name: 'Joe',
        date_of_joining: '2022-04-15',
        dob: '2000-04-15',
        email: 'john@gmail.com',
        password: '147258369',
        experience: 5
      },
      {
        first_name: 'Jack',
        last_name: 'Joe',
        date_of_joining: '2022-03-23',
        dob: '2000-03-15',
        email: 'jack@gmail.com',
        password: '147258369',
        experience: 5
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Employees', null, {});
  }
};
