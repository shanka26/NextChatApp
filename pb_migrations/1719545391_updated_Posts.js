/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  collection.indexes = [
    "CREATE INDEX `idx_EKiFvOT` ON `Posts` (`author`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmpjhbbz8gs2sog")

  collection.indexes = []

  return dao.saveCollection(collection)
})
