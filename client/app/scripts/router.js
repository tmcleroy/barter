import AppSkeleton from 'templates/app.ejs';
import HeaderView from 'scripts/views/headerView';
import FooterView from 'scripts/views/footerView';
import SideBarView from 'scripts/views/sideBarView.js';
import HomeView from 'scripts/views/homeView';
import LoginView from 'scripts/views/loginView';
import RegisterView from 'scripts/views/registerView';
import EditProfileView from 'scripts/views/editProfileView';
import SettingsView from 'scripts/views/settingsView';
import InboxView from 'scripts/views/inboxView';
import RequestsView from 'scripts/views/requestsView';
import RequestView from 'scripts/views/requestView';
import ProposalsView from 'scripts/views/proposalsView';
import CreateRequestView from 'scripts/views/createRequestView';
import SubmissionView from 'scripts/views/submissionView';
import CreateSubmissionView from 'scripts/views/createSubmissionView';
import User from 'scripts/models/userModel';

const Router = Backbone.Router.extend(_.defaults({
  previousView: null,
  currentView: null,
  view: null,

  routes: {
    '(/)'                                     : 'home',
    'home(/)'                                 : 'home',

    'login(/)(:options)'                      : 'login',
    'register(/)'                             : 'register',
    'app/profile(/)'                          : 'profile',
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
  },

  // routes that don't require authentication
  noAuthRoutes: ['home', 'login', 'register'],

  // returns boolean whether or not to proceed with rendering the route, or redirect to login
  preRoute (viewName) {
    if (this.view) { this.view.remove(); }
    $('#contentContainer').empty();

    // not logged in and accessing an auth-gated route
    if (!App.user && !_.contains(this.noAuthRoutes, viewName)) {
      this.navigate('login', true);
      return false;
    } else { // logged in or accessing an open route
      this.currentView = viewName;
      return true;
    }
  },

  postRoute (viewName) {
    this.previousView = this.currentView;
    Backbone.trigger('routeChanged', viewName);
  },

  parseOptions (options) {
    return JSON.parse(options);
  },

  home () {
    const viewName = 'home';

    if (this.preRoute(viewName)) {
      this.view = new HomeView({
        el: $('<div class="homeViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  login (options) {
    const viewName = 'login';

    if (this.preRoute(viewName)) {
      this.view = new LoginView({
        el: $('<div class="loginViewContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  register () {
    const viewName = 'register';

    if (this.preRoute(viewName)) {
      this.view = new RegisterView({
        el: $('<div class="registerViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  profile () {
    const viewName = 'profile';

    if (this.preRoute(viewName)) {
      this.view = new EditProfileView({
        el: $('<div class="editProfileViewContainer" />').appendTo('#contentContainer'),
        model: App.user
      });
      this.postRoute(viewName);
    }
  },

  settings () {
    const viewName = 'settings';

    if (this.preRoute(viewName)) {
      this.view = new SettingsView({
        el: $('<div class="settingsViewContainer" />').appendTo('#contentContainer'),
        model: App.user
      });
      this.postRoute(viewName);
    }
  },

  inbox () {
    const viewName = 'inbox';

    if (this.preRoute(viewName)) {
      this.view = new InboxView({
        el: $('<div class="inboxViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsBrowse (options) {
    const viewName = 'requestsBrowse';

    if (this.preRoute(viewName)) {
      this.view = new RequestsView({
        el: $('<div class="requestsBrowseContainer" />').appendTo('#contentContainer'),
        options: this.parseOptions(options)
      });
      this.postRoute(viewName);
    }
  },

  requestsShow (id, options) {
    const viewName = 'requestsShow';

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
    const viewName = 'requestsCreate';

    if (this.preRoute(viewName)) {
      this.view = new CreateRequestView({
        el: $('<div class="requestsCreateViewContainer" />').appendTo('#contentContainer')
      });
      this.postRoute(viewName);
    }
  },

  requestsMine (options) {
    const viewName = 'requestsMine';

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
    const viewName = 'proposalsMine';

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
    const viewName = 'submissionsShow';

    if (this.preRoute(viewName)) {
      this.view = new SubmissionView({
        el: $('<div class="submissionsShowViewContainer" />').appendTo('#contentContainer'),
        id: id
      });
      this.postRoute(viewName);
    }
  },

  submissionsCreate (id) {
    const viewName = 'submissionsCreate';

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
    // NOTE
    // always persist url query params. ex. ?var1=abc&var2=def
    arguments[0] += window.location.search;
    Backbone.Router.prototype.navigate.apply(this, arguments);
  }
},
{ // global helpers

}));

export default Router;
