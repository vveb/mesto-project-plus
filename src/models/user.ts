import mongoose, { model } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string,
  about: string,
  avatar: string,
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, " Поле 'name' обязательно для заполнения"],
    minlength: [2, " Минимальная длина поля 'name' - 2 символа"],
    maxlength: [30, " Максимальная длина поля 'name' - 2 символа"],
  },
  about: {
    type: String,
    required: [true, " Поле 'about' обязательно для заполнения"],
    minlength: [2, " Минимальная длина поля 'about' - 2 символа"],
    maxlength: [200, " Максимальная длина поля 'about' - 200 символов"],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: " Некорректный URL в поле 'avatar'",
    },
    required: [true, " Поле 'avatar' обязательно для заполнения"],
  },
}, { versionKey: false });

export default model<IUser>('user', userSchema);
