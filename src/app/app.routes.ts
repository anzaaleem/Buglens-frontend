import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
export const routes: Routes = [{
  path:'',
  pathMatch:'full',
  loadComponent:()=>{
    return import('./components/home/home.component').then((m)=>m.HomeComponent);
    },
 },
{
  path:'todos',
  loadComponent:()=>{
    return import('./components/todos/todos.component').then((m)=>m.TodosComponent);
  }
},
{ path: 'about', component: AboutComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./components/test-error/test-error.component').then(m => m.TestErrorComponent)
  }

];

