const makeid = () => {
  let result = ''
  let alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++)
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  return result
}

module.exports = {
  makeid,
}
