import mongoose, { model } from 'mongoose';

interface IUser {
  name: string,
  about: string,
  avatar: string,
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
