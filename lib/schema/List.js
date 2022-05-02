import mongoose from "mongoose";
const Schema = mongoose.Schema

const ItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})
const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    titleLower: {
        type: String,
        required: true
    },
    items: {
        type: [ItemsSchema],
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

listSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

export const List = mongoose.models.List || mongoose.model("List", listSchema)