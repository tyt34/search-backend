export const PORT = 3001

export const sizeOnePage = 10

export const messageOnStart = `
examples routes:
random number: http://localhost:${PORT}/random
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=id&from=5&to=8&page=1
filter: http://localhost:${PORT}/filter?type=postId&from=2&to=3&type=&from=&to=&page=1

search: http://localhost:${PORT}/search?search_type=match_phrase&text=ocnaecati&field=body&field=email&field=&page=1
search: http://localhost:${PORT}/search?search_type=match_phrase&text=occaecati&field=body&field=email&field=&page=1

search: http://localhost:${PORT}/search?search_type=match_phrase&text=deserunt_quas_accusantium&field=body&field=email&field=&page=1

search: http://localhost:${PORT}/search?search_type=multi_match&text=ocnaecati&field=body&field=email&field=&page=1
search: http://localhost:${PORT}/search?search_type=multi_match&text=occaecati&field=body&field=email&field=&page=1

search: http://localhost:${PORT}/search?search_type=multi_match&text=deserunt_quas_accusantium&field=body&field=email&field=&page=1

filter and search: http://localhost:${PORT}/filter_search?type=postId&from=1&to=2&type=&from=&to=&search_type=multi_match&text=ocnaecati&field=body&field=email&field=&page=1
filter and search: http://localhost:${PORT}/filter_search?type=postId&from=1&to=2&type=&from=&to=&search_type=match_phrase&text=laudantium&field=body&field=email&field=&page=1
filter and search: http://localhost:${PORT}/filter_search?type=postId&from=1&to=2&type=&from=&to=&search_type=match_phrase&text=Nikita@garfield.biz&field=body&field=email&field=&page=1
`
