export interface VehicleEntry { 
	cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    created: string;
    crew: string;
    edited: string;
    length: number;
    manufacturer: string;
    max_atmosphering_speed: number;
    model: string;
    name: string;
    passengers: number;
    pilots: [];
    films: [];
    url: string;
    vehicle_class: string;
}

export interface Vehicles { 
	count: number;
	next: string;
	previous: string;
	results: VehicleEntry[];
}
