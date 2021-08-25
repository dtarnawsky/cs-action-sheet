import { Component } from '@angular/core';
import { ActionSheetController, createAnimation } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public actionSheetController: ActionSheetController) {


  }

  async presentActionSheet($event) {
    let x = $event.clientX - 200; // The 200 here is half the width of the action sheet
    let y = $event.clientY - 200; // The 200 here is half the height of the action sheet
    if (x < 0) { x = 0; }
    if (y < 0) { y = 0; }

    const enterAnim = (baseEl: any) => {
      const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector('.action-sheet-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: `translateX(${x}px) translateY(${y}px) scale(0.5)`, right: 'unset', bottom: 'unset' },
          { offset: 1, opacity: '0.99', transform: `translateX(${x}px) translateY(${y}px) scale(1)`, right: 'unset', bottom: 'unset' }
        ]);
      var el = baseEl.querySelector('.action-sheet-container');
      const containerAnimation = createAnimation()
        .addElement(el!)
        .keyframes([
          { offset: 0, justifyContent: 'unset' },
          { offset: 1, justifyContent: 'unset' }]);

      return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation, containerAnimation]);
    }

    const leaveAnim = (baseEl: any) => {
      const backdropAnimation = createAnimation()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', 'var(--backdrop-opacity)', '0.01');

      const wrapperAnimation = createAnimation()
        .addElement(baseEl.querySelector('.action-sheet-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0.99', transform: `translateX(${x}px) translateY(${y}px) scale(1)`, right: 'unset', bottom: 'unset' },
          { offset: 1, opacity: '0', transform: `translateX(${x}px) translateY(${y}px) scale(0.5)`, right: 'unset', bottom: 'unset' }
        ]);
      var el = baseEl.querySelector('.action-sheet-container');
      const containerAnimation = createAnimation()
        .addElement(el!)
        .keyframes([
          { offset: 0, justifyContent: 'unset' },
          { offset: 1, justifyContent: 'unset' }]);

      return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation, containerAnimation]);
    }


    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      enterAnimation: enterAnim,
      leaveAnimation: leaveAnim,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

}
