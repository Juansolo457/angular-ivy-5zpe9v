import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    PokemonListComponent,
    PokemonDetailComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
