/* eslint-disable linebreak-style */
// data.js
const mongoose = require('mongoose');

// Define a schema for your data
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// CRUD operations
async function createItem(
    BookRefNumber,
    BookTitle,
    AuthorName,
    PublicationName,
    PublishedDate,
    copiesinstock,
    Currency,
    BookPrice,
    Bookratings,
    Audiobookavailable,
    AudiobookLink
) {
    const newItem = new Item({
        BookRefNumber,
        BookTitle,
        AuthorName,
        PublicationName,
        PublishedDate,
        copiesinstock,
        Currency,
        BookPrice,
        Bookratings,
        Audiobookavailable,
        AudiobookLink
    });
    await newItem.save();
    return newItem;
}

async function getItems() {
    return await Item.find();
}

// module.exports = {
//     createItem,
//     getItems
// };
export { createItem, getItems };
