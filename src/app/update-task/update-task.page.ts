import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories =[]
  categorySelectedCategory

  newTaskObj = {}
  itemActivities
  itemStartDate 
  itemStatus
  itemCategory
  itemJournal

  constructor(public modalCtlr:ModalController, public todoServive:TodoService) { }

  ngOnInit() {
    this.categories.push('work')
    this.categories.push('personal')

    this.itemJournal= this.task.value.itemJournal
    this.itemActivities = this.task.value.itemActivities
    this.itemStartDate = this.task.value.itemStartDate
    this.itemStatus = this.task.value.itemStatus
    this.categorySelectedCategory = this.task.value.itemCategory
    // console.log(this.task);
    
    
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    this.newTaskObj = ({itemJournal:this.itemJournal , itemActivities:this.itemActivities , itemStartDate:this.itemStartDate, itemStatus:this.itemStatus,itemCategory:this.categorySelectedCategory})
    let uid = this.task.key
    await this.todoServive.updateTask(uid,this.newTaskObj)
    this.dismis()
  }
}
