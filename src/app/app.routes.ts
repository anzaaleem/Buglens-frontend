import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
export const routes: Routes = [{
  path:'',
  pathMatch:'full',
  loadComponent:()=>{
    return import('./home/home.component').then((m)=>m.HomeComponent);
    },
 },
{
  path:'todos',
  loadComponent:()=>{
    return import('./todos/todos.component').then((m)=>m.TodosComponent);
  }
},
{ path: 'about', component: AboutComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./test-error/test-error.component').then(m => m.TestErrorComponent)
  }

];

