import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeSuggestionsComponent } from './recipe-suggestions/recipe-suggestions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component'; 

const routes: Routes = [
  { path: 'suggestions', component: RecipeSuggestionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Om ingen väg matchar, omdirigera till /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
