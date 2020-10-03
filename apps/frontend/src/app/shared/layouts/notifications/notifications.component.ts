import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'dvfu-delivery-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<NotificationsComponent>) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }
}
