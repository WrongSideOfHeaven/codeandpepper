export interface PersonEntry { 
	birth_year: string,
    eye_color: string,
    films: [],
    gender: string,
    hair_color: string,
    height: number,
    homeworld: string;
    mass: string;
    name:string;
    skin_color: string;
    created: string;
    edited: string;
    species: any;
    starships: [];
    url: string;
    vehicles: [];
}

export interface Persons { 
	count: number;
	next: string;
	previous: string;
	results: PersonEntry[];
}