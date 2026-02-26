import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info {
  @Input() okCount: number = 0;
  @Input() nokCount: number = 0;
  @Input() reworkCount: number = 0;
}
