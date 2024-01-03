const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Your MongoDB Compass connection URI
const databaseName = 'task-manager'; // Replace 'yourDatabaseName' with your actual database name

async function connectToDatabase() {
    try {
        // Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Database connection established!');
        const db = client.db(databaseName);


//Deleting from the database
        // db.collection('tasks').deleteMany({description: "task 2"}).then((result)=>{
        //     console.log("database deleted", result);
        // }).catch((error)=>{
        //     throw new Error(error)
        // })

        // db.collection('users').deleteOne({name:'abinash'}).then((result)=>{
        //     console.log(result);
        // }).catch((error)=>{
        //     throw new Error(error)
        // })

        db.dropDatabase()





//Update method
    // const updateMany = db.collection('users').updateMany({
    //     name: 'Elizabeth'
    // },{$set:{name:'gween'}})
    
    // updateMany.then((result)=>{
    //     console.log('result');
    // }).catch((reject)=>{
    //     console.log(reject);
    // })










//Querying through the database Find method
        // const finObj =  await db.collection('users').findOne({name: 'abinash'})
        // console.log(finObj);
        // const findObjTwo = await db.collection('users').find({age: 22})
        // console.log(await findObjTwo.count());











//users collection adding a single user to the databse
        // let result = await  db.collection('users').insertOne({
        //     name: "gween",
        //     age: 22
        // })
        // if(result){
        //     // throw new Error("User insert fail")
        //     console.log(result)
        // }
//tasks collection adding 3 taks to the databse
        // db.collection('tasks').insertMany([{
        //     description:'task 1',
        //     complete: true
        // },{
        //     description:'task 2',
        //     complete: false
        // },{
        //     description:'task 3',
        //     complete:true
        // }]).then(result=>{
        //     console.log(result)
        // }).catch(err =>{
        //     console.log(err)
        // })

        // ,(error, result)=>{
        //     // if (error) {
        //     //     return console.log(error);
        //     // }
        //   console.log('inside the callback');
        // }
   

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Call the function to connect to the database
connectToDatabase();



// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const connectionUrl= 'mongodb://127.0.0.1:27017';
// const databaseName = 'task-manager';

// //creating a connection between nodejs and mongodb database
// MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client)=>{
//     if(error){
//         return console.log("Connection to database Failed!");
//     }
//     console.log("Connected to the database!");
// })