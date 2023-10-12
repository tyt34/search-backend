export const PORT = 3001

export const sizeOnePage = 10

export const messageOnStart = `
examples routes:
random number: http://localhost:${PORT}/random
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=id&from=5&to=8&page=1
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=&from=&to=&page=1
search: http://localhost:${PORT}/search?search_type=match_phrase&text=ocnaecati&field=body&field=email&field=&page=1
search: http://localhost:${PORT}/search?search_type=match_phrase&text=deserunt_quas_accusantium&field=body&field=email&field=&page=1
`
