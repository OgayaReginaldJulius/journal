import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =[]
  categorySelectedCategory

  newTaskObj = {}
  itemActivities
  itemStartDate 
  itemStatus
  itemCategory
  itemJournal
  

  constructor(public modalCtlr: ModalController, public todoService:TodoService) {

   }

  ngOnInit() {
    this.categories.push('work')
    this.categories.push('personal')
  }
  
  async add(){
    this.newTaskObj = ({itemJournal:this.itemJournal,itemActivities:this.itemActivities, itemStartDate:this.itemStartDate, itemStatus:this.itemStatus,itemCategory:this.categorySelectedCategory})
    console.log(this.newTaskObj);
    let uid = this.itemJournal + this.itemStartDate
    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      console.log("can't save empty task");
    }


    this.dismis()
  }
  
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }

}
