/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interfaces/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something Went Wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSrouces: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;

    return {
      statusCode,
      message: 'Validation Error',
      errorSrouces,
    };
  };

  if (err instanceof ZodError) {
    const simplifierError = handleZodError(err);
    statusCode = simplifierError.statusCode;
    message = simplifierError.message;
    errorSource = simplifierError.errorSrouces;
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
