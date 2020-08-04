import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PeopleCardComponent } from './game/people-card/people-card.component';
import { VehicleCardComponent } from './game/vehicle-card/vehicle-card.component';
import { SwapiService } from './_services/swapi.service';

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
export class AppModule {}
