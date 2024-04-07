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
    lactose: false,
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
        (response: RecipeResponse) => {
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
    this.filteredRecipes = this.recipes.filter(recipe => {
      const intolerances = recipe.intolerances || [];
      return (
        (!this.filterOptions.appetizer || recipe.type === 'appetizer') &&
        (!this.filterOptions.mainCourse || recipe.type === 'mainCourse') &&
        (!this.filterOptions.dessert || recipe.type === 'dessert') &&
        (!this.filterOptions.gluten || !intolerances.includes('gluten')) &&
        (!this.filterOptions.egg || !intolerances.includes('egg')) &&
        (!this.filterOptions.peanut || !intolerances.includes('peanut'))
      );
    });
  }
}
