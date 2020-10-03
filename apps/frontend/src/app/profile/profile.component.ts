import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/api/user.service';

@Component({
  selector: 'dvfu-delivery-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
