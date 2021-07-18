// const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'
import { OrgProperties } from './classplay.js'
import * as json from './ncOrgs.json'

const uri = 'mongodb+srv://AKIA4QFQJSN2JGX37IIN:5hLHj%2FZYc65zaHLDEitCBHpnG0Og8cRdMGJnpQo9@kimberly-burnett.ntm57.mongodb.net/pet_resources?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority'
const clientPromise = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

let cachedDb = null

async function init() {
   const db = await connectToDatabase()
   console.log('coco', db.databaseName)

      // await updateValidation(clientPromise.db())
      // await insertNCData(db)
      // await create(db)
   
   const response = await getData(db)
   console.log('response', response)
   await clientPromise.close();
}

async function getData(db) {
   const data = await db.collection('organizations').find({}).toArray()

   const response = {
      statusCode: 200,
      body: data
   }

   return response
}

async function connectToDatabase() {
   if (cachedDb) { return cachedDb; }

   // connect to mongo
   const client = await MongoClient.connect(uri)

   // specify db
   const db = await client.db('pet_resources')

   cachedDb = db
   return db
}

async function insertNCData(db) {
   const j = json.default
   // console.log('json', j)
   const cc = await db.collection('organizations')
   console.log('collection name', cc.collectionName)
   const code = await cc.insertMany(j)
   console.log('code', code)
}

async function create(db) {
   const c = db.dropCollection('organizations')
   console.log('droppage', c)
   const options = await validationRules()
   const r = await db.createCollection('organizations', options)
   console.log('r', r)
}

async function validationRules() {
   return {
      // collMod: "organizations",
      validator: { $jsonSchema: {
         bsonType: "object",
         required: [ "organization" ],
         properties: {
            contact: new OrgProperties('string').json(),
            description: new OrgProperties('string').json(),
            location: new OrgProperties('string').json(),
            organization: new OrgProperties('string', true).json(),
            services: new OrgProperties('array').json()
         }
      } }
   }
}

async function updateValidation(db) {
   const rules = await validationRules()
   console.log('before')
   await db.command(rules)
   console.log('after')
}

init()
