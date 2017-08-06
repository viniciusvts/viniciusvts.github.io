import { VtsantanaPage } from './app.po';

describe('vtsantana App', () => {
  let page: VtsantanaPage;

  beforeEach(() => {
    page = new VtsantanaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
