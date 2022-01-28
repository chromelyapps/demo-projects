import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'tmdb', loadChildren: () => import('./tmdb/tmdb.module').then(m => m.TmdbModule) },
      { path: 'todolist', loadChildren: () => import('./todolist/todolist.module').then(m => m.TodoListModule) },
      { path: 'messagerouter', loadChildren: () => import('./messagerouter/messagerouter.module').then(m => m.MessageRouterModule) },
      { path: 'ajaxxhr', loadChildren: () => import('./ajaxxhr/ajaxxhr.module').then(m => m.AjaxXhrModule) },
      { path: 'javascriptdemo', loadChildren: () => import('./javascriptdemo/javascriptdemo.module').then(m => m.JavaScriptDemoModule) },
      { path: 'html5tests', loadChildren: () => import('./others/html5tests.module').then(m => m.Html5TestsModule) },
      { path: 'html6tests', loadChildren: () => import('./others/html6tests.module').then(m => m.Html6TestsModule) },
      { path: 'shakatests', loadChildren: () => import('./others/googleshakatests.module').then(m => m.GoogleShakaTestsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
