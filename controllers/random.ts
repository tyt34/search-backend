export const createRandomNumber = (_, response) => {
  const random = (Math.random() * 10).toFixed(0)
  response.status(200).send({ number: random })
}
