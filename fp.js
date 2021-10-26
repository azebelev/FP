"use strict"
//CSV text
let source = "44.38,34.33,Алушта,31440,\n" +
  "49.46,30.17,Біла Церква,200131,\n" +
  "49.54,28.49,Бердичів,87575,#некоммент\n" +
  "#\n" +
  "46.49,36.58,#Бердянськ,121692,\n" +
  "49.15,28.41,Вінниця,356665,\n" +
  "#45.40,34.29,Джанкой,43343,\n" +
  "# в этом файле три строки-коммента :)";


/*
function transforms CVS text to object with properties(cities)
*/
let makeOneObject = () => source
  .split("\n")
  .filter(sentence => !sentence.startsWith("#"))
  .map((str) => {
    let obj = {};
    ([obj.x, obj.y, obj.name, obj.population] = str.split(","));
    return obj;
  })
  .sort((a, b) => b.population - a.population)
  .slice(0, 3)
  .reduce((objectAccumulator, currentObject, index) => {

    objectAccumulator[currentObject.name.replace(/[^а-щА-ЩЬьЮюЯяЇїІіЄєҐґ\s]/g, "")] = {
      population: currentObject.population,
      rating: index + 1
    };
    return objectAccumulator;
  }, {});

/*
function for closure (cities calculates at once)
*/
let makeFunction = () => {

  let cities = makeOneObject();

  return function (text) {
    Object.keys(cities).forEach(townName => {
      let reg = new RegExp(townName, "gi")
      if (text.includes(townName)) {
        text = text.replace(reg,
          `${townName} (${cities[townName].rating} место в ТОП-10 самых крупных городов Украины, население ${cities[townName].population} человек)`)
      }
    })
    return text;
  }
}

/*
closure (cities calculates at once)
*/
let addFullInf = makeFunction(source);
console.log(addFullInf(" місто з гарними фонтанами це Вінниця Вінниця а Біла Церква не далеко від Києва "))
