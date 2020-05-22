module.exports = {

  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  assembleRollResult: (resultList, modifer) => {
    var response;
    total = eval(resultList.join('+'))
    if (modifer) {
      total += modifer;
    }
    if (resultList.length === 1 && !modifer) {
      response = `${total}`;
    }
    else {
      formula = `${resultList.join(' + ')}`;
      if (modifer && modifer >= 0) {
        formula = `\(${formula}\) *+ ${modifer}*`;
      }
      else if (modifer && modifer < 0) {
        formula = `\(${formula}\) *- ${Math.abs(modifer)}*`;
      }
      response = `${formula} = **${total}**`;
    }
    return response;
  }
};