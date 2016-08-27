import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';

@Component({
    templateUrl: 'build/pages/about/attend.html'
})
export class UserAttend {
    userAttendList;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private navParams:NavParams) {
        this.userAttendList = navParams.data.book;
    }

    bookDetailClick(event, userAttend) {
        this.navCtrl.push(BookDetails, {book: userAttend});
    }
}
