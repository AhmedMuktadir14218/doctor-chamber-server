const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ys4yzch.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        console.log('db connected');
        const serviceCollection = client.db('doctorsportal').collection('services');

        app.get('/service', async(req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })


    }
    finally{

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From Doctor Uncle!')
})

app.listen(port, () => {
  console.log(`Doctors App listening on port ${port}`)
})

// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();
// const port = process.env.PORT || 5000;

// const app = express();

// //middeware

// app.use(cors());
// app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3vw1ff.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   console.log('FreshValeey DB Connected');
// //   // perform actions on the collection object
// //   client.close();
// // });


// async function run() {
//     try{
//         await client.connect();
//         const productCollection = client.db('freshvalley').collection('product');
       
//         app.get('/product' , async(req,res)=>{
//             const query = {};
//             const cursor = productCollection.find(query);
//             const products =await cursor.toArray();
//             res.send(products);
//         });


//         app.get('/product/:id', async(req, res) =>{
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const product = await productCollection.findOne(query);
//             res.send(product);
//         });

//         app.post('/product',async(req,res)=>{
//             const newproduct =req.body;
//             const result =await productCollection.insertOne(newproduct);
//             res.send(result);
//         })

//         app.delete('/product/:id', async(req, res) =>{
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const result = await productCollection.deleteOne(query);
//             res.send(result);
//         });

        
//     }
//     finally{

//     }
// }
// run().catch(console.dir);

// app.get('/',(req,res) => {
//     res.send('Running Genius Server');
// });

// app.listen(port,()=>{
//     console.log('listening to port',port);
// })