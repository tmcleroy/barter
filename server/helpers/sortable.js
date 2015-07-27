// sortable is an overloaded term in this instance
// this is a helper class for sortable and paginatable views
// see the indexView for requests or proposals
var Sortable = function (queryParams) {
  this.limit = queryParams.limit || 10;
  this.cursor = queryParams.cursor || 0;
  this.sorts = queryParams.sorts || {
    default: 'createdAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  var sort = queryParams.sort ? queryParams.sort.replace(/^-/, '') : this.sorts.default;
  var order = 'desc';
  if (this.sorts[sort]) {
    order = queryParams.sort.charAt(0) === '-' ? 'desc' : 'asc';
  }
  // yes the double quotes are necessary https://github.com/sequelize/sequelize/issues/2495#issuecomment-75520604
  // and it must be wrapped in arrays because of this issue https://github.com/sequelize/sequelize/issues/2004
  // work around: http://stackoverflow.com/questions/22534339/sequelize-js-limit-and-sorting-bug
  this.querySort = [['"' + sort + '"', order]];
};

module.exports = Sortable;
