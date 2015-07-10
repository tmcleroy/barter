# issues

### technical
- figure out why included models object is empty when included by `server/utils/utils.js` `var models = require('../models');`
- see if there is a better solution to having nested models/collections with circular references
 - temporarily fixed by calling `ModelHydrator.hydrateModels(/* the model */)`
 - see `submissionView.js` and `_modelHydrator.js` for a usage example
- when a new instance of createProposalAndCommentView is created, `this.views` is set to what it was in the last instance
- tags on requests should be displayed in the order they were added by the creator of the request


### non-technical

- how to solve the low-rep problem

 - a low rep user may be able to choose to reduce his received points in exchange for increasing his received rep
