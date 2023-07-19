module.exports = function(title) {
    return title.toLowerCase().split(' ').join('-');
}