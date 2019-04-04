async function findByKey(model, data) {
    const result = await model.findOne(data)
    return result
}

export default {
    findByKey,
}