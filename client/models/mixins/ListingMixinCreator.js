import paginate from 'simple-pagination';


export default function ListingMixinCreator() {

  const ListingMixin = {

    _listObjects: [],

    getListObjects() {
      return this._listObjects;
    },

    /*
     * @param {number} rowsPerPage
     * @param {number} specifiedPage - To be started from 1
     * @return {object}
     */
    getListPagination(rowsPerPage, specifiedPage) {
      const paginated = paginate(this._listObjects.length, rowsPerPage, specifiedPage);
      const fromIndex = paginated.fromCount - 1;
      const objects = this._listObjects.slice(fromIndex, fromIndex + rowsPerPage);
      const indexedObjects = objects.map((object, i) => {
        const serialNumber = paginated.fromCount + i;
        return {
          index: serialNumber - 1,
          serialNumber,
          object,
        };
      });
      return Object.assign(paginated, {
        objects,
        indexedObjects,
      });
    },
  };

  return ListingMixin;
}
