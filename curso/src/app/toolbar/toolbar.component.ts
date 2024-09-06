import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input('sidenavitem') sidenav?: MatSidenav;
  @Output() sidenavEvent = new EventEmitter();

  tellParentToOpenSidenav() {
    this.sidenavEvent.emit();
  }

}
