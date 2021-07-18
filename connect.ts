// const { MongoClient } = require('mongodb')

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = 'mongodb+srv://AKIA4QFQJSN2JGX37IIN:5hLHj%2FZYc65zaHLDEitCBHpnG0Og8cRdMGJnpQo9@kimberly-burnett.ntm57.mongodb.net/pet_resources?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority'

//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });
//     console.log('trying')
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect()
 
//         // Make the appropriate DB calls
//         await  listDatabases(client)
 
//     } catch (e) {
//         console.error('lets throw an err', e)
//     } finally {
//         console.log('time to close')
//         await client.close()
//     }
// }

// main().catch(console.error)

// async function listDatabases(client) {
//     console.log('list databases')
//     const databasesList = await client.db().admin().listDatabases()
//     console.log('Databases:')
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`))
// }