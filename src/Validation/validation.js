const isEmpty = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

//******regex validation*****
let nameRegex = /^[a-zA-Z ]+$/
let imgRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/


module.exports = { isEmpty, nameRegex, imgRegex }