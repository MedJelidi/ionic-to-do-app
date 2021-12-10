import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { TaskService } from '../services/task.service'
import uniqid from 'uniqid'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit, OnDestroy {
  /** Event to be triggered when the page should be removed from DOM. */
  @Output() closeAddCard: EventEmitter<boolean>
  timePickerOptions: any
  time: string
  name: string

  constructor(
    private taskService: TaskService,
    private toastController: ToastController,
  ) {
    this.timePickerOptions = {
      buttons: [
        {
          text: 'Ok',
          handler: (time) => {
            this.time = `${time.hour.text}:${time.minute.text}`
          },
        },
        {
          text: 'Cancel',
        },
      ],
    }
    this.closeAddCard = new EventEmitter<boolean>()
  }

  ngOnInit() {}

  /** Check whether the form is valid. */
  formInvalid(): boolean {
    return !this.name || !this.time
  }

  /** Fires when the user submits the form. */
  onSubmit(): void {
    if (this.formInvalid()) {
      return
    }
    const id = uniqid()
    const name = this.name
    const time = this.time
    const done = false
    const user = ''
    this.taskService
      .addTask({ id, name, time, done, user })
      .then(async () => {
        this.closeAddCard.emit(true)
        await this.presentToast('Task added successfully!')
      })
      .catch(async (err) => {
        await this.presentToast('Failed to add task. Check console error.')
        console.error(err)
      })
    this.name = null
    this.time = null
  }

  /** Presents a toast to show submission results. */
  async presentToast(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    })
    return await toast.present()
  }

  ngOnDestroy(): void {
    this.name = null
    this.time = null
  }
}
