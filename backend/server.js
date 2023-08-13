const app = require('./app');
const dotenv = require("dotenv");
const connectDB = require("./config/connecton");
const cloudinary = require("cloudinary");

// handling uncautht exceptons
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
})


//Config-------
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000;
// connection to database----
connectDB();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(PORT, () => {

    // console.log(`Server is woriking on http://localhost:${process.env.PORT}`);
    console.log(`Server is woriking on http://localhost:${PORT}`);

});


// unhandled promise rejection------

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
