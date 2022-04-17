export interface Ability2 {
  name: string;
  url: string;
}

export interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
}

export interface DreamWorld {
  front_default: string;
  front_female?: any;
}

export interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Type2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Pokemon {
  height: number;
  id: number;
  location_area_encounters: string;
  name: string;
  order: number;
  past_types: any[];
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface PokemonListDisplayInfoInterface {
  id: number;
  type: string;
  imageUrl: string;
  name: string;
}

export interface PokemonDetailedDisplayInfoInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  imageUrl: string;
  type: string;
}

export interface PokemonSpeciesInfoInterface {
  habitat: string;
  description: string;
}

export interface PokemonDetailedInfo
  extends PokemonDetailedDisplayInfoInterface {}

export const POKEMON_IDS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
