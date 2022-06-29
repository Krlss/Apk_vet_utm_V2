export const lowercase = /^(.*[a-z].*)?$/;
export const uppercase = /^(.*[A-Z].*)?$/;
export const number = /^(.*[0-9].*)?$/;

export const onlyNumber = /^[0-9]*$/;

// regex for full_name that is two words at least
export const fullnameRegex = /^(?=.*\S)[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})?$/;
