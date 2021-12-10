import { Component, OnDestroy, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { TaskModel } from '../models/task.model'
import { TaskService } from '../services/task.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit, OnDestroy {
  today: number
  tasks: TaskModel[]
  loading: boolean
  showAddCard: boolean
  /** Store subscriptions. */
  subs: Subscription

  constructor(private taskService: TaskService) {
    this.loading = true
    this.showAddCard = false
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
              /** Get all tasks in chronological order. */
              this.tasks = tasks.sort((a, b) => a.time.localeCompare(b.time))
              this.taskService.setTaskNumber(this.tasks.length)
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

  /** Fires when add form is submitted. */
  onAdd(): void {
    this.showAddCard = !this.showAddCard
  }

  /** Fires on task card click. */
  onCheck(key: string, done: boolean): void {
    this.taskService.onCheck(key, !done)
  }

  /** Returns a unique identifier for each task
   * so Angular can create or destroy only the items
   * that have changed instead of re-rendering the whole list. */
  identity(index, item) {
    return item.id
  }

  ngOnDestroy(): void {
    /** Unsubscribe to avoid possible memory leaks. */
    this.subs.unsubscribe()
  }
}
