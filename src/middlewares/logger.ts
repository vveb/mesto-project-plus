import winston from "winston";
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    // new winston.transports.File({
    //   filename: 'request.log',
    // }),
    new winston.transports.DailyRotateFile({
      filename: 'request-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '15m',
      maxFiles: 10,
    }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    // new winston.transports.File({
    //   filename: 'error.log',
    // }),
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '15m',
      maxFiles: '30d',
    }),
  ],
  format: winston.format.json(),
});

export default {
  requestLogger,
  errorLogger,
};
