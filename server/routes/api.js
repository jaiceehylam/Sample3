const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
        if (err) return console.log(err);

        let db = client.db('mean');

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/orders', (req, res) => {
    connection((db) => {
        db.collection('order').aggregate([
            { $lookup:
                {
                    from: 'customers',
                    localField: 'customerNumber',
                    foreignField: 'customerNumber',
                    as: 'customerDetail'
                }
            },
            { $unwind: "$customerDetail"},
            { $project:
                {
                    "orderNumber" : 1,
                    "shippedDate" : 1,
                    "customerNumber" : 1,
                    "customerDetail.customerName" : 1,
                }
            }
        ])
            //.find()
            .toArray()
            .then((orders) => {
                response.data = orders;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;