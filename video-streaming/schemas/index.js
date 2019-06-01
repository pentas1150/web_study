const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(`mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PW}@localhost:27017/admin`, {
            dbName: process.env.MONGO_DB,
        }, (error) => {
            if(error) {
                console.log('mongodb connect error', error);
            } else {
                console.log('mongodb connected successfully');
            }
        });
    };

    connect();

    mongoose.connection.on('error', (error) => {
        console.error('mongodb connect error', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('mongodb is disconnected. retry connection.');
        connect();
    });

    require('./user');
    require('./videolist');
};