/* eslint-disable no-console */
// @ts-nocheck
// Formatting, Linting
// Formatting : prettier 세미콜론 확인
// linting : ESLint에러가 날수 있는것들을 잡아주는게목적
// Type Checking :  TypeScript

/*
const http = require("http")

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end("Hellow!!!")
})

const PORT = 4000
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("The Server is listening at port :", PORT)
})
*/

/**
 * @typedef Person
 *
 * @property {number} age
 * @property {string} city
 * @property {string |string[]} [pet]
 *
 */

/** @type {Person[]} */
const people = [
  {
    age: 20,
    city: '서울',
    pet: ['cat', 'dog'],
  },
  {
    age: 40,
    city: '부산',
  },
  {
    age: 31,
    city: '대구',
    pet: ['cat', 'dog'],
  },
  {
    age: 36,
    city: '서울',
  },
  {
    age: 27,
    city: '부산',
    pet: 'cat',
  },
  {
    age: 24,
    city: '서울',
    pet: 'dog',
  },
]

/*
 * Q1.30대 미만이 한 명이라도 사는 모든 도시
 * Q2.각 도시별로 개와 고양이를 키우는 사람의 수
 */

function solveQ1() {
  /**
   * @type {string[]}
   */
  const cities = []

  // eslint-disable-next-line no-restricted-syntax
  for (const person of people) {
    if (person.age < 30) {
      if (!cities.find((city) => person.city === city)) {
        cities.push(person.city)
      }
    }
  }
  return cities
}
// eslint-disable-next-line no-console
console.log('solveQ1', solveQ1())

function solveQ1Modern() {
  const allCiteis = people
    .filter((person) => person.age < 30)
    .map((person) => person.city)
  const set = new Set(allCiteis)
  return Array.from(set)
}

console.log('solveQ1Modern', solveQ1Modern())

/** @typeof {Object.<string, Object.<string,number>>} PetsOfCities */

function solveQ2() {
  /** @type {PetsOfCities} */
  const result = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const person of people) {
    const { city, pet: petOrPets } = person
    if (petOrPets) {
      const PetsOfCity = result[city] || {}
      if (typeof petOrPets === 'string') {
        const pet = petOrPets
        const origNumPetOfCity = PetsOfCity[pet] || 0
        PetsOfCity[pet] = origNumPetOfCity + 1
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const pet of petOrPets) {
          const origNumPetOfCity = PetsOfCity[pet] || 0
          PetsOfCity[pet] = origNumPetOfCity + 1
        }
      }
      result[city] = PetsOfCity
    }
  }
  return result
}

function solveQ2Modern() {
  return (
    people
      .map(({ pet: petOrPets, city }) => {
        const pets =
          (typeof petOrPets === 'string' ? [petOrPets] : petOrPets) || []

        return {
          city,
          pets,
        }
        /**
         * [
         *  [
         *    ["서울","cat"],
         *    ["서울","dog"],
         *  ],
         *  [
         *    ["부산","dog"],
         *  ],
         * ]
         */
      })
      .flatMap(({ city, pets }) => pets.map((pet) => [city, pet]))

      /**
       * ["서울","cat"],
       * ["서울","dog"],
       *
       * ["부산","dog"],
       *
       */

      .reduce((/** @type {PetsOfCities} */ result, [city, pet]) => {
        if (!city || !pet) {
          return result
        }

        return {
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...result,
          [city]: {
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            ...result[city],
            [pet]: (result[city]?.[pet] || 0) + 1,
          },
        }
      }, {})
  )
}

console.log('solveQ2', solveQ2())
console.log('solveQ2Modern', solveQ2Modern())
