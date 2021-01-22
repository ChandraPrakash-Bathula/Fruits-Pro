const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true})

const fruitSchema = new mongoose.Schema({
name: {
    type:String,
    required: [true,"Please check your data entry,no name specified!"]
},
rating: {
    type: Number,
    min:1,
    max:10
},
review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
//name: "Apple",
rating: 10,
review: "Peaches are the best."
});

//fruit.save();

const personSchema  = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit : fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit({
    name:"Pineapple",
    score:9,
    review:"Great fruit."
});
pineapple.save();

const strawberry = new Fruit({
    name:"Strawberry",
    score:8,
    review:"Better fruit."
});
strawberry.save();

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit:pineapple
});
Person.updateOne({name:"John"}, {favouriteFruit: strawberry},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updatedthe favourite fruit of JOHN!!!!!!!!!!!!!!!!");
    }
})

Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }else{
        fruits.forEach(function(fruit){
            console.log(fruit.name);
            mongoose.connection.close();
        });
    }
});

// Fruit.updateOne({_id: "5ffc7564fd28383a60ff34f6"}, {name: "Peach"}, function (err){
//     if (err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated the document");
//     };
// });

Person.deleteMany({name:"John"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted the document!");
    };
});














// const insertDocuments = function(db, callback){
//     const collection = db.collection('fruits');
//     collection.insertMany([
//         {name:"Apple",
//         score: 8,
//         review:"Great fruit"},
//         {name:"Orange",
//         score: 6,
//         review:"Kinda sour"},
//         {name:"Banana",
//         score: 9,
//         review:"Great stuff"} 
//     ] , function (err, result){
//         assert.equal(err,null);
//         assert.equal(3,result.result.n);
//         assert.equal(3,result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// };
//const kiwi = new Fruit({
//     name : "Kiwi",
//     score: 10,
//     review:"The best fruit!"
// });

// const banana = new Fruit({
//     name:"Banana",
//     score: 9,
//     review:"Great stuff"
// });


// const orange = new Fruit({
//     name:"Orange",
//     score: 6,
//     review:"Kinda sour"
// });

// Fruit.insertMany([kiwi,banana,orange],function(err){
// if(err){console.log(err)}else{console.log("Successfully saved all the fruits to fruitsDB")}
// });

// const findDocuments = function(db, callback)
// {
//     const collection = db.collection("fruits");
//     collection.find({}).toArray(function(err, fruits){
//         assert.equal(err,null);
//         console.log("Found the following records");
//         console.log(fruits)
//         callback(fruits);
//     });
// }