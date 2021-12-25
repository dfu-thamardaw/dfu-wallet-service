export default function errorHandler (err, _req, res, _next) {
  res.status(500).json(err.message);
};

export function badRequestHandler(err, _req, res, next) {
  if(res.headerSent) {
    return next(err)
  }
  res.status(400).json(err.message);
}
