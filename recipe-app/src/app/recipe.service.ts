import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://api.spoonacular.com/recipes';
  private cache: { [url: string]: any } = {};

  constructor(private http: HttpClient) { }

  getRecipes(params: HttpParams): Observable<any> {
    const url = `${this.apiUrl}/complexSearch`;

    // Kontrollera om resultatet redan finns i cachen
    if (this.cache[url]) {
      return new Observable(observer => {
        observer.next(this.cache[url]);
        observer.complete();
      });
    }

    // Om resultatet inte finns i cachen, gör ett API-anrop och cachelagra resultatet
    return this.http.get(url, { params }).pipe(
      tap(response => {
        this.cache[url] = response;
      })
    );
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    const url = `${this.apiUrl}/${recipeId}/information`;

    // Kontrollera om resultatet redan finns i cachen
    if (this.cache[url]) {
      return new Observable(observer => {
        observer.next(this.cache[url]);
        observer.complete();
      });
    }

    // Om resultatet inte finns i cachen, gör ett API-anrop och cachelagra resultatet
    return this.http.get(url).pipe(
      tap(response => {
        this.cache[url] = response;
      })
    );
  }
}
