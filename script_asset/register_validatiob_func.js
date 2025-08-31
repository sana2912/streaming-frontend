
const user_name_val = (val, set_username, set_username_err) => {
    if (val.length >= 4 && val.length <= 20) {
        const safe_val2 = val.replace(/{/g, '&#123');
        set_username(safe_val2);
        set_username_err(null);
    }
    else if (val === "") {
        set_username_err(null);
    }
    else {
        set_username_err('ยูสเซอร์ควรมี 4-20 ตัวอักษร');
    }
}
const email_val = (val, set_email, set_email_err) => {
    const email_pattern = /@gmail.com/;
    const multi_ = val.match(/@gmail.com/g);
    const email_check = email_pattern.test(val);
    const length_check = val.length >= 14 && val.length <= 28;
    if (email_check && (multi_.length === 1 && length_check)) {
        set_email(val);
        set_email_err(null);
    }
    else if (val === "") {
        set_email_err(null);
    }
    else {
        set_email_err('อีเมลของคุณไม่ถูกต้อง');
    }
}
const password1_val = (val, set_password1, set_password1_err) => {
    const pattern1 = /[A-Z]/;
    const pattern2 = /[a-z]/;
    const pattern3 = /[0-9]/;
    const length_check = val.length >= 6 && val.length <= 12;
    const lower_case = pattern1.test(val);
    const uper_case = pattern2.test(val);
    const int_ = pattern3.test(val);

    if ((length_check && lower_case) && (uper_case && int_)) {
        set_password1(val);
        set_password1_err(null);
    }
    else if (val === "") {
        set_password1_err(null);
    }
    else {
        set_password1_err('รหัสผผ่านควรมี 6-12 ตัวประกอบด้วยตัวอักษร A-z และตัวเลข');
    }
}
const password2_val = (val, password1, set_password2, set_password2_err) => {
    if (val === password1) {
        set_password2(val);
        set_password2_err(null);
    }
    else {
        set_password2_err('รหัสผ่านของคุณไม่ตรงกัน');
    }
}

export {
    user_name_val,
    email_val,
    password1_val,
    password2_val
}