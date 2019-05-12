if (process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: "mongodb+srv://clfn:leinad10011@cluster0-g5oo3.mongodb.net/test?retryWrites=true"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/clfn"}
}