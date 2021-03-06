//@ts-check

//프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터에비으로 활욜 예정(json)
 * - 인증 로직은 넣지 않는다
 * - RESTful API를 사용.
 */

const http = require('http')

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 *
 */

/** @type {Post} */
const examplePost = {
  id: 'abc',
  title: 'abc',
  content: 'abc',
}

/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'my first post',
    content: 'Hello!',
  },
  {
    id: 'my_second_post',
    title: '나의 두번째 포스트',
    content: 'Second Post',
  },
]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 *
 */
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined
  //console.log(req.url)
  //console.log(POSTS_ID_REGEX)
  //console.log(POSTS_ID_REGEX.exec(req.url))
  //console.log(postIdRegexResult)
  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }
    res.statusCode = 200
    //res.end('List of posts')
    res.setHeader('Content-Type', 'application/json; encoding=utf-8')
    res.end(JSON.stringify(result))
    //} else if (req.url === '/posts/:id') {
    //} else if (req.url && /^\/posts\/[a-zA-Z0-9]+$/.test(req.url)) {
  } else if (postIdRegexResult && req.method === 'GET') {
    //Get /posts/:id
    //const postId = postIdRegexResult[1]
    //console.log(postId)
    /**
    const regexResult = POSTS_ID_REGEX.exec(req.url)
    if (regexResult) {
      const postId = regexResult[1]
      console.log(postId)
    } */
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)
    console.log(postId)
    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; encoding=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post not found')
    }
    //res.statusCode = 200
    //res.end('Some content of the post')
    //res.end('Reading a post')
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       *
       */

      /** @type {CreatePostBody} */
      const body = JSON.parse(data)
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      })
      console.log(body)
    })
    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }

  //res.statusCode = 200
  //res.end('Hellow')
})

const PORT = 4000

server.listen(PORT, () => {
  console.log('The Server is listening at port :', PORT)
})
