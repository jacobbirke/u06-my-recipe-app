import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeResponse } from './spoonacular.models';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey: string = 'a10289e5e92644fc9ce68a08c08ca992'; 

  constructor(private http: HttpClient) { }

  getRecipeSuggestions(filterOptions: any): Observable<RecipeResponse> {
    let params = `?sort=random`;

    // Lägg till måltidstyp om den är vald
    if (filterOptions.förrätt) {
      params += `&type=appetizer`;
    }
    if (filterOptions.huvudrätt) {
      params += `&type=main course`;
    }
    if (filterOptions.efterrätt) {
      params += `&type=dessert`;
    }

    // Lägg till intoleranser om de är valda
    if (filterOptions.gluten) {
      params += `&intolerances=gluten`;
    }
    if (filterOptions.egg) {
      params += `&intolerances=egg`;
    }
    if (filterOptions.peanut) {
      params += `&intolerances=peanut`;
    }

    // Skapa en HttpHeaders-instans för att lägga till Authorization-header
    const headers = new HttpHeaders().set('Authorization', `apiKey ${this.apiKey}`);

    // Gör en GET-förfrågan med de specificerade parametrarna och headers
    return this.http.get<RecipeResponse>(`https://api.spoonacular.com/recipes/complexSearch${params}`, { headers });
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    // Skapa en HttpHeaders-instans för att lägga till Authorization-header
    const headers = new HttpHeaders().set('Authorization', `apiKey ${this.apiKey}`);

    // Gör en GET-förfrågan med headers
    return this.http.get<any>(`https://api.spoonacular.com/recipes/${recipeId}/information`, { headers });
  }
}
