import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonEntry, Persons } from '../_models/people.model';
import { VehicleEntry, Vehicles } from '../_models/vehicles.model';

@Injectable({ providedIn: 'root' })
export class SwapiService {
	URL = environment.API_URL;

	constructor(private readonly http: HttpClient) {}

	fetchAllPeople() {
		return this.http.get<Persons>(`${this.URL}people`);
	}

	fetchAllVehicles() {
		return this.http.get<Vehicles>(`${this.URL}vehicles`);
	}

	fetchVehicleById(vehicleId: number) {
		return this.http.get<VehicleEntry>(`${this.URL}vehicles/${vehicleId}`);
	}

	fetchPersonById(personId: number) {
		return this.http.get<PersonEntry>(`${this.URL}people/${personId}`);
	}

	fetchSpeciesByUrl(url: string) {
		return this.http.get(url);
	}
}
