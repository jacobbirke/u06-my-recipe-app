import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from './../spoonacular.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId!: number;
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private SpoonacularService: SpoonacularService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.recipeId = +id;
        this.getRecipeDetails(this.recipeId);
      }
    });
  }

  getRecipeDetails(id: number): void {
    this.SpoonacularService.getRecipeDetails(id).subscribe(response => {
      this.recipe = response;
    });
  }
}
