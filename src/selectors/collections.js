export const getCollectionFromId = (collections, collectionId) =>
  collections.find(coll => coll.id === collectionId);

export const collectionIdExists = (collections, collectionId) => {
  const collectionIds = collections.map(collection => collection.id);
  return collectionIds.includes(collectionId);
};
