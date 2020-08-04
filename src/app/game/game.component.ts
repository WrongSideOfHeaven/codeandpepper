import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Player } from '../_models/player.model';
import { SelectValue } from '../_models/selectValue.model';
import { SwapiService } from '../_services/swapi.service';
import { categories } from '../_utils/categories';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.styl']
})
export class GameComponent implements OnInit, OnDestroy {
	private ngUnsubscribe: Subject<any> = new Subject();
	peopleCounter = 0;
	vehiclesCounter = 0;
	firstPlayer: Player = {} as Player;
	secondPlayer: Player = {} as Player;
	winner = 0;
	types: SelectValue[] = categories;
	selectedType = 0;
	filterForm: FormGroup;

	constructor(
		private readonly swapiService: SwapiService,
		private readonly formBuilder: FormBuilder
	) {}
	ngOnInit(): void {
		this.firstPlayer.score = 0;
		this.secondPlayer.score = 0;
		this.buildFilterForm();
		this.registerFormValueChanges();
		this.getAllPeoples();
		this.getAllVehicles();
	}

	ngOnDestroy() {
		this.ngUnsubscribe.unsubscribe();
	}

	buildFilterForm() {
		this.filterForm = this.formBuilder.group({
			categories: null
		});
	}

	registerFormValueChanges() {
		this.filterForm
			.get('categories')
			.valueChanges.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((category: SelectValue) => {
				this.selectedType = category.value;
			});
	}

	roll() {
		if (this.selectedType === 1) {
			forkJoin([this.getRandomPersons(), this.getRandomPersons()])
				.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe(
					(res) => {
						res.forEach((element) => {
							this.getMultipleSpecies(element.species).subscribe(
								(species) => {
									element.species = species;
								}
							);
						});
						this.firstPlayer.personEntries = res[0];
						this.secondPlayer.personEntries = res[1];
						this.setWinner(
							this.firstPlayer.personEntries.mass,
							this.secondPlayer.personEntries.mass
						);
					},
					(error) => {
						this.roll();
					}
				);
		} else {
			forkJoin([this.getRandomVehicles(), this.getRandomVehicles()])
				.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe(
					(res) => {
						this.firstPlayer.vehicleEntries = res[0];
						this.secondPlayer.vehicleEntries = res[1];
						this.setWinner(
							this.firstPlayer.vehicleEntries.crew,
							this.secondPlayer.vehicleEntries.crew
						);
					},
					(error) => {
						this.roll();
					}
				);
		}
	}

	setWinner(firstResult: string, secondResult: string) {
		const firstResultNumber = isNaN(parseInt(firstResult, 0))
			? 0
			: parseInt(firstResult, 0);
		const secondResultNumber = isNaN(parseInt(secondResult, 0))
			? 0
			: parseInt(secondResult, 0);

		if (firstResultNumber > secondResultNumber) {
			this.winner = 1;
			this.firstPlayer.score = this.firstPlayer.score + 1;
		} else if (firstResultNumber === secondResultNumber) {
			this.winner = 0;
		} else {
			this.winner = 2;
			this.secondPlayer.score = this.secondPlayer.score + 1;
		}
	}

	getAllPeoples() {
		this.swapiService
			.fetchAllPeople()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((persons) => {
				this.peopleCounter = persons.count;
			});
	}

	getAllVehicles() {
		this.swapiService
			.fetchAllVehicles()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((vehicles) => {
				this.vehiclesCounter = vehicles.count;
			});
	}

	getRandomVehicles() {
		const randomId = Math.floor(Math.random() * this.vehiclesCounter + 1);
		return this.swapiService.fetchVehicleById(randomId);
	}

	getRandomPersons() {
		const randomId = Math.floor(Math.random() * this.peopleCounter + 1);
		return this.swapiService.fetchPersonById(randomId);
	}

	getMultipleSpecies(urls: string[]) {
		return forkJoin(this.prepareMultipleSpeciesRequests(urls));
	}

	prepareMultipleSpeciesRequests(urls: string[]) {
		return urls.map((url) => this.getSingleSpecies(url));
	}

	getSingleSpecies(url: string) {
		return this.swapiService.fetchSpeciesByUrl(url);
	}
}
