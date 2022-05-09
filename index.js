const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8c7hq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const fridgeCollection = client.db('fridgeBD').collection('fridgeItem');
        app.get('/fridgeItem', async (req, res) => {
            const query = (0);
            const cursor = fridgeCollection.find(query);
            const fridgeItems = await cursor.toArray();
            res.send(fridgeItems);
        });

        app.get('/fridgeItem/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const fridgeItem = await fridgeCollection.findOne(query);
            res.send(fridgeItem);
        })
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running server');
});

app.listen(port, () => {
    console.log('listeing to port');
})