import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SwapiService } from './_services/swapi.service';
import { MatCardModule } from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { PeopleCardComponent } from './game/people-card/people-card.component';
import { VehicleCardComponent } from './game/vehicle-card/vehicle-card.component';

@NgModule({
	declarations: [
		AppComponent,
		GameComponent,
		PeopleCardComponent,
		VehicleCardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		MatCardModule,
		NgSelectModule
	],
	providers: [SwapiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
