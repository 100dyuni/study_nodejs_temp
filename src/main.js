// @ts-check
// Formatting, Linting
// Formatting : prettier 세미콜론 확인
// linting : ESLint에러가 날수 있는것들을 잡아주는게목적
// Type Checking :  TypeScript

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
