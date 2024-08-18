const mongoose = require('mongoose');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect(`mongodb+srv://admin:admin123@cluster0.9tselr3.mongodb.net/petPortal?retryWrites=true&w=majority&appName=Cluster0`)
  await mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(()=>{
      console.log('db connected')
  })
  .catch((error)=>{
    console.log(error)
  })
}