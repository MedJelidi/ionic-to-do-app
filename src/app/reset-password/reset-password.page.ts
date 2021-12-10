import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NavController, ToastController } from '@ionic/angular'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  passwordForm
  submitted: boolean
  showError: boolean
  diffPass: boolean
  fireError

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private route: ActivatedRoute,
    private toastController: ToastController,
  ) {
    this.submitted = false
    this.showError = false
    this.diffPass = false
  }

  get formControls() {
    return this.passwordForm.controls
  }

  initForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
    this.initForm()
  }

  onSubmit(): void {
    this.showError = true
    this.diffPass = false
    if (this.passwordForm.invalid) {
      return
    }
    this.fireError = null
    const password = this.passwordForm.value.password
    const confPassword = this.passwordForm.value.confPassword
    if (password !== confPassword) {
      this.diffPass = true
      return
    }
    this.submitted = true
    const code = this.route.snapshot.queryParams['oobCode']

    this.authService
      .confirmResetPassword(code, password)
      .then(() => {
        this.navController.navigateRoot(['/login']).then(async () => {
          await this.presentToast('Password changed successfully!')
        })
      })
      .catch((err) => {
        this.fireError = err
        this.submitted = false
      })
  }

  async presentToast(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    })
    return await toast.present()
  }
}
