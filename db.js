import mongoose from 'mongoose';

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "lenslight",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connect to the DB")
    }).catch((err) => {
        console.log(`DB connection error: ${err}`)
    })
}

export default conn;
