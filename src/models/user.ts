import mongoose, { model, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import ERROR_MESSAGES from '../utils/error-messages';
import DEFAULT_VALUES from '../utils/default-values';
import AuthError from '../errors/auth-error';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2 символа"],
    maxlength: [30, "Максимальная длина поля 'name' - 30 символов"],
    default: DEFAULT_VALUES.USERNAME,
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длина поля 'about' - 2 символа"],
    maxlength: [200, "Максимальная длина поля 'about' - 200 символов"],
    default: DEFAULT_VALUES.ABOUT,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => validator.isURL(v, {
        protocols: ['http', 'https'],
        require_protocol: true,
        require_valid_protocol: true,
        require_tld: true,
      }),
      message: "Некорректный URL в поле 'avatar'",
    },
    default: DEFAULT_VALUES.AVATAR,
  },
  email: {
    type: String,
    required: [true, "Поле 'email' обязательно для заполнения"],
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Некорректный email в поле 'email'"
    },
  },
  password: {
    type: String,
    required: [true, "Поле 'password' обязательно для заполнения"],
    select: false,
  },
}, { versionKey: false });

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(AuthError(ERROR_MESSAGES.AUTHORIZATION_BAD_DATA));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(AuthError(ERROR_MESSAGES.AUTHORIZATION_BAD_DATA));
          }
          return user;
        });
    });
});

export default model<IUser, UserModel>('user', userSchema);
