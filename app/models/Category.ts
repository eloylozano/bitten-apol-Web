import mongoose, { model, models, Schema } from "mongoose";

const PropertySchema = new Schema({
    name: { type: String, required: true },
    values: [{ type: String, required: true }]
}, { _id: false }); 

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' }, 
    properties: [PropertySchema], 
});

export const Category = models?.Category || model('Category', CategorySchema);
