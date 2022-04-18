import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Pokedex, Result } from './generic.model';
import { PokemonSpecies } from './pokemon-species.model';
import {
  Pokemon,
  PokemonDetailedDisplayInfoInterface,
  PokemonListDisplayInfoInterface,
  POKEMON_IDS,
} from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  public status: string = '';
  public errorMessage: string = ''

  constructor(private http: HttpClient) {}

  // v2
  getPokemons() {
    console.count('called get pokemons');
    return this.http.get<Pokedex>(this.baseUrl).pipe(
      map((pokedex: Pokedex) => pokedex.results),
      tap( (pokedex) => console.log(pokedex)),
      mergeMap((results: Result[]) =>
        forkJoin(results.map((result) => this.getPokemonByUrl(result.url)))
      )
    ); // end pipe
  }

  // v1
  // getPokemons() {
  //   const pokemons = POKEMON_IDS.map((id) => this.getPokemonById(id));
  //   return forkJoin(pokemons);
  // }

  getPokemoById(id: number): Observable<PokemonListDisplayInfoInterface> {
    return this.http.get<Pokemon>(this.baseUrl + `/${id}`).pipe(
      map((data: Pokemon) => {
        const imageUrl = data.sprites.front_default;
        const id = data.id;
        const type = data.types[0].type.name;
        const name = data.name;

        return { id, name, imageUrl, type };
      })
    );
  }

  getPokemonByUrl(url: string): Observable<PokemonListDisplayInfoInterface> {
    return this.http.get<Pokemon>(url).pipe(
      map((data: Pokemon) => {
        const imageUrl = data.sprites.front_default;
        const id = data.id;
        const type = data.types[0].type.name;
        const name = data.name;

        return { id, name, imageUrl, type };
      })
    );
  }

  // METHODS FOR THE DETAILS COMPONENT
  getPokemonDetailedInfoById(id: string) {
    const pokemonInfo = this.getPokemonDetailById(id);
    const speciesInfo = this.getPokemonSpeciesInfoById(id);
    return forkJoin([pokemonInfo, speciesInfo]);
  }

  getPokemonDetailById(id: string) {
    return this.http.get<Pokemon>(this.baseUrl + `/${id}`).pipe(
      map((data: Pokemon) => {
        const { id, name, sprites, stats, types, weight, height } = data;
        const detailedInfo: PokemonDetailedDisplayInfoInterface = {
          id,
          name,
          height,
          weight,
          imageUrl: sprites.other.dream_world.front_default,
          type: types[0].type?.name,
        };
        return detailedInfo;
      })
    );
  }
  public deletePokemon(id: string) {
      this.http.delete<string>(this.baseUrl + `${id}`)
      .subscribe({
        next: data => {this.status = 'Del successful'},
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          
        },
         complete: () => console.log('Observer got a complete notification')
      })
  }



  getPokemonSpeciesInfoById(id: string) {
    return this.http.get<PokemonSpecies>(this.baseUrl + `-species/${id}`).pipe(
      map((data: PokemonSpecies) => {
        const { habitat, flavor_text_entries } = data;
        const habitatText = habitat.name;
        const decriptiveText = flavor_text_entries[0].flavor_text.replace(
          /\f/g,
          ' '
        );
        return { habitat: habitatText, description: decriptiveText };
      })
    );
  }
}
