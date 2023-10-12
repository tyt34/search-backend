# Backend

1. Развернуть **OpenSearch** - или в контейнере или standalone. ССылка на проект - `https://opensearch.org/`
2. Загрузить любой датасет. На пример `https://jsonplaceholder.typicode.com/comments` в **OpenSearch**
3. Сформировать клиент-серверное приложение по требованиям ниже (используя *node.js* и *React*)

Смысл сервера: 

- сервер должен предоставлять *REST Endpoints*, который возвращает набор данных из **OpenSearch** в формате *JSON*
