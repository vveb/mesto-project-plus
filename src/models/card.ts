import mongoose, { Schema, model, Model } from "mongoose";
import validator from "validator";
import { ICard } from "../services/interfaces";
import ForbiddenError from "../errors/forbidden-error";
import ERROR_MESSAGES from "../utils/error-messages";
import NotFoundError from "../errors/not-found-error";

interface CardModel extends Model<ICard> {
  deleteAllowedCard: (cardId: string, currentUserId: string) => Promise<mongoose.Document<unknown, any, ICard>>
}

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

cardSchema.static(
  'deleteAllowedCard',
  function deleteAllowedCard(cardId: string, currentUserId: string) {
    return this.findById(cardId)
      .then((card: ICard) => {
        if (!card) {
          return Promise.reject(NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND));
        }
        if (String(card.owner) !== currentUserId) {
          return Promise.reject(ForbiddenError(ERROR_MESSAGES.FORBIDDEN_DELETE_CARD));
        }
        return this.findByIdAndDelete(card).then((deletedCard: ICard) => deletedCard);
      });
  }
);

export default model<ICard, CardModel>('card', cardSchema);
