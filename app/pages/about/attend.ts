import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';

@Component({
    templateUrl: 'build/pages/about/attend.html'
})
export class UserAttend {
    userAttendList;

    constructor(private navCtrl:NavController) {
        this.userAttendList = [];

        var userref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = userref.getAuth();
        if(authData){
            var bookref = new Wilddog("https://plant-book.wilddogio.com/books");
            bookref.orderByChild('fromuid').equalTo(authData.uid).on("value", (snapshot) => {
                snapshot.forEach((data) => {
                    console.log(data.key());
                    console.log(data.val());
                    this.userAttendList.push(data.val());
                });
            });
        }else{
            console.log('fail to get booklist');
        }
    }

    bookDetailClick(event, userAttend) {
        this.navCtrl.push(BookDetails, {book: userAttend});
    }
}
