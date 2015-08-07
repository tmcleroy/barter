// models that have states can extend this
// models that extend this must have urlRoot defined
// see submissionModel.js, proposalModel.js for examples

var StatefulHelper = {
  stateMap: {
    '-1': 'rejected',
    '0': 'pending',
    '1': 'accepted'
  },

  stateStringMap: {
    rejected: -1,
    pending: 0,
    accepted: 1,
    unseen: -1,
    seen: 1
  },

  setState (state) {
    this.set('state', this.stateStringMap[state]);
    return $.ajax({
      url: `${ this.urlRoot }/${ this.get('id') }/state`,
      method: 'POST',
      data: {
        state: this.get('state')
      }
    });
  },

  getStateString () {
    return this.stateMap[`${ this.get('state') }`];
  },

  getStateStringFormatted () {
    var stateString = this.getStateString();
    return stateString.replace(/^\w/, stateString.charAt(0).toUpperCase());
  },

  is (state) {
    return this.getStateString() === state;
  }
};

export default StatefulHelper;
