import { Component } from '@angular/core';
import { NavController,AlertController,ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { Item } from '../../models/item/item.model'
import { ItemListService } from '../../services/item-list/item-list.service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  item: Item ={
    key: '',
    s_name: '',
    s_stream: '',
  };

  //student:AngularFireList<any>;
  student: Observable<Item[]>;

  constructor(public navCtrl: NavController,
  public alertCtrl: AlertController,
  public actionSheetCtrl: ActionSheetController,
  private afd:AngularFireDatabase,private studentvalue: ItemListService ) {
    
    // this.student= afd.list('/student').snapshotChanges().map(changes =>{ return changes.map(c =>
    // ({ key: c.payload.key, ...c.payload.val()}) )});

    this.student= this.studentvalue.getstudentlist().snapshotChanges().map(changes =>{ return changes.map(c =>
    ({ key: c.payload.key, ...c.payload.val()}) )});


  }

  addStudent(){
  let prompt = this.alertCtrl.create({
    title: 'Add Student ',
    message: "Enter Name and Stream of Student",
    inputs: [
      {
        name: 's_name',
        placeholder: 'Name'
      },
      {
        name: 's_stream',
        placeholder: 'Stream'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {

          this.item.s_name = data.s_name;
          this.item.s_stream = data.s_stream;
          this.studentvalue.addItem(this.item).then(res=>{

            console.log("-----------------------"+res.key)
          })
          // this.student.push({
          //   s_name :data.s_name,s_stream :data.s_stream
          // });

        }
      }
    ]
  });
  prompt.present();
}

showOptions(item) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Student',
        role: 'destructive',
        handler: () => {
          this.removeStudent(item);
        }
      },{
        text: 'Update Student Detail',
        handler: () => {
          this.updateStudent(item);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeStudent(item){
  this.studentvalue.removeItem(item);
}


updateStudent(item){
  let prompt = this.alertCtrl.create({
    title: 'Student Name and stream',
    message: "Update the name and stream o fstudent",
    inputs: [
      {
        name: 's_name',
        placeholder: 'Name',
        value: item.s_name
      },
      {
        name: 's_stream',
        placeholder: 'Stream',
        value: item.s_stream
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.item.key = item.key;
          this.item.s_name = data.s_name;
          this.item.s_stream = data.s_stream;
          this.studentvalue.updateItem(this.item).then(res=>{
            console.log("--------------------------------"+res);
            
          })
        //   this.student.update(studname,{
        //     s_name: data.s_name,s_stream: data.s_stream
        //   });
         }
      }
    ]
  });
  prompt.present();
}



}
