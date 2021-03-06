window.$ = jQuery; // so i can use jquery in the console
window._ = _; // so i can use lodash in the console
Backbone.$ = $;
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'styles/variables.scss';
import 'styles/fonts/barter-icons.css';
import 'styles/main.scss';
import 'styles/widgets.scss';
import 'styles/icons.scss';
import 'styles/header.scss';
import 'styles/profile.scss';
import 'styles/registerAndLogin.scss';
import 'styles/request.scss';
import 'styles/comment.scss';
import 'styles/proposal.scss';
import 'styles/submission.scss';
import 'styles/tag.scss';
import 'styles/markdown.scss';
import 'styles/buttons.scss';
import 'styles/modal.scss';
import 'styles/alert.scss';
import 'styles/lists.scss';
import 'styles/pagination.scss';
import 'styles/notifications.scss';
import 'styles/settings.scss';
import 'styles/advancedSearch.scss';

let Router = require('./router');
let Api = require('./api');
let Utils = require('./utils');

$(() => { // document ready
  App.API = Api;
  App.Router = new Router();
  Backbone.history.start({
    pushState: true,
    root: '/'
  });

  Utils.initializeGlobalHandlers();

  App.modelsAndCollections = {
    // models
    User: require('scripts/models/userModel'),
    Comment: require('scripts/models/commentModel'),
    Proposal: require('scripts/models/proposalModel'),
    Request: require('scripts/models/requestModel'),
    Submission: require('scripts/models/submissionModel'),
    Notification: require('scripts/models/notificationModel'),
    Tag: require('scripts/models/tagModel'),
    // collections
    Comments: require('scripts/collections/commentsCollection'),
    Proposals: require('scripts/collections/proposalsCollection'),
    Requests: require('scripts/collections/requestsCollection'),
    Submissions: require('scripts/collections/submissionsCollection'),
    Notifications: require('scripts/collections/notificationsCollection'),
    Tags: require('scripts/collections/tagsCollection')
  };

});
