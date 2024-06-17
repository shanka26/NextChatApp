/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  collection.createRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
})
