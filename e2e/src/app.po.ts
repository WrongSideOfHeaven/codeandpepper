import { browser, by, element, ExpectedConditions, $$, ElementArrayFinder } from 'protractor';

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
		return element(by.css('div.ng-option:nth-child(1)'));
	}

	getSecondSelectPosition() { 
		return element(by.css('div.ng-option:nth-child(2)'));
	}

	getButton() { 
		return element(by.css('button'));
	}

	async getPersonCards() { 
		return element.all(by.css('app-people-card')) as ElementArrayFinder;
	}
	
	async getVehicleCards() { 
		return element.all(by.css('app-vehicle-card')) as ElementArrayFinder;
	}
}
