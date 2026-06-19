function validatePhone(phone, country) {

    if (country === "India") {
        return /^\d{10}$/.test(phone);
    }

    if (country === "Singapore") {
        return /^\d{8}$/.test(phone);
    }

    return false;
}

module.exports = validatePhone;