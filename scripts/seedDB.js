// const mongoose = require("mongoose");
// const db = require("../models");

// // This file empties the user collection and inserts the books below

// mongoose.connect( process.env.MONGODB_URI ||"mongodb://localhost/CheapCheep" , () => {
//   console.log('connecting Seed to database')
// })



// const userSeed = [
//   {
//     userName: "rayhe",
//     password: "123456",
//     email: "rayhe@gmail.com"
//   },
//   {
//     userName : "shree",
//     password : "12345",
//     email : " shre@yahoo.com"
//   }
// ]



// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//   })
//   .catch(err => {
//     console.error(err);
//   });

//   const ItemSeed = [
//     {
//         name: "iphone 8 plus",
//         price: 550,
//         website: "Amazon.com",
//         link: "https://www.amazon.com/Apple-iPhone-Plus-Fully-Unlocked/dp/B07757LZ1J/ref=sr_1_3?keywords=iphone+8+plus&qid=1580628043&sr=8-3",
//         seacrhTerm: "iphone 8 plus"
//     },
//     {
//         name: "iphone 8",
//         price: 500,
//         website: "Amazon.com",
//         link: "https://www.amazon.com/Apple-iPhone-Plus-Fully-Unlocked/dp/B07757LZ1J/ref=sr_1_3?keywords=iphone+8+plus&qid=1580628043&sr=8-3",
//         seacrhTerm: "iphone 8 plus"

//     },
//     {
//         name: "iphone 8",
//         price: 500,
//         website: "Amazon.com",
//         link: "https://www.amazon.com/Apple-iPhone-Plus-Fully-Unlocked/dp/B07757LZ1J/ref=sr_1_3?keywords=iphone+8+plus&qid=1580628043&sr=8-3",
//         seacrhTerm: "iphone 8 plus"

//     },
//     {
//         name: "iphone 8",
//         price: 500,
//         website: "Amazon.com",
//         link: "https://www.amazon.com/Apple-iPhone-Plus-Fully-Unlocked/dp/B07757LZ1J/ref=sr_1_3?keywords=iphone+8+plus&qid=1580628043&sr=8-3",
//         seacrhTerm: "iphone 8 plus"

//     },

//     {
//         name: "iphone 8",
//         price: 500,
//         website: "Amazon.com",
//         link: " ",
//         seacrhTerm: "iphone 8 plus"

//     }



// ]


// db.Item
//     .remove({})
//     .then(() => db.Item.collection.insertMany(ItemSeed))
//     .then(data => {
//         console.log(data.result.n + "  this records inserted!");
//     })
//     .catch(err => {
//         console.error(err);
//     });



//     const listSeed = [
//       {
//         listName: "List One"

    
//     },
//     {
//       listName: "List Two"
    
//     },
//     {
//       listName: "List Three"
    
//     },
//     ]
//     db.List
//     .remove({})

//     .then(() => db.List.collection.insertMany(listSeed))
//     .then(data => {
//         console.log(data.result.n + "  this records inserted!");
//     })
//     .catch(err => {
//         console.error(err);
//     });
