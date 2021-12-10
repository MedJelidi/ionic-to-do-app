import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginPage } from './login.page'
import {
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard'

const redirectLoggedInToItems = () => redirectLoggedInTo(['home/to-do'])

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    ...canActivate(redirectLoggedInToItems),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
