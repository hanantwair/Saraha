export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return res.status(500).json({ message: 'catch error', Error: err.stack });
        });
    }
}
