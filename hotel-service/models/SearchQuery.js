import mongoose from 'mongoose';

const { Schema } = mongoose;

const searchQuerySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SearchQuery = mongoose.model('SearchQuery', searchQuerySchema);

export default SearchQuery;
