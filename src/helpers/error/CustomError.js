class CustomError extends Error {
    contructor(message,status) {
       this.message=message
        this.status= status;
    }
}


module.exports = CustomError;