export const PORT = 3001

export const sizeOnePage = 10

const baseRandom = `http://localhost:${PORT}/random`
const baseFilter = `http://localhost:${PORT}/filter?`
const baseAll = `http://localhost:${PORT}/all?`
const baseSearch = `http://localhost:${PORT}/search?`
const baseSearchFilter = `http://localhost:${PORT}/filter_search?`

export const messageOnStart = `
examples routes:
random number: ${baseRandom}
filter: 
${baseFilter}from_id=5&from_to=8&from_post=2&to_post=3&page=1
${baseFilter}from_id=400&from_to=&from_post=&to_post=&page=1
${baseFilter}from_id=15&from_to=&from_post=&to_post=&page=1

search: 
${baseSearch}search_type=match_phrase&text=ocnaecati&field=body&field=email&field=&page=1
${baseSearch}search_type=match_phrase&text=occaecati&field=body&field=email&field=&page=1
${baseSearch}search_type=match_phrase&text=deserunt_quas_accusantium&field=body&field=email&field=&page=1
${baseSearch}search_type=multi_match&text=ocnaecati&field=body&field=email&field=&page=1
${baseSearch}search_type=multi_match&text=occaecati&field=body&field=email&field=&page=1
${baseSearch}search_type=multi_match&text=deserunt_quas_accusantium&field=body&field=email&field=&page=1

filter and search: 
${baseSearchFilter}from_id=1&from_to=2&from_post=&to_post=&search_type=multi_match&text=ocnaecati&field=body&field=email&field=&page=1
${baseSearchFilter}from_id=1&from_to=2&from_post=&to_post=&search_type=match_phrase&text=laudantium&field=body&field=email&field=&page=1
${baseSearchFilter}from_id=1&from_to=2&from_post=&to_post=&search_type=match_phrase&text=Nikita@garfield.biz&field=body&field=email&field=&page=1

all: 
${baseAll}page=1
${baseAll}page=2
`
