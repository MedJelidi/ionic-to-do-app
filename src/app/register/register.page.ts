import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm
  submitted: boolean
  emailError: string
  showError: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
  ) {
    this.submitted = false
    this.showError = false
  }

  get formControls() {
    return this.registerForm.controls
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
    this.initForm()
  }

  goToLogin(): void {
    this.navController.navigateRoot(['/login']).then()
  }

  showEmailError(): boolean {
    return this.emailError !== null && this.emailError !== undefined
  }

  onSubmit(): void {
    this.showError = true
    if (this.registerForm.invalid) {
      return
    }
    this.emailError = null
    this.submitted = true
    const email = this.registerForm.value.email
    const password = this.registerForm.value.password
    this.authService
      .register({ email, password })
      .then(() => {
        this.authService
          .login({ email, password })
          .then(() => this.navController.navigateRoot(['/home/to-do']).then())
          .catch((err) => {
            this.submitted = false
            console.log(err)
          })
      })
      .catch((err) => {
        this.emailError = err
        this.submitted = false
      })
  }
}
