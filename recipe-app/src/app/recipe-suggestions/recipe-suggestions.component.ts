import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { RecipeResponse } from '../spoonacular.models';

@Component({
  selector: 'app-recipe-suggestions',
  templateUrl: './recipe-suggestions.component.html',
  styleUrls: ['./recipe-suggestions.component.css']
})
export class RecipeSuggestionsComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  filterOptions = {
    appetizer: false,
    mainCourse: false,
    dessert: false,
    gluten: false,
    egg: false,
    peanut: false
  };
  loading: boolean = false;
  error: string | null = null;

  constructor(private spoonacularService: SpoonacularService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.loading = true;
    this.error = null;
    this.spoonacularService.getRecipeSuggestions(this.filterOptions)
      .subscribe(
        (response: any) => {
          console.log("get recipes",response)
          this.recipes = response.results || [];
          this.filterRecipes();
          this.loading = false;
        },
        error => {
          this.error = 'Error fetching recipes. Please try again later.';
          this.loading = false;
        }
      );
  }

  filterRecipes(): void {
    this.filteredRecipes=this.recipes
  }
}
