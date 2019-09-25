import { getGreeting } from '../support/app.po';

describe('ngx-toolbox-utils', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ngx-toolbox-utils!');
  });
});
