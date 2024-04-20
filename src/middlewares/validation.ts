import { celebrate } from "celebrate";
import VALIDATION_SCHEMAS from "../utils/validation-schemas";

const signIn = celebrate({ body: VALIDATION_SCHEMAS.signIn });
const signUp = celebrate({ body: VALIDATION_SCHEMAS.signUp });
const updateUserInfo = celebrate({ body: VALIDATION_SCHEMAS.updateUserInfo });
const updateAvatar = celebrate({ body: VALIDATION_SCHEMAS.updateAvatar });
const userId = celebrate({ params: VALIDATION_SCHEMAS.userId });

const newCard = celebrate({ body: VALIDATION_SCHEMAS.newCard });
const cardId = celebrate({ params: VALIDATION_SCHEMAS.cardId });

const VALIDATORS = {
  signIn,
  signUp,
  updateUserInfo,
  updateAvatar,
  userId,
  newCard,
  cardId,
};

export default VALIDATORS;
