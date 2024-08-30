export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    res.status(resStatusCode).json({
        message,
        stack: err.stack,
    });
};
