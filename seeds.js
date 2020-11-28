const Product = require('./models/product');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo connection open");
}) 
.catch (err => {
    console.log("Mongo connection error:");
    console.log(err);
})

// const p = new Product ({
//     name: 'Ruby Grapefruit',
//     price: '1.99',
//     category: 'fruit'
// })
// p.save().then(p =>{
//     console.log(p);
// })
// .catch (err => {
//     console.log(err);
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    }, 
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Celery',
        price: 0.69,
        category: 'vegetable'
    },
    {
        name: "Chocolate Whole Milk", 
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res =>{
        console.log(res);
    })
    .catch (err => {
        console.log(err);
    })