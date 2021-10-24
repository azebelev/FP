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
function will will transform string to object with specified properties
*/
let stringToObject = (str) => {
  let obj = {};
  ([obj.x, obj.y, obj.name, obj.population] = str.split(","));
  return obj;
}

/*
function adds current object as property to objectAccumulator 
*/
let objectCreator = (objectAccumulator, currentObject, index) => {

  objectAccumulator[currentObject.name.replace(/[^а-щА-ЩЬьЮюЯяЇїІіЄєҐґ\s]/g, "")] = {
    population: currentObject.population,
    rating: index + 1
  };
  return objectAccumulator;
}

/*
function transforms CVS text to object with properties(cities)
*/
let makeOneObject = (source) => source.
  split("\n")
  .filter(sentence => !sentence.startsWith("#"))
  .map(stringToObject)
  .sort((a, b) => b.population - a.population)
  .slice(0, 3)
  .reduce(objectCreator, {})

let cities = makeOneObject(source);

/*
function returns transformed text as required
*/
let insertFullInformation = (townName) => {

  return `${townName} (${cities[townName].rating} место в ТОП-10 самых крупных городов Украины, население ${cities[townName].population} человек)`
}

/**
 * function adds full information about cites
 * @param {*} text text witch required to be supplemented by aditional information
 * @returns supplemented tet
 */
let addInformation = (text) => {
  Object.keys(cities).forEach(key => {
    console.log(key)
    if (text.includes(key)) {
      text = text.replace(key, insertFullInformation)
    }
  })
  return text;
}

console.log(addInformation(" місто з гарними фонтанами це Вінниця а Біла Церква не далеко від Києва "))
