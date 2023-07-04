function c_formatDate(format) {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    // 替换相应的格式符
    format = format.replace("yyyy", year);
    format = format.replace("MM", padZero(month));
    format = format.replace("dd", padZero(day));
    format = format.replace("hh", padZero(hours));
    format = format.replace("mm", padZero(minutes));
    format = format.replace("ss", padZero(seconds));

    return format;
}

function c_padZero(number) {
    return number < 10 ? "0" + number : number;
}
