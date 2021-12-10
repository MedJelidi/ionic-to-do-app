import { Component, OnDestroy, OnInit } from '@angular/core'
import { TaskModel } from '../models/task.model'
import { ModalController } from '@ionic/angular'
import { TaskService } from '../services/task.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit, OnDestroy {
  today: number
  tasks: TaskModel[]
  loading: boolean
  /** Store subscriptions. */
  subs: Subscription

  constructor(
    private modalController: ModalController,
    private taskService: TaskService,
  ) {
    this.loading = true
    this.today = Date.now()
    this.tasks = []
    this.subs = new Subscription()
  }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .then((tasksObs) => {
        this.subs.add(
          tasksObs.subscribe({
            next: (tasks) => {
              /** Get only done tasks in chronological order. */
              this.tasks = tasks
                .filter((t) => t.done)
                .sort((a, b) => a.time.localeCompare(b.time))
              this.loading = false
            },
            error: (err) => {
              console.error(err)
              this.loading = false
            },
            complete: () => (this.loading = false),
          }),
        )
      })
      .catch((err) => {
        console.error(err)
        this.loading = false
      })
  }

  /** Fires when user clicks the delete button. */
  onDelete(id: string): void {
    this.taskService.deleteTask(id)
  }

  /** Fires when user clicks the repeat button. */
  onRepeat(id: string): void {
    this.taskService.onCheck(id, false)
  }

  ngOnDestroy(): void {
    /** Unsubscribe to avoid possible memory leaks. */
    this.subs.unsubscribe()
  }
}
