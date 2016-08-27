/// <reference path="../contact/wilddog.d.ts" />
import 'wilddog';
import {Component, isDevMode} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/discuss.html'
})

export class Discuss {

    private uid:string;
    private bid:string;
    private usercommend:string = "";

    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private navParams:NavParams) {

        this.bid = navParams.data;

        var dataref = new Wilddog('https://plant-book.wilddogio.com');
        var authData = dataref.getAuth();

        if (authData) {
            this.uid = authData.uid;
        } else {

        }

    }

    comment() {
        var ref = new Wilddog('https://plant-book.wilddogio.com/comments/' + this.uuid());
        var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.uid);
        userref.once('value', nameSnapshot => {
            var val = nameSnapshot.val();
            ref.child('fromusername').set(val.username);
            //ref.child('fromuserimage').set(val.image);
        });
        ref.child('fromuid').set(this.uid);
        ref.child('text').set(this.usercommend);
        ref.child('bid').set(this.bid);

    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * 随机生成id
     * @returns {string}
     */
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

}