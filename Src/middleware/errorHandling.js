export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return res.status(500).json({ message: 'catch error', Error: err.stack });
            // return next(new Error("catch error"));
        });
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    if (err) {
        return res.json({ message: err.message });
    }
}