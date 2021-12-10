import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ToDoPageRoutingModule } from './to-do-routing.module'

import { ToDoPage } from './to-do.page'
import { AddTaskPageModule } from '../add-task/add-task.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ToDoPageRoutingModule,
    AddTaskPageModule,
  ],
  declarations: [ToDoPage],
})
export class ToDoPageModule {}
