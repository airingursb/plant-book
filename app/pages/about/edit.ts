import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/about/edit.html'
})
export class BookEdit {
    bookList;

    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private navParams:NavParams) {
        this.bookList = navParams.data.book;
    }
}
