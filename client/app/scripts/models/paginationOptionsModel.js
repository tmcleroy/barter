// client side only model
const PaginationOptionsModel = Backbone.Model.extend({

  updateCursor () {
    this.set('cursor', this.get('limit') * (this.get('page') - 1));
  }
  
});

export default PaginationOptionsModel;
