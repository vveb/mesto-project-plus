import mongoose, { model } from 'mongoose';
import validator from 'validator';
import DEFAULT_VALUES from '../utils/default-values';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, " Минимальная длина поля 'name' - 2 символа"],
    maxlength: [30, " Максимальная длина поля 'name' - 2 символа"],
    default: DEFAULT_VALUES.USERNAME,
  },
  about: {
    type: String,
    minlength: [2, " Минимальная длина поля 'about' - 2 символа"],
    maxlength: [200, " Максимальная длина поля 'about' - 200 символов"],
    default: DEFAULT_VALUES.ABOUT,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: " Некорректный URL в поле 'avatar'",
    },
    default: DEFAULT_VALUES.AVATAR,
  },
  email: {
    type: String,
    required: [true, " Поле 'email' обязательно для заполнения"],
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: " Некорректный email в поле 'email'"
    },
  },
  password: {
    type: String,
    required: [true, " Поле 'password' обязательно для заполнения"],
  },
}, { versionKey: false });

export default model<IUser>('user', userSchema);
