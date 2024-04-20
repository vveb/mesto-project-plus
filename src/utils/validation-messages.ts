const email = {
  "string.email": "Некорректный email в поле {#label}",
  "string.empty": "Передано пустое значение в поле {#label}",
  "any.required": "Поле {#label} обязательно для заполнения",
};

const password = {
  "string.empty": "Передано пустое значение в поле {#label}",
  "any.required": "Поле {#label} обязательно для заполнения",
};

const name = {
  "string.empty": "Передано пустое значение в поле {#label}",
  "string.min": "Поле {#label} должно содержать не менее {#limit} символов",
  "string.max": "Поле {#label} должно содержать не более {#limit} символов",
};

const about = {
  "string.empty": "Передано пустое значение в поле {#label}",
  "string.min": "Поле {#label} должно содержать не менее {#limit} символов",
  "string.max": "Поле {#label} должно содержать не более {#limit} символов",
};

const link = {
  "string.pattern.base": "Некорректный URL в поле {#label}",
  "string.empty": "Передано пустое значение в поле {#label}",
};

const userId = {
  "string.length": "ID пользователя должен содержать {#limit} символа",
  "string.hex": "ID пользователя может содержать только цифры, записанные в 16-ричной системе счисления",
};

const cardId = {
  "string.length": "ID карточки должен содержать {#limit} символа",
  "string.hex": "ID карточки может содержать только цифры, записанные в 16-ричной системе счисления",
};

const VALIDATION_MESSAGES = {
  email,
  password,
  name,
  about,
  link,
  userId,
  cardId,
};

export default VALIDATION_MESSAGES;
