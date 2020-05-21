import { Component, OnInit, Input } from '@angular/core';
import { VehicleEntry } from 'src/app/_models/vehicles.model';

@Component({
	selector: 'app-vehicle-card',
	templateUrl: './vehicle-card.component.html',
	styleUrls: ['./vehicle-card.component.styl']
})
export class VehicleCardComponent implements OnInit {
	@Input() vehicle: VehicleEntry
	constructor() { }
	
	ngOnInit(): void {
	}
	
}
