import { Joi } from "celebrate";
import VALIDATION_MESSAGES from "./validation-messages";

const urlRegExp = (/((http|https):\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(\w{2,})))(:\d{2,5})?((\/.+)+)?\/?#?/);

const emailSchema = Joi.string().required().email()
  .messages(VALIDATION_MESSAGES.email);
const passwordSchema = Joi.string().required()
  .messages(VALIDATION_MESSAGES.password);
const nameSchema = Joi.string().min(2).max(30)
  .messages(VALIDATION_MESSAGES.name);
const aboutSchema = Joi.string().min(2).max(200)
  .messages(VALIDATION_MESSAGES.about);
const linkSchema = Joi.string().pattern(urlRegExp)
  .messages(VALIDATION_MESSAGES.link);
const userIdSchema = Joi.string().length(24).hex()
  .messages(VALIDATION_MESSAGES.userId);
const cardIdSchema = Joi.string().length(24).hex()
  .messages(VALIDATION_MESSAGES.cardId);

const signUp = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  about: aboutSchema,
  avatar: linkSchema,
});

const signIn = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const updateUserInfo = Joi.object().keys({
  name: nameSchema,
  about: aboutSchema,
});

const updateAvatar = Joi.object().keys({
  link: linkSchema,
});

const userId = Joi.object().keys({
  userId: userIdSchema,
});

const newCard = Joi.object().keys({
  name: nameSchema,
  link: linkSchema,
});

const cardId = Joi.object().keys({
  cardId: cardIdSchema,
});

const VALIDATION_SCHEMAS = {
  signUp,
  signIn,
  updateUserInfo,
  updateAvatar,
  userId,
  newCard,
  cardId,
};

export default VALIDATION_SCHEMAS;
