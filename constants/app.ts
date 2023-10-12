export const PORT = 3001

export const messageOnStart = `
examples routes:
random number: http://localhost:${PORT}/random
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=id&from=5&to=8
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=&from=&to=
search: http://localhost:${PORT}/search?search_type=multi_match&text=delenit&field=body&field=email&field=
`
