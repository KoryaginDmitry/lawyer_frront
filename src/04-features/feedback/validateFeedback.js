export function validateContact(value) {
    const trimmed = (value || "").trim();

    if (!trimmed) return "Поле обязательно";

    if (trimmed.startsWith("@")) {
        const telegramRegex = /^@[a-zA-Z0-9_]+$/;
        if (!telegramRegex.test(trimmed)) return "Некорректный telegram-тэг";
        return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Некорректный email";

    return null;
}

export function validateMessage(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "Поле обязательно";
    return null;
}