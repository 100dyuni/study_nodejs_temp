setTimeout(() => {
  const value = Math.random()
  console.log(value)

  setTimeout(() => {
    const value1 = Math.random()
    console.log(value1)

    setTimeout(() => {
      const value2 = Math.random()
      console.log(value2)

      setTimeout(() => {
        const value3 = Math.random()
        console.log(value3)
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
