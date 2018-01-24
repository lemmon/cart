const countries = new Map()

module.exports.addCountry = (id, name) => {
  countries.set(id, name)
}

module.exports.allCountries = () => {
  return Array.from(countries);
}
