import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from '@angular/core';
import { PersonEntry } from 'src/app/_models/people.model';

@Component({
	selector: 'app-people-card',
	templateUrl: './people-card.component.html',
	styleUrls: ['./people-card.component.styl'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleCardComponent implements OnInit {
	@Input() person: PersonEntry;
	constructor() {}

	ngOnInit(): void {}
}
