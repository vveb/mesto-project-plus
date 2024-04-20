import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import { ICard } from "../services/interfaces";

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: [true, " Поле 'name' обязательно для заполнения"],
    minlength: [2, " Минимальная длина поля 'name' - 2 символа"],
    maxlength: [30, " Максимальная длина поля 'name' - 30 символов"],
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: " Некорректный URL в поле 'link'",
    },
    required: [true, " Поле 'link' обязательно для заполнения"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, " Поле 'owner' обязательно для заполнения"],
  },
  likes: [{
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

export default model<ICard>('card', cardSchema);
