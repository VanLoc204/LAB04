const validateDrug = (req, res, next) => {
    // Middleware kiểm tra dữ liệu đầu vào cho thuốc
    const { name, dosage, card, pack, perDay } = req.body;
    const errors = [];

    // Kiểm tra tên thuốc: độ dài phải lớn hơn 5 ký tự
    if (!name || name.length <= 5) {
        errors.push('Name must be longer than 5 characters');
    }

    // Kiểm tra liều lượng: phải theo định dạng XX-morning,XX-afternoon,XX-night với X là chữ số
    const dosageRegex = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosage || !dosageRegex.test(dosage)) {
        errors.push('Dosage must follow the format: XX-morning,XX-afternoon,XX-night where X is digit');
    }

    // Kiểm tra số thẻ: phải lớn hơn 1000
    if (!card || card <= 1000) {
        errors.push('Card must be more than 1000');
    }

    // Kiểm tra số gói: phải lớn hơn 0
    if (!pack || pack <= 0) {
        errors.push('Pack must be more than 0');
    }

    // Kiểm tra số viên/ngày: phải lớn hơn 0 và nhỏ hơn 90
    if (!perDay || perDay <= 0 || perDay >= 90) {
        errors.push('PerDay must be more than 0 and less than 90');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateDrug;
