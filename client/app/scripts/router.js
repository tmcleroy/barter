import Backbone from 'backbone';
import _ from 'lodash';

import AppSkeleton from '../templates/app.ejs';
import HeaderView from './views/headerView';
import FooterView from './views/footerView';
import SideBarView from './views/sideBarView.js';
import HomeView from './views/homeView';
import LoginView from './views/loginView';
import RegisterView from './views/registerView';
import SettingsView from './views/settingsView';
import InboxView from './views/inboxView';
import RequestsView from './views/requestsView';
import RequestView from './views/requestView';
import ProposalsView from './views/proposalsView';
import CreateRequestView from './views/createRequestView';
import SubmissionView from './views/submissionView';
import CreateSubmissionView from './views/createSubmissionView';
import User from './models/userModel';

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
    'app/requests/show/:id(/)'                : 'requestsShow',
    'app/requests/create(/)'                  : 'requestsCreate',
    'app/requests/mine(/)(:options)'          : 'requestsMine',

    'app/proposals/mine(/)(:options)'         : 'proposalsMine',

    'app/submissions/show/:id(/)'             : 'submissionsShow',
    'app/submissions/create/:id(/)'           : 'submissionsCreate'
  },

  initialize: function () {
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
  preRoute: function (viewName) {
    if (this.view) { this.view.remove(); }
    this.currentView = viewName;
    if (this.lastView !== this.currentView) {
      $('#contentContainer').empty();
      return true;
    } else {
      return false;
    }
  },

  postRoute: function (viewName) {
    this.lastView = this.currentView;
    Backbone.trigger('routeChanged', viewName);
  },

  parseOptions: function (options) {
    return JSON.parse(options);
  },

  home: function () {
    var viewName = 'home';

    if (this.preRoute(viewName)) {
      this.view = new HomeView({
        el: $('<div class="homeViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  login: function (options) {
    var viewName = 'login';

    if (this.preRoute(viewName)) {
      this.view = new LoginView({
        el: $('<div class="loginViewContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  register: function () {
    var viewName = 'register';

    if (this.preRoute(viewName)) {
      this.view = new RegisterView({
        el: $('<div class="registerViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  settings: function () {
    var viewName = 'settings';

    if (this.preRoute(viewName)) {
      this.view = new SettingsView({
        el: $('<div class="settingsViewContainer" />').appendTo('#contentContainer'),
        model: App.user
      });
      this.postRoute(viewName);
    }
  },

  inbox: function () {
    var viewName = 'inbox';

    if (this.preRoute(viewName)) {
      this.view = new InboxView({
        el: $('<div class="inboxViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsBrowse: function (options) {
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

  requestsShow: function (id) {
    var viewName = 'requestsShow';

    if (this.preRoute(viewName)) {
      this.view = new RequestView({
        el: $('<div class="requestsShowViewContainer" />').appendTo('#contentContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  requestsCreate: function () {
    var viewName = 'requestsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateRequestView({
        el: $('<div class="requestsCreateViewContainer" />').appendTo('#contentContainer'),
      });
      this.postRoute(viewName);
    }
  },

  requestsMine: function (options) {
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

  proposalsMine: function (options) {
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

  submissionsShow: function (id) {
    var viewName = 'submissionsShow';

    if (this.preRoute(viewName)) {
      this.view = new SubmissionView({
        el: $('<div class="submissionsShowViewContainer" />').appendTo('#contentContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  submissionsCreate: function (id) {
    var viewName = 'submissionsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateSubmissionView({
        el: $('<div class="submissionsCreateViewContainer" />').appendTo('#contentContainer'),
        requestId: id
      });
      this.postRoute(viewName);
    }
  }

},
{ // global helpers

}));

export default Router;
