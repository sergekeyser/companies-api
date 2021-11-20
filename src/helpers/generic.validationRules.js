 const timeRFC933UTCRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?([Zz])$/
 const dateRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
 const yearMonthRegex = /^([0-9]){4}\-(([0][1-9])|([1][0-2]))$/

module.exports = Object.freeze ({
    timeRFC933UTCRegex: timeRFC933UTCRegex,
    dateRegex: dateRegex,
    yearMonthRegex: yearMonthRegex

})
