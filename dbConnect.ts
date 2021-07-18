// const { MongoClient } = require('mongodb')

// const uri = 'mongodb+srv://AKIA4QFQJSN2JGX37IIN:5hLHj%2FZYc65zaHLDEitCBHpnG0Og8cRdMGJnpQo9@kimberly-burnett.ntm57.mongodb.net/pet_resources?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority'

// const clientPromise = MongoClient.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true })

// console.log('logging the init promise', clientPromise)
// module.exports.handler = async function(event, context) {
//     console.log('entering handler', event, context)
//     const client = await clientPromise

//     console.log('just a logging, post promise')

//     return client.db().databaseName
// }

// async function init() {
//     const db = await module.exports.handler()
//     console.log('db', db)
// }

// init()