import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {BookEdit} from '../about/edit';

@Component({
    templateUrl: 'build/pages/about/build.html'
})
export class UserBuild {
    userBuildList;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private navParams:NavParams) {
        this.userBuildList = navParams.data.book;
    }

    bookDetailEdit(event, userBuild) {
        this.navCtrl.push(BookEdit, {book: userBuild});
    }
}
