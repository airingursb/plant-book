/// <reference path="wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {File, ImagePicker, Transfer} from 'ionic-native';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/contact/imageedit.html'
})
export class imageEditPage {
    private uid:string;
    private image:string;

    constructor(private navCtrl:NavController, private  params:NavParams, private http:Http) {
        this.image = '';
        this.uid = params.data;

        var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.uid);
        userref.child('image').once('value', nameSnapshot => {
            this.image = nameSnapshot.val();
            console.log(nameSnapshot.val());
        });

    }

    imagePicker() {
        ImagePicker.getPictures({maximumImagesCount: 1, width: 300, height: 200, quality: 100}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log("Image URI:" + results[i]);
                this.image = results[i];
            }
        }), (err) => {
            console.log('fail to pick image');
            console.log('err:' + err);
        }
    }

    imageUpload() {

        const fileTransfer = new Transfer();
        var options:any;
        var cordova:any;
        var file:any;

        File.readAsDataURL(this.image).then((data)=> {
            console.log('readAsDataURL:' + data);
            file = data;

            setTimeout(()=>{
                options = {
                    fileKey: 'file',
                    fileName: 'image.jpg',
                    params: {smfile: file}
                }

                // console.log('file => ')
                // console.log(file)
                console.log('this.image => ')
                console.log(this.image)
                // console.log('this.params.smfile => ')
                // console.log(options.params.smfile)
                // fileTransfer.upload(this.image, encodeURI("https://sm.ms/api/upload"), options).then(
                //     (data) => {
                //         // success
                //         console.log(data);
                //         console.log("200");
                //     }, (err) => {
                //         // error
                //         console.log("500");
                //     })
                var body = 'Content-Disposition: form-data; name="smfile"; filename="ursb.jpg" \n' +
                    'Content-Type: image/jpeg \n\n' +
                    options.params.smfile
                this.http.post("https://sm.ms/api/upload",body).subscribe(data =>{
                    console.log("200 => " + data.json().code);
                    console.log("200 => " + data.json().msg);
                }, err => {
                    console.log("500 => " + err);
                })
            },3000)



        }, (err)=> {
            console.log('err:' + err);
        });


        // this.http.get("https://sm.ms/api/upload?smfile=" + this.image)
        //     .subscribe(data => {
        //         console.log(data.json());
        //         console.log("200");
        //     }, error => {
        //         console.log("500");
        //     });

        // var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.uid);
        // userref.child('image').set(this.image);
        // console.log(this.image);
    }

}