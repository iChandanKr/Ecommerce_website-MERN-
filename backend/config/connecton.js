 const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
        console.log(`Mongodb is connected with server: ${res.connection.host}`)
    });
};
module.exports = connectDB;
