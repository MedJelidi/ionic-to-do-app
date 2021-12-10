import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { ModalController, NavController } from '@ionic/angular'
import { EmailModalPage } from '../email-modal/email-modal.page'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm
  submitted: boolean
  firebaseError: string
  showError: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private modalController: ModalController,
  ) {
    this.submitted = false
    this.showError = false
  }

  get formControls() {
    return this.loginForm.controls
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.initForm()
  }

  goToRegister(): void {
    this.navController.navigateRoot(['/register']).then()
  }

  showFirebaseError(): boolean {
    return this.firebaseError !== null && this.firebaseError !== undefined
  }

  onSubmit(): void {
    this.firebaseError = null
    this.showError = true
    if (this.loginForm.invalid) {
      return
    }
    this.submitted = true
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.authService
      .login({ email, password })
      .then(() => this.navController.navigateRoot(['/home/to-do']).then())
      .catch((err) => {
        this.submitted = false
        this.firebaseError = err
      })
  }

  async presentResetModal() {
    const modal = await this.modalController.create({
      component: EmailModalPage,
    })
    return await modal.present()
  }
}
