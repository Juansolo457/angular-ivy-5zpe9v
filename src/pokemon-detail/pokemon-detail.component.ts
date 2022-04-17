import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, tap, mergeMap, switchMap } from 'rxjs';
import { DataService } from '../data.service';
import {
  PokemonDetailedDisplayInfoInterface,
  PokemonDetailedInfo,
  PokemonSpeciesInfoInterface,
} from '../pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonId!: number;
  pokemonData!: PokemonDetailedInfo;
  speciesInfo: PokemonSpeciesInfoInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.dataService.getPokemonDetailedInfoById(params.get('id'))
        )
      )
      .subscribe(
        (
          data: [
            PokemonDetailedDisplayInfoInterface,
            PokemonSpeciesInfoInterface
          ]
        ) => {
          this.pokemonData = data[0];
          this.speciesInfo = data[1];
        }
      );
  }
}
