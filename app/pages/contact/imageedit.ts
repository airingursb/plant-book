/// <reference path="wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ImagePicker} from 'ionic-native';

@Component({
    templateUrl: 'build/pages/contact/imageedit.html'
})
export class imageEditPage {
    useruid;
    image;
    constructor(private navCtrl:NavController, private  params:NavParams) {
        this.image = '';
        this.useruid = params.data;

        var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.useruid);
        userref.child('image').once('value',nameSnapshot => {
            this.image = nameSnapshot.val();
            console.log(nameSnapshot.val());
        });

    }

    imagePicker(){
        ImagePicker.getPictures({maximumImagesCount: 1, width: 300, height: 200, quality: 100}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log("Image URI:" + results[i]);
                this.image = results[i];
            }
        }),(err) => {
            console.log('fail to upload image');
            console.log('err:' + err);
        }
    }

    imageUpload(){
        var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.useruid);
        userref.child('image').set(this.image);
        console.log(this.image);
    }

}