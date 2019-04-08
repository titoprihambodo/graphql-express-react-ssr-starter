import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type: 'String', required: true},
  content: {type: 'String', required: true},
  slug: {type: 'String', required: true, unique: true},
  meta: {
    description: {type: 'String'},
    keywords: {type: 'String'},
  },
  createdAt: {type: 'Date', default: Date.now},
  updatedAt: {type: 'Date'},
})

export default mongoose.model('Post', postSchema);