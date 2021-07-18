// import the mongodb driver
import { MongoClient } from 'mongodb'

// define connection string
const uri = 'mongodb+srv://AKIA4QFQJSN2JGX37IIN:5hLHj%2FZYc65zaHLDEitCBHpnG0Og8cRdMGJnpQo9@kimberly-burnett.ntm57.mongodb.net/pet_resources?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority'

// cache
let cachedDb = null

async function connectToDatabase() {
    if (cachedDb) { return cachedDb; }

    // connect to mongo
    const client = await MongoClient.connect(uri)

    // specify db
    const db = await client.db('pet_resources')

    cachedDb = db
    return db
}

exports.handler = async (event, context) => {
    /** 
     * By default, the callback waits until the runtime event loop 
     * is empty before freezing the process and returning the results 
     * to the caller. Setting this property to false requests that 
     * AWS Lambda freeze the process soon after the callback is invoked, 
     * even if there are events in the event loop. AWS Lambda will 
     * freeze the process, any state data, and the events in the event 
     * loop. Any remaining events in the event loop are processed when 
     * the Lambda function is next invoked, if AWS Lambda chooses to 
     * use the frozen process.
     */
    context.callbackWaitsForEmptyEventLoop = false

    // get an instance of our db
    const db = await connectToDatabase()

    // get data
    const data = await db.collection('organizations').find({}).toArray()

    const response = {
        statusCode: 200,
        body: data
    }

    return response
}