import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
	let page: AppPage;
	
	beforeEach(() => {
		page = new AppPage();
	});
	
	it('should display Score titles', () => {
		page.navigateTo();
		expect(page.getTitlesText());
	});

	it('should display category select', () => {
		page.navigateTo();
		expect(page.getCategorySelect().isPresent()).toBe(true);
	});

	it('should display category select first option', () => {
		page.navigateTo();
		page.getCategorySelect().click();
		expect(page.getFirstSelectPosition()).toEqual('Persons');
	});

	it('should display button', () => {
		page.navigateTo();
		expect(page.getButton()).toBe(true);
	});

	it('should display category select second option', () => {
		page.navigateTo();
		page.getCategorySelect().click();
		expect(page.getSecondSelectPosition()).toEqual('Vehicles');
	});
	
	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		} as logging.Entry));
	});
});
