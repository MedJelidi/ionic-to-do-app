import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { TaskService } from '../services/task.service'
import { Subscription } from 'rxjs'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  taskNumber: number
  /** Store subscriptions. */
  subs: Subscription

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private navController: NavController,
  ) {
    this.subs = new Subscription()
  }

  /** Fires when user clicks the logout button. */
  onLogOut() {
    this.authService
      .logOut()
      .then(() => {
        this.navController.navigateRoot(['/login']).then()
      })
      .catch((e) => console.log(e))
  }

  ngOnInit(): void {
    this.subs.add(
      this.taskService.getTaskNumber().subscribe((n) => (this.taskNumber = n)),
    )
  }

  ngOnDestroy(): void {
    /** Unsubscribe to avoid possible memory leaks. */
    this.subs.unsubscribe()
  }
}
