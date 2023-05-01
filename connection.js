const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.MONGO_LOCAL|| "mongodb://localhost:27017/docapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false,
        useCreateIndex : true
        })
    .then(()=>{
        console.log("connection successful");
    }).catch(err => {
        console.log(err);
    });
    
}

main();
 