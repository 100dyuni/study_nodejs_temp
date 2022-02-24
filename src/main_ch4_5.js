//@ts-check
/* eslint-disable no-new */
/* eslint-disable no-console */

/**캐치는 가장 가까운데 있는 문의 에러를 잡는다*/
/**
new Promise((resolve, reject) => {
  console.log('Inside promise')
  reject(new Error('First reject'))
  console.log('before resolve')
  resolve('First resolve')
  console.log('after resolve')
})
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value)
  })
  .catch((error) => {
    console.log('error', error)
  })
*/

function returnPromiseForTimeout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random())
    }, 1000)
  })
}

returnPromiseForTimeout()
  .then((value) => {
    console.log(value)
    return returnPromiseForTimeout()
  })
  .then((value) => {
    console.log(value)
    return returnPromiseForTimeout()
  })
  .then((value) => {
    console.log(value)
    return returnPromiseForTimeout()
  })
  .then((value) => {
    console.log(value)
    return returnPromiseForTimeout()
  })

returnPromiseForTimeout()
/** 
new Promise((resolve, reject) => {
  console.log('Before timeout')
  setTimeout(() => {
    resolve(Math.random())
    console.log('After resolve')
  }, 1000)
})
  .then((value) => {
    console.log('then1')
    console.log('value', value)
  })
  .then(() => {
    console.log('then2')
  })
  .then(() => {
    console.log('then3')
  })
*/
