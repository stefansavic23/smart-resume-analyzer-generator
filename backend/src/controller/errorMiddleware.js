const errorHandler = (error, req, res, next) => {
    console.error(error)

    let errorMessage = "An unknown error occurred"
    let statusCode = 500

    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message
    }

    res.status(statusCode).json({error:  errorMessage})
}

export default errorHandler