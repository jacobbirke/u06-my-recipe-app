import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey: string = '5af8e6d79d4242259b4df226aaadc9d4';

  constructor(private http: HttpClient) { }

  getRecipeSuggestions(filterOptions: any): Observable<any> {
    let params = `?apiKey=${this.apiKey}&sort=random`;

    const types: string[] = [];
    if (filterOptions.appetizer) {
      types.push('appetizer');
    }
    if (filterOptions.mainCourse) {
      types.push('main course');
    }
    if (filterOptions.dessert) {
      types.push('dessert');
    }
    if (types.length > 0) {
      params += `&type=${types.join(',')}`;
    }

    if (filterOptions.gluten) {
      params += `&intolerances=gluten`;
    }
    if (filterOptions.egg) {
      params += `&intolerances=egg`;
    }
    if (filterOptions.peanut) {
      params += `&intolerances=peanut`;
    }

    return this.http.get<any>(`https://api.spoonacular.com/recipes/complexSearch${params}`);
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    return this.http.get<any>(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`);
  }
}
