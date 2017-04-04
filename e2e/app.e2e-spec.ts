import { TestAngularProjectPage } from './app.po';

describe('test-angular-project App', () => {
  let page: TestAngularProjectPage;

  beforeEach(() => {
    page = new TestAngularProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
