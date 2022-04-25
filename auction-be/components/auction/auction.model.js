

module.exports = (sequelize, Sequelize) => {

    const Auction = sequelize.define(
        'auction',
        {
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            bid: {
                type: Sequelize.FLOAT,
            },
            owner_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bidder_id: {
                type: Sequelize.INTEGER,
            },
        },
        {
            schema: 'auction',
        }
    );

    return Auction;


};
