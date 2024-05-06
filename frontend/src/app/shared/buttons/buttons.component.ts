import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input('colr')
  colr='W';
  @Input('name')
  name='';
  constructor(){

  }
ngOnInit():void{
  
}
}
