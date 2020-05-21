import { browser, by, element, ExpectedConditions, $$ } from 'protractor';

export class AppPage {
	navigateTo() {
		return browser.get(browser.baseUrl) as Promise<any>;
	}
	
	getTitlesText() {
		return element(by.className('title')).isPresent() as Promise<boolean>;
	}
	getCategorySelect() {
		return element(by.className('ng-select'));
	}

	getFirstSelectPosition() { 
		return element(by.css('div.ng-option:nth-child(1)')).getText() as Promise<string>;
	}
	getSecondSelectPosition() { 
		return element(by.css('div.ng-option:nth-child(2)')).getText() as Promise<string>;
	}
	getButton() { 
		return element(by.css('button')).isPresent() as Promise<boolean>;
	}
}
