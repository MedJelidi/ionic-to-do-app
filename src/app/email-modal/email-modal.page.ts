import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ModalController, ToastController } from '@ionic/angular'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.page.html',
  styleUrls: ['./email-modal.page.scss'],
})
export class EmailModalPage implements OnInit {
  emailValue
  emailForm
  emailError
  submitted
  showError

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {
    this.emailError = false
    this.submitted = false
    this.showError = false
  }

  initForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get formControls() {
    return this.emailForm.controls
  }

  ngOnInit() {
    this.initForm()
  }

  onSubmit(): void {
    this.emailError = null
    this.showError = true
    if (this.emailForm.invalid) {
      return
    }
    this.submitted = true
    const email = this.emailForm.value.email
    console.log(email)
    this.authService
      .resetPassword(email)
      .then(async () => {
        this.submitted = false
        await this.presentToast('Email sent successfully!')
        this.modalController.dismiss()
      })
      .catch((err) => {
        this.submitted = false
        this.emailError = err
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
