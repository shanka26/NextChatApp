/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  // remove
  collection.schema.removeField("wgc9dfwt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iff5bkpj",
    "name": "message",
    "type": "editor",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wgc9dfwt",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iff5bkpj",
    "name": "body",
    "type": "editor",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
