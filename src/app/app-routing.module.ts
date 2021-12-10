import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'to-do',
    loadChildren: () =>
      import('./to-do/to-do.module').then((m) => m.ToDoPageModule),
  },
  {
    path: 'done',
    loadChildren: () =>
      import('./done/done.module').then((m) => m.DonePageModule),
  },
  {
    path: 'add-task',
    loadChildren: () =>
      import('./add-task/add-task.module').then((m) => m.AddTaskPageModule),
  },
  {
    path: 'email-modal',
    loadChildren: () =>
      import('./email-modal/email-modal.module').then(
        (m) => m.EmailModalPageModule,
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule,
      ),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
