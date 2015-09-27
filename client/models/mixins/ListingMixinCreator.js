import { SearchPaginator } from 'pagination';


export default function ListingMixinCreator() {

  const ListingMixin = {

    _listObjects: [],

    getListObjects() {
      return this._listObjects;
    },

    /*
     * @param {number} rowsPerPage
     * @param {number} currentPageNumber - To be started from 1
     * @return {object}
     */
    getListPagination(rowsPerPage, currentPageNumber) {

      const totalResult = this._listObjects.length;
      const paginator = new SearchPaginator({
        rowsPerPage,
        totalResult,
        current: currentPageNumber,
      });
      const paginated = paginator.getPaginationData();

      const fromResultByIndex = paginated.fromResult - 1;
      const objects = this._listObjects.slice(fromResultByIndex, fromResultByIndex + rowsPerPage);
      const indexedObjects = objects.map((object, i) => {
        const serialNumber = paginated.fromResult + i;
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
