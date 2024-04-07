import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

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
    private recipeService: RecipeService
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
    this.recipeService.getRecipeDetails(id).subscribe(response => {
      this.recipe = response;
    });
  }
}
