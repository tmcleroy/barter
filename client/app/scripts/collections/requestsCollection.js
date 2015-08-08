import PaginatedCollection from './_paginatedCollection';
import Request from 'scripts/models/requestModel';

const RequestsCollection = PaginatedCollection.extend({
  model: Request,

  url: '/api/requests'
});

export default RequestsCollection;
