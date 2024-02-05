import { Response } from 'express';
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: TMeta;
};

const sendResponse = <T>(res: Response, data: TResponse<T>, meta?: TMeta) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data.message,
    data: data.data,
    meta: meta,
  });
};

export default sendResponse;
