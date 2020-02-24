import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() sidebarToggled = new EventEmitter();
  @Input() opened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarToggled.emit('sidebarToggled');
  }

}
