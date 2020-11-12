const formatTime = date => {
    let d = new Date(date);
    let y;
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()

    y = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    return y
  }


module.exports = {
    formatTime: formatTime
}