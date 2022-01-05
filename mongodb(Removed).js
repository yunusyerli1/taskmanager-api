//monggose.js entegre edildiği için bu dosyayı silecektim ama basic yöntem örneği olsun diye silmiyorum.

//CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID= mongodb.ObjectId;

const  {MongoClient, ObjectID, ObjectId} = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client) => {
    if(error) {
        console.log('Unable to connect to database!');
    }
    const db =client.db(databaseName);



   

    // db.collection('users').findOne({name:'Jen'}, (error, user)=> {
    //     if(error) {
    //         return console.log('Unable to fetch the user');
    //     }
    //     console.log(user);
    // })

    //insertOne

    // db.collection('users').insertOne({
    //     name:'Yunus',
    //     age:31
    // }, (error, result)=> {
    //     if(error) {
    //         return console.log('Unable to insert user!');
    //     }
    //     console.log(result)

    // })

    //insertMany

    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age:27
    //     },
    //     {
    //         name:'Max',
    //         age:29
    //     }
    // ],(error, result)=> {
    //      if(error) {
    //          return console.log('Unable to insert user!');
    //      }
    // console.log(result)
    
    //  }
    // )

    //some data added to task table 

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },
    //     {
    //         description: 'Renew inspection',
    //         completed: false
    //     },
    //     {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ],(error, result)=> {
    //     if(error) {
    //         return console.log('Unable to insert user!');
    //     }
    //     console.log(result)
    // }
    // )

    //Read data (find)
    // db.collection('users').findOne({_id: new ObjectId("61c4ccf7afc14e39f29c0635")}, (error, user)=> {
    //     if(error) {
    //         return console.log('Unable to fetch the user');
    //     }
    //     console.log(user);
    // })
    
    // db.collection('users').find({age:31}).toArray((error, users)=>{
    //     console.log(users);
    // })

    // db.collection('users').find({age:31}).count((error, count)=>{
    //     console.log(count);
    // })

    //Update with Promise

//     db.collection('users').updateOne({_id:new ObjectId("61c4ccf7afc14e39f29c0635")
// },{
//     $set:{
//         name:'Mike'
//     }
// }).then(result => {
//         console.log(result)
//     }).then(error => {
//         console.log(error);
//     })

//     db.collection('users').updateOne({_id:new ObjectId("61c4ccf7afc14e39f29c0635")
// },{
//     $inc:{
//         age:1
//     }
// }).then(result => {
//         console.log(result)
//     }).then(error => {
//         console.log(error);
//     })

//     db.collection('tasks').updateMany({
//         completed: false
//     },{
//         $set: {
//             completed:true
//         }
//     }).then(result => {
//         console.log(result)
//     }).then(error => {
//         console.log(error);
//     })



    //Delete data with Promise

    // db.collection('users').deleteMany({
    //     age:31
    // }).then(result => {
    //      console.log(result)
    //  }).catch(error => {
    //      console.log(error);
    //  })

    // db.collection('users').deleteOne({
    //     age:27
    // }).then(result => {
    //      console.log(result)
    //  }).catch(error => {
    //      console.log(error);
    //  })
})