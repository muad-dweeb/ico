module.exports = {

  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  rollOutput: (resultList, modifer) => {
    var response = Object();

    response.total = eval(resultList.join('+'))
    if (modifer) {
      response.total += modifer;
    }

    if (resultList.length === 1 && !modifer) {
      response.formula = '';
    }
    else {
      formula = `${resultList.join(' + ')}`;
      if (modifer && modifer >= 0) {
        formula = `\(${formula}\) + ${modifer}`;
      }
      else if (modifer && modifer < 0) {
        formula = `\(${formula}\) - ${Math.abs(modifer)}`;
      }
      response.formula = formula;
    }
    return response;
  },

  // https://stackoverflow.com/a/57542002/3900915
  millisToReadable: (millis) => {
    let h, m, s;
    h = Math.floor(millis / 1000 / 60 / 60);
    m = Math.floor((millis / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((millis / 1000 / 60 / 60 - h) * 60 - m) * 60);
    return `${h}:${m}:${s}`
  }
};