const app = require('./app');
const dotenv = require("dotenv");
const connectDB = require("./config/connecton");

// handling uncautht exceptons
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
})


//Config-------
dotenv.config({ path: "./config/config.env" });


// connection to database----
connectDB();

 const server = app.listen(process.env.PORT, () => {

    console.log(`Server is woriking on http://localhost:${process.env.PORT}`);
});


// unhandled promise rejection------

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
});
