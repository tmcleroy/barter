let AppSkeleton = require('../templates/app.ejs');
let HeaderView = require('./views/headerView');
let FooterView = require('./views/footerView');
let SideBarView = require('./views/sideBarView.js');
let HomeView = require('./views/homeView');
let LoginView = require('./views/loginView');
let RegisterView = require('./views/registerView');
let SettingsView = require('./views/settingsView');
let InboxView = require('./views/inboxView');
let RequestsView = require('./views/requestsView');
let RequestView = require('./views/requestView');
let ProposalsView = require('./views/proposalsView');
let CreateRequestView = require('./views/createRequestView');
let SubmissionView = require('./views/submissionView');
let CreateSubmissionView = require('./views/createSubmissionView');
let User = require('./models/userModel');

var Router = Backbone.Router.extend(_.defaults({
  lastView: null,
  currentView: null,
  view: null,

  routes: {
    '(/)'                                     : 'home',
    'home(/)'                                 : 'home',

    'login(/)(:options)'                      : 'login',
    'register(/)'                             : 'register',
    'app/settings(/)'                         : 'settings',
    'app/inbox(/)'                            : 'inbox',


    'app/requests/browse(/)(:options)'        : 'requestsBrowse',
    'app/requests/show/:id(/)(:options)'      : 'requestsShow',
    'app/requests/create(/)'                  : 'requestsCreate',
    'app/requests/mine(/)(:options)'          : 'requestsMine',

    'app/proposals/mine(/)(:options)'         : 'proposalsMine',

    'app/submissions/show/:id(/)'             : 'submissionsShow',
    'app/submissions/create/:id(/)'           : 'submissionsCreate'
  },

  initialize () {
    App.user = App.serverVars.user ? new User(App.serverVars.user) : null;
    $('#appContainer').html(AppSkeleton());

    new HeaderView({
      el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
    });

    new FooterView({
      el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
    });

    new SideBarView({
      el: $('<div class="sidebarViewContainer" />').appendTo('#sidebarContainer')
    });

    this.listenTo(Backbone, 'loggedIn', this.loggedIn);
  },

  // returns boolean whether to continue rendering the new view
  preRoute (viewName) {
    if (this.view) { this.view.remove(); }
    this.currentView = viewName;
    if (this.lastView !== this.currentView) {
      $('#contentContainer').empty();
      return true;
    } else {
      return false;
    }
  },

  postRoute (viewName) {
    this.lastView = this.currentView;
    Backbone.trigger('routeChanged', viewName);
  },

  parseOptions (options) {
    return JSON.parse(options);
  },

  home () {
    var viewName = 'home';

    if (this.preRoute(viewName)) {
      this.view = new HomeView({
        el: $('<div class="homeViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  login (options) {
    var viewName = 'login';

    if (this.preRoute(viewName)) {
      this.view = new LoginView({
        el: $('<div class="loginViewContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  register () {
    var viewName = 'register';

    if (this.preRoute(viewName)) {
      this.view = new RegisterView({
        el: $('<div class="registerViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  settings () {
    var viewName = 'settings';

    if (this.preRoute(viewName)) {
      this.view = new SettingsView({
        el: $('<div class="settingsViewContainer" />').appendTo('#contentContainer'),
        model: App.user
      });
      this.postRoute(viewName);
    }
  },

  inbox () {
    var viewName = 'inbox';

    if (this.preRoute(viewName)) {
      this.view = new InboxView({
        el: $('<div class="inboxViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsBrowse (options) {
    var viewName = 'requestsBrowse';
    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsBrowseContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options)
      });
      console.log(this.view.events);
      this.postRoute(viewName);
    }
  },

  requestsShow (id, options) {
    var viewName = 'requestsShow';

    if (this.preRoute(viewName)) {
      this.view = new RequestView({
        el: $('<div class="requestsShowViewContainer" />').appendTo('#contentContainer'),
        id: id,
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  requestsCreate () {
    var viewName = 'requestsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateRequestView({
        el: $('<div class="requestsCreateViewContainer" />').appendTo('#contentContainer'),
      });
      this.postRoute(viewName);
    }
  },

  requestsMine (options) {
    var viewName = 'requestsMine';

    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsMineViewContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options),
        mine: true
      });
      this.postRoute(viewName);
    }
  },

  proposalsMine (options) {
    var viewName = 'proposalsMine';

    if (this.preRoute(viewName)) {
      this.view = new ProposalsView({
        el: $('<div class="proposalsMineViewContainer" />').appendTo('#contentContainer'),
        mine: true,
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  submissionsShow (id) {
    var viewName = 'submissionsShow';

    if (this.preRoute(viewName)) {
      this.view = new SubmissionView({
        el: $('<div class="submissionsShowViewContainer" />').appendTo('#contentContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  submissionsCreate (id) {
    var viewName = 'submissionsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateSubmissionView({
        el: $('<div class="submissionsCreateViewContainer" />').appendTo('#contentContainer'),
        requestId: id
      });
      this.postRoute(viewName);
    }
  },

  // OVERRIDES
  navigate () {
    arguments[0] += window.location.search;
    Backbone.Router.prototype.navigate.apply(this, arguments);
  }
},
{ // global helpers

}));

export default Router;
