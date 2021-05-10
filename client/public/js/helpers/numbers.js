const formatMoney = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
    minimumFractionDigits:2
});

module.exports = {
    formatMoney
};