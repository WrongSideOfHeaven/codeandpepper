import { Component, OnInit, Input } from '@angular/core';
import { Persons, PersonEntry } from 'src/app/_models/people.model';

@Component({
	selector: 'app-people-card',
	templateUrl: './people-card.component.html',
	styleUrls: ['./people-card.component.styl']
})
export class PeopleCardComponent implements OnInit {
	@Input() person: PersonEntry;
	constructor() { }
	
	ngOnInit(): void {
	}
	
}
