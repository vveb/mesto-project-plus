enum ERROR_MESSAGES {
  SERVER = "Ошибка на стороне сервера",
  LIKE_CARD_NOT_FOUND = "Не получается лайкнуть то, чего нет (карточка с таким id не существует)",
  DISLIKE_CARD_NOT_FOUND = "Не получается дизлайкнуть то, чего нет (карточка с таким id не существует)",
  CARD_NOT_FOUND = "Карточки с таким id не существует",
  USER_NOT_FOUND = "Пользователь с таким id не найден",
  BAD_DATA_USER = "Получены некорректные данные пользователя:",
  BAD_DATA_USER_ID = "Получены некорректные данные пользователя: что-то не так с id",
  BAD_DATA_CARD = "Получены некорректные данные для карточки:",
  BAD_DATA_LIKE = "Получены некорректные данные для лайка карточки",
  BAD_DATA_DISLIKE = "Получены некорректные данные для дизлайка карточки",
  SOURCE_NOT_FOUND = "Запрашиваемый ресурс не найден",
}

export default ERROR_MESSAGES;
