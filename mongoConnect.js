// const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'
import { OrgProperties } from './classplay.js'
import * as json from './ncOrgs.json'

const uri = 'mongodb+srv://AKIA4QFQJSN2JGX37IIN:5hLHj%2FZYc65zaHLDEitCBHpnG0Og8cRdMGJnpQo9@kimberly-burnett.ntm57.mongodb.net/pet_resources?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority'
const clientPromise = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


clientPromise.connect(async err => {
   // const collection = clientPromise.db('pet_resources').collection('organizations')
   // perform actions on the collection object
   const db = clientPromise.db('pet_resources')
   console.log('coco', db.databaseName)
   // await updateValidation(clientPromise.db())
   // await insertNCData(db)
   // await create(db)
   await clientPromise.close();
});

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

