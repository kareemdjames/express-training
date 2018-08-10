const logger = (options) => (req, res, next) => {
  if (typeof options === 'object' 
      && options !== null
      && options.enable) {
        console.log(
          'Status Code: ', res.statusCode,
          'Url:', req.originalUrl
        )
      }
      next()
}

module.exports = logger