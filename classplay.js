export class OrgProperties {
    bsonType
    description
    get = () => JSON.stringify(this)
    json = () => JSON.parse(this.get())

    constructor(type, required = false) {
        this.bsonType = type
        this.description = `must be a ${type}`
        if (required) this.description += ' and is required'
    }
}

// const a = new OrgProperties('string', true)
// console.log('as plain class', a)
// console.log('json stringify', a.get())
// console.log('json', a.json())