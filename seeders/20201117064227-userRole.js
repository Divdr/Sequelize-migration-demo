'use strict';

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

    const user = await queryInterface.rawSelect('users',{
      where:{
        email:'admin123@gmail.com'
      },
    },['id'])

    const role = await queryInterface.rawSelect('roles',{
      where:{
        name:'admin'
      },
    },['id'])

    if(!user) throw new Error('User Not Found!!')
    if(!role) throw new Error('Role Not Found!!')

    await queryInterface.bulkInsert('userRoles',[{
      userId:user,
      roleId:role,
      createdAt:new Date(),
      updatedAt:new Date()
    }])
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('userRoles',null,{})
  }
};
