import { BookPartnerPage } from './app.po';

describe('book-partner App', function() {
  let page: BookPartnerPage;

  beforeEach(() => {
    page = new BookPartnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
