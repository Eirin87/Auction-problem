const db = require('../../config/index');
const Auction = db.auction;
const QueryTypes = require('sequelize');
var Mutex = require('async-mutex').Mutex;

// Create and Save a new Auction
exports.create = async (req, res) => {

    try {
        let data = await Auction.create(req.body);
        res.status(200).json({ data })
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Couldn't create access auction",
        });
    }

};

exports.findAll = async (req, res) => {


    try {
        let data = await db.sequelize.query(
            'select auction.auctions.id, auction.auctions.title, auction.auctions.deadline, auction.auctions.bid, auction.auctions.bidder_id, auction.users.email from auction.auctions left join auction.users on auctions.bidder_id = users.id',
            {
                raw: true,
                type: QueryTypes.SELECT
            }
        );

        res.status(200).json({ data: data[0] });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err,
        });
    }

};

exports.bid = async (req, res) => {

    const mutex = new Mutex();

    try {
        await mutex.runExclusive(async () => {
            const auction = {
                bid: req.body.bid,
                bidder_id: req.body.bidder_id
            }

            const oldAuction = await Auction.findByPk(req.body.id);
            if (oldAuction.bid) {
                let delta = oldAuction.bid * 0.05;
                if ((oldAuction.bid - auction.bid) > delta) {
                    return res.status(500).json({
                        error: true,
                        message: "Bid too low",
                    });
                } else {
                    let data = await Auction.update(

                        auction
                        ,
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({ data })
                }
            } else {

                let data = await Auction.update(

                    auction
                    ,
                    { where: { id: req.body.id } }
                );
                res.status(200).json({ data })
            }

        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err,
        });
    }


};


