# Opensearch-Back

![](https://shields.io/badge/-JavaScript-yellow)
![](https://shields.io/badge/-Node.js-3E863D)
![](https://shields.io/badge/-TypeScript-2D79C7)

- [Opensearch-Back](#opensearch-back)
  - [Описание](#описание)
  - [Функциональность](#функциональность)
  - [Предварительная настройка OpenSearch](#предварительная-настройка-opensearch)
  - [Примеры запросов](#примеры-запросов)
    - [Документы по порядку](#документы-по-порядку)
    - [Фильтрация](#фильтрация)
    - [Поиск](#поиск)
    - [Фильтрация и поиск](#фильтрация-и-поиск)
  - [Запуск приложения](#запуск-приложения)

## Описание

Данное приложение это *backend* для просмотра документов из *OpenSearch*, с помощью *frontend* приложения доступного по [этой ссылке](https://github.com/tyt34/search-front).

## Функциональность

В *OpenSearch* загружены документы. Каждый документ состоит из следующих полей:

- *ID*
- *PostID*
- *Name*
- *Email*
- *Body*

Приложение используется для преобразования запросов с *frontend* приложения в запросы *OpenSearch*.

В данном приложение доступно несколько *endpoint*'ов. В каждом *endpoint*'е реализована *пагинация*. Список:

- *all* - получение документов по порядку
- *filter* - фильтрация документов по полю *ID* и *PostID*
- *seacrh* - поиск по полям *Name*, *Email* и *Body*. Типы поиска:
- - по точному совпадению - *match_phrase*
- - расширенный, который допускает написание текста с ошибками и опечатками - *multi_match*
- *filter_search* - объединение фильтрации и поиска

## Предварительная настройка OpenSearch

Для получения результатов по указанным далее *endpoint*'ам необходимо использовать *OpenSearch* запущенный на порту **9200**. В *OpenSearch* необходимо создать индекс. Для этого можно воспользоваться следующей командой в *DevTools*:

```
PUT /d
{
  "properties": {
    "body": {
      "analyzer": "custom_edge_ngram_analyzer",
      "type": "text"
    },
    "email": {
      "type": "text"
    },
    "id": {
      "type": "integer"
    },
    "name": {
      "analyzer": "standard",
      "type": "text"
    },
    "postId": {
      "type": "integer"
    }
  }
}
```

Далее необходимо загрузить данные. Для данного приложения данные были взяты по [этой ссылке](https://jsonplaceholder.typicode.com/comments). Для загрузки данных с помощью *DevTools* можно воспользоваться следующей командой:

```
POST /d/_bulk
{"index":{"_id":0}}
{"postId":1,"id":1,"name":"id labore ex et quam laborum","email":"Eliseo@gardner.biz","body":"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"}
// и так далее
```

## Примеры запросов

### Документы по порядку 

Получение первых 10 документов:

```
http://localhost:3001/all?page=1
```

### Фильтрация

Получение первых 10 документов, которые отфильтрованы:

- *ID* - от 2 до 3
- *PostID* - от 4 до 5

```
http://localhost:3001/filter?from_id=2&from_to=3&from_post=4&to_post=5&page=1
```

### Поиск

Получение первых 10 документов в которых:

- содержится фраза - *deserunt quas*
- совпадение - *точное*
- поля - *body* и *email*

```
http://localhost:3001/search?search_type=match_phrase&text=deserunt_quas&field=body&field=email&field=&page=1
```

### Фильтрация и поиск

Получение первых 10 документов в которых:

- фильтрация
- - *ID* - от 2 до 3
- - *PostID* - от 4 до 5
- поиск
- - содержится слово - *ocnaecati*
- - поиск - *расширенный*
- - поля - *body* и *email*

```
http://localhost:3001/filter_search?from_id=2&from_to=3&from_post=4&to_post=5&search_type=match_phrase&text=&field=body&field=email&field=&page=1
```

<tr>
    <hr>
</tr>

## Запуск приложения
1. npm i
2. npm run start