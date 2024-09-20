import mongoose from 'mongoose';

const viewedHotelsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
});

const ViewedHotels = mongoose.model('ViewedHotels', viewedHotelsSchema);

export default ViewedHotels;
