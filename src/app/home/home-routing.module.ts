import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePage } from './home.page'

import {
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'to-do',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../to-do/to-do.module').then((m) => m.ToDoPageModule),
          },
        ],
      },
      {
        path: 'done',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../done/done.module').then((m) => m.DonePageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home/to-do',
        pathMatch: 'full',
      },
    ],
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    redirectTo: '/home/to-do',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
