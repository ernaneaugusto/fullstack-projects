const convert = (cotation, value) => {
    return cotation * value;
};

const toMoney = value => parseFloat(value).toFixed(2);

module.exports = {
    convert,
    toMoney
}