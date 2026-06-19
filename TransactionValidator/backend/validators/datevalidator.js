function validateDate(date) {

    const regex =
    /^\d{4}-\d{2}-\d{2}$/;

    return regex.test(date);
}

module.exports = validateDate;