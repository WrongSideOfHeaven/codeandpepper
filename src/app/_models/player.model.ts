
import { PersonEntry } from './people.model';
import { VehicleEntry } from './vehicles.model';
export interface Player { 
	score: number;
	personEntries: PersonEntry,
	vehicleEntries: VehicleEntry
}