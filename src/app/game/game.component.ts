import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../_services/swapi.service';
import { PersonEntry } from '../_models/people.model';
import { VehicleEntry } from '../_models/vehicles.model';
import { Observable, Subscription, zip, forkJoin } from 'rxjs';
import { Player } from '../_models/player.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { categories } from '../_utils/categories';
import { SelectValue } from '../_models/selectValue.model';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.styl']
})
export class GameComponent implements OnInit {
	peopleCounter = 0;
	vehiclesCounter = 0;
	firstPlayer: Player = <Player>{};
	secondPlayer: Player = <Player>{};
	winner = 0;
	types: SelectValue[] = categories;
	selectedType = 0;
	filterForm: FormGroup;
	
	constructor(private readonly swapiService: SwapiService, private readonly formBuilder: FormBuilder) { }
	ngOnInit(): void {
		this.firstPlayer.score = 0;
		this.secondPlayer.score = 0;
		this.buildFilterForm();
		this.registerFormValueChanges();
		this.getAllPeoples();
		this.getAllVehicles();
	}
	
	buildFilterForm() { 
		this.filterForm = this.formBuilder.group({
			categories: null
		});
	}
	
	registerFormValueChanges() { 
		this.filterForm.get('categories').valueChanges.subscribe((category: SelectValue) => { 
			this.selectedType = category.value;
		})
	}
	
	roll() {
		if(this.selectedType == 1 ) { 
			forkJoin([
				this.getRandomPersons(), 
				this.getRandomPersons()
			]).subscribe((res) => { 
				res.forEach(element => {
					this.getMultipleSpecies(element.species).subscribe(species => {
						element.species = species
					});
				});
				this.firstPlayer.personEntries = res[0];
				this.secondPlayer.personEntries = res[1];
				this.setWinner(this.firstPlayer.personEntries.mass, this.secondPlayer.personEntries.mass)
			}, (error) => { 
				this.roll();
			});
		} else { 
			forkJoin([
				this.getRandomVehicles(), 
				this.getRandomVehicles()
			]).subscribe((res) => { 
				this.firstPlayer.vehicleEntries = res[0];
				this.secondPlayer.vehicleEntries = res[1];
				this.setWinner(this.firstPlayer.vehicleEntries.crew, this.secondPlayer.vehicleEntries.crew)
			}, (error) => {
				this.roll();
			});
		}
		
	}
	
	setWinner(firstResult: string, secondResult: string) { 
		const firstResultNumber = isNaN(parseInt(firstResult)) ? 0 : parseInt(firstResult);
		const secondResultNumber = isNaN(parseInt(secondResult)) ? 0 : parseInt(secondResult);
		
		if(firstResultNumber > secondResultNumber) {
			this.winner = 1;
			this.firstPlayer.score = this.firstPlayer.score + 1; 
		} else if(firstResultNumber === secondResultNumber) {
			this.winner = 0;
		} else { 
			this.winner = 2;
			this.secondPlayer.score = this.secondPlayer.score + 1; 
		}
	}
	
	getAllPeoples() { 
		this.swapiService.fetchAllPeople().subscribe( persons => { 
			this.peopleCounter = persons.count;
		})
	}
	
	getAllVehicles(){
		this.swapiService.fetchAllVehicles().subscribe( vehicles => { 
			this.vehiclesCounter = vehicles.count;
		});
	}
	
	getRandomVehicles() { 
		const randomId = Math.floor((Math.random() * this.vehiclesCounter ) + 1);
		return this.swapiService.fetchVehicleById(randomId);
	}
	
	getRandomPersons() { 
		const randomId = Math.floor((Math.random() * this.peopleCounter ) + 1);
		return this.swapiService.fetchPersonById(randomId);
	}
	
	getMultipleSpecies(urls: string[]) { 
		return forkJoin(this.prepareMultipleSpeciesRequests(urls));
	}
	
	prepareMultipleSpeciesRequests(urls: string[]) { 
		return urls.map(url => this.getSingleSpecies(url));
	}
	
	getSingleSpecies(url: string) { 
		return this.swapiService.fetchSpeciesByUrl(url);
	}
	
}
