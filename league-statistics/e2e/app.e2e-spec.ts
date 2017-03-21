import { LeagueStatisticsPage } from './app.po';

describe('league-statistics App', () => {
  let page: LeagueStatisticsPage;

  beforeEach(() => {
    page = new LeagueStatisticsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
