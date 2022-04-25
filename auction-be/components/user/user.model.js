const db = require('../../config');
module.exports = (sequelize, Sequelize, Auction) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    },
    {
      schema: 'auction',
    }
  );

  User.hasMany(Auction, { as: 'auctions', foreignKey: 'owner_id' })
  User.hasMany(Auction, { as: 'bids', foreignKey: 'bidder_id' })


  return User;
};
