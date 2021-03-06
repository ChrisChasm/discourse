import { moduleForWidget, widgetTest } from 'helpers/widget-test';

moduleForWidget('header');

widgetTest('rendering basics', {
  template: '{{mount-widget widget="header"}}',
  test(assert) {
    assert.ok(this.$('header.d-header').length);
    assert.ok(this.$('#site-logo').length);
  }
});

widgetTest('sign up / login buttons', {
  template: '{{mount-widget widget="header" showCreateAccount="showCreateAccount" showLogin="showLogin" args=args}}',
  anonymous: true,

  setup() {
    this.set('args', { canSignUp: true });
    this.on('showCreateAccount', () => this.signupShown = true);
    this.on('showLogin', () => this.loginShown = true);
  },

  test(assert) {
    assert.ok(this.$('button.sign-up-button').length);
    assert.ok(this.$('button.login-button').length);

    click('button.sign-up-button');
    andThen(() => {
      assert.ok(this.signupShown);
    });

    click('button.login-button');
    andThen(() => {
      assert.ok(this.loginShown);
    });
  }
});

widgetTest('anon when login required', {
  template: '{{mount-widget widget="header" showCreateAccount="showCreateAccount" showLogin="showLogin" args=args}}',
  anonymous: true,

  setup() {
    this.set('args', { canSignUp: true });
    this.on('showCreateAccount', () => this.signupShown = true);
    this.on('showLogin', () => this.loginShown = true);
    this.siteSettings.login_required = true;
  },

  test(assert) {
    assert.ok(exists('button.login-button'));
    assert.ok(exists('button.sign-up-button'));
    assert.ok(!exists('#search-button'));
    assert.ok(!exists('#toggle-hamburger-menu'));
  }
});

widgetTest('logged in when login required', {
  template: '{{mount-widget widget="header" showCreateAccount="showCreateAccount" showLogin="showLogin" args=args}}',

  setup() {
    this.set('args', { canSignUp: true });
    this.on('showCreateAccount', () => this.signupShown = true);
    this.on('showLogin', () => this.loginShown = true);
    this.siteSettings.login_required = true;
  },

  test(assert) {
    assert.ok(!exists('button.login-button'));
    assert.ok(!exists('button.sign-up-button'));
    assert.ok(exists('#search-button'));
    assert.ok(exists('#toggle-hamburger-menu'));
    assert.ok(exists('#current-user'));
  }
});
