import PaginatedCollection from './_paginatedCollection';
import Request from '../models/requestModel';

var RequestsCollection = PaginatedCollection.extend({
  model: Request,

  url: '/api/requests'
});

export default RequestsCollection;
