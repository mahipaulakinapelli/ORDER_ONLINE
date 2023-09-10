module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};  //this is for when the product name is required but we didnot given name for this type of errors we use this