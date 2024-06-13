export interface Recipe {
  id: number;
  title: string;
  image: string;
  dishTypes: string[];
  intolerances?: string[];
}

export interface RecipeResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
