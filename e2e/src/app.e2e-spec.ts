import { AppPage } from './app.po';
import { browser, logging, ExpectedConditions } from 'protractor';

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
		expect(page.getFirstSelectPosition().getText()).toEqual('Persons');
	});

	it('should display button', () => {
		page.navigateTo();
		expect(page.getButton().isPresent()).toBe(true);
	});

	it('should display category select second option', () => {
		page.navigateTo();
		page.getCategorySelect().click();
		expect(page.getSecondSelectPosition().getText()).toEqual('Vehicles');
	});

	it('should display persons card', async () => {
		page.navigateTo();
		page.getCategorySelect().click();
		page.getFirstSelectPosition().click();
		await page.getButton().click();

		let searchText = await page.getPersonCards().then(res => res.length);
		expect( searchText ).toEqual(2)
	});

	it('should display vehicles card', async () => {
		page.navigateTo();
		page.getCategorySelect().click();
		page.getSecondSelectPosition().click();
		await page.getButton().click();

		let searchText = await page.getVehicleCards().then(res =>res.length );
		expect( searchText ).toEqual(2);
	});
	
	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		} as logging.Entry));
	});
});
