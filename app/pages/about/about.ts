/// <reference path="../contact/wilddog.d.ts" />
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookDetails} from '../home/bookdetails';
import {BookEdit} from '../about/edit';
import {UserAttend} from '../about/attend';
import {UserBuild} from '../about/build';
import 'wilddog';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    userAttendList;
    userBuildList;

    constructor(private navCtrl:NavController) {

        this.userAttendList = [];
        this.listBook('fromuid',this.userAttendList);
        this.userBuildList = [];
        this.listBook('touid',this.userBuildList);
    }

    listBook(type,bookList){
        var userref = new Wilddog("https://plant-book.wilddogio.com");
        var authData = userref.getAuth();
        if(authData){
            var bookref = new Wilddog("https://plant-book.wilddogio.com/books");
            bookref.orderByChild(type).equalTo(authData.uid).limitToLast(3).on("value", (snapshot) => {
                snapshot.forEach((data) => {
                    console.log(data.key());
                    console.log(data.val());
                    bookList.push(data.val());
                });
            });
        }else{
            console.log('fail to get booklist')
        }


    }

    bookDetailClick(event, userAttend) {
        this.navCtrl.push(BookDetails, {book: userAttend});
    }

    userAttendMore(event) {
        this.navCtrl.push(UserAttend);
    }

    bookDetailEdit(event, userBuild) {
        this.navCtrl.push(BookEdit, {book: userBuild});
    }

    userBuildMore(event) {
        this.navCtrl.push(UserBuild);
    }
}
