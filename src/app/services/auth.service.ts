import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { UserModel } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  register(user: UserModel) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  login(user: UserModel) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  isAuth() {
    return this.auth.authState
  }

  logOut() {
    return this.auth.signOut()
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
  }

  confirmResetPassword(code: string, password: string) {
    return this.auth.confirmPasswordReset(code, password)
  }
}
