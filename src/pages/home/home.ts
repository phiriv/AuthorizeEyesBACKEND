import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from "@ionic-native/file";

import { Camera, CameraOptions } from '@ionic-native/camera';
import * as tracking from 'tracking/build/tracking';
//node_modules/tracking/build/tracking.js    
import 'tracking/build/tracking';
//node_modules/tracking/build/data/face.js
import 'tracking/build/data/face';

declare var window: any;
declare var tracking: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  constructor(public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private file: File) { }


  ionViewDidLoad() {

    var tracker = new tracking.ObjectTracker('face');
    var img = new Image();

    img.width = 200;
    img.height = 200;

    img.crossOrigin = '*';


    img.onload = function () {


      tracker.setStepSize(1.7);
      var task = tracking.track(img, tracker);

      tracker.on('track', function (event) {

        event.data.forEach(function (rect) {

        });
        task.stop();
      });

    }
    img.src = 'assets/img/facetest.jpg';
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      sourceType: 1
    }
    this.camera.getPicture(options).then((imageData) => {
      let imgbase64 = 'data:image/jpeg;base64,' + imageData;

      let   option: FileUploadOptions = {
        fileKey: 'file',
        chunkedMode: true,
        mimeType: 'multipart/form-data',
        fileName: `mw${Math.random()}`
      };
      const fileTransfer: FileTransferObject = this.transfer.create();

      // Upload a file:
      fileTransfer.upload(imageData, "172.20.10.2:5000/oauth",option)
        .then(() => { console.log("sent") })
        .catch((e) => { console.log(e) });


    }, (err) => {
    });
  }
}
