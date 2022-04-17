import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../data.service';
import { PokemonListDisplayInfoInterface } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {

  pokemons$!: Observable<PokemonListDisplayInfoInterface[]>;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.pokemons$ = this.dataService.getPokemons();
  }
}
