//@ts-check

require('core-js')

/** 
const complicatedArray = [1, [2, 3]]
const flattendArray = complicatedArray.flat()

console.log(flattendArray)
*/

const original = 'abcabc123'
const changed = original.replace('abc', '123')

console.log(changed)

/**
 *
 * @param {number} duration
 * @returns
 */
function sleep(duration) {
  return new Promise((resolve) => {
    console.log('sleep start')
    setTimeout(() => {
      console.log('sleep done', duration)
      resolve(duration)
    }, duration)
  })
}

function alawsReject() {
  return new Promise((resolve, reject) => {
    reject()
  })
}

Promise.allSettled([sleep(1000), sleep(1500), sleep(2000), alawsReject()]).then(
  (value) => {
    console.log('Promise.all done!', value)
  }
)
