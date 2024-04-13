import mongoose, { ObjectId, model } from "mongoose";

interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date,
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ICard>('card', cardSchema);
