import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { TaskModel } from '../models/task.model'
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /** Updates tasks number. */
  private readonly taskNumber: BehaviorSubject<number>

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.taskNumber = new BehaviorSubject<number>(0)
  }

  /** Returns connected user ID. */
  async getTasksOwner(): Promise<any> {
    const authObs = this.authService.isAuth()
    /** firstValueFrom: converts an observable to a promise that will
     * resolve as soon as the first value arrives from the observable.
     * */
    const currentUserData = await firstValueFrom(authObs)
    // @ts-ignore
    const userID = currentUserData?.multiFactor?.user?.uid
    return new Promise<any>((resolve, reject) => {
      if (userID) {
        return resolve(userID)
      }
      return reject('No userID provided')
    })
  }

  /** Adds a task to database. */
  async addTask(task: TaskModel): Promise<any> {
    this.getTasksOwner()
      .then((userID) => {
        task.user = userID
        return this.db.database.ref().child(`/tasks/${task.id}`).set(task)
      })
      .catch((err) => console.error(err))
  }

  /** Gets all tasks (done and undone) of current user. */
  async getTasks(): Promise<Observable<TaskModel[]>> {
    const userID = await this.getTasksOwner()
    return this.db
      .list<TaskModel>('tasks', (ref) =>
        ref.orderByChild('user').equalTo(userID),
      )
      .valueChanges()
  }

  /** taskNumber setter. */
  setTaskNumber(num: number): void {
    this.taskNumber.next(num)
  }

  /** taskNumber getter. */
  getTaskNumber(): BehaviorSubject<number> {
    return this.taskNumber
  }

  /** Makes a task done or revert it back to undone. */
  onCheck(key: string, done: boolean): void {
    this.db.list<TaskModel>('tasks').update(key, { done }).then()
  }

  /** Deletes a task from database. */
  deleteTask(key: string): void {
    this.db.list<TaskModel>('tasks').remove(key).then()
  }
}
