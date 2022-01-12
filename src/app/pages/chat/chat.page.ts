import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messageText:any;
  
 userId:any;
 public messages: any = [];
   constructor(
     private afAuth: AngularFireAuth,private afDB:AngularFireDatabase) { 
       this.afAuth.authState.subscribe(auth => {
     if (!auth) {
       console.log('non connecté');
     } else {
       console.log('UserId: ' + auth.uid);
       
       this.userId = auth.uid;
       this.getMessages();
       
     }
   });
 }
  
 
   sendMessage() {
     console.log(this.messageText);
     this.afDB.list('Messages/').push({
       userId: this.userId,
       text: this.messageText,
       date: new Date().toISOString()
     });
     this.messageText = '';
   }


   getMessages() {
    this.afDB.list('Messages/', ref => ref.orderByChild('date')).snapshotChanges(['child_added'])
    .subscribe(actions => {
      this.messages = [];
      actions.forEach(action => {
        this.messages.push({
          userId: action.payload.exportVal().userId,
          text: action.payload.exportVal().text,
          date: action.payload.exportVal().date
        });
      });
    });
  }

  ngOnInit() {
  }


}
