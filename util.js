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

  millisToReadable: (millis) => {
    var hours = (millis / (1000 * 60 * 60)).toFixed(0);
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
};