const { ObjectId } = require('mongodb')
const {getDatabase} = require('./mongo')
const collectionName = 'ads'

const insertAd = async ad => {
    const database = await getDatabase()
    const {insertedId} = await database.collection(collectionName).insertOne(ad)
    return insertedId
}

const getAds = async () => {
    const database = await getDatabase()
    return await database.collection(collectionName).find({}).toArray()
}

const deleteAd = async id => {
    const db = await getDatabase()
    await db.collection(collectionName).deleteOne({
        _id: new ObjectId(id)
    })
}

const updateAd = async (id, ad) => {
    const db = await getDatabase()
    delete ad._id
    await db.collection(collectionName).update(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...ad,
            }
        }
    )
}
module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd,
}