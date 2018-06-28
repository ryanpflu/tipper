import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

export interface ticketTableModel {
  label: string;
  exact: string;
  rounded: string;
  align?: string;
  muted?: boolean;
  bolded?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = "Lil' Tipper";
  ticketAmount: number;

  displayedColumns = ['label', 'exact','rounded'];
  orgTicketTable: ticketTableModel[] = [
          {label: 'Ticket Amount', exact: '$0', rounded: '$0'},
          {label: 'Tip Amount', exact: '$0', rounded: '$0'},
          {label: 'Tip %', exact: '0%', rounded: '0%', muted:true},
          {label: 'Total', exact: '$0', rounded: '$0', bolded:true, align:'right'},
  ];
  ticketTable = this.orgTicketTable;
  tipPercentage:number = 18;
  roundedPercentage:number = 0;
  selectedTab = 0;

  constructor() { }

  ngOnInit() {
  }
  calculateBtn(){
          this.selectedTab += 1;
          if (this.selectedTab >= 2) this.selectedTab = 0;
          this.updateTicketTable();
  }
  updateTicketAmount(ticketAmount: number){
        this.ticketAmount = Number(ticketAmount);
  }
  updateTipPercentage(tipPercentage: number){
        this.tipPercentage = Number(tipPercentage);
        this.updateTicketTable();
  }
  updateTicketTable(){

          let ticketAmount:number = 0;
          ticketAmount += Number(this.ticketAmount);
          let tAmount: string = ticketAmount.toFixed(2);

          if(ticketAmount == 0){
                  this.ticketTable = this.orgTicketTable;
                  return false;
          }

          // GET EXACT VALUES
          let tipPercent: number = Number(this.tipPercentage/100);
          let epTip: string = Number(tipPercent * 100).toFixed(2);
          let exactTip:number = this.ticketAmount * tipPercent;
          let eTip: string = exactTip.toFixed(2);

          let exactTotal: number = ticketAmount;
          exactTotal += exactTip;
          let eTotal: string = exactTotal.toFixed(2);

          // GET ROUNDED VALUES
          let roundedTotal: number = Math.ceil(exactTotal);
          let rTotal: string = roundedTotal.toFixed(2);

          let roundedTip: number = roundedTotal - ticketAmount;
          let rTip: string = roundedTip.toFixed(2);

          let roundedTipPercent: number = Number(roundedTip / ticketAmount);
          roundedTipPercent *= 100;
          console.log(roundedTip+' / '+roundedTotal);
          let rpTip: string = roundedTipPercent.toFixed(2);




          this.ticketTable = [
                  {label: 'Ticket Amount', exact: '$ '+tAmount, rounded: '$ '+tAmount},
                  {label: 'Tip Amount', exact: '$ '+eTip, rounded: '$ '+rTip},
                  {label: 'Tip %', exact: epTip+' %', rounded: rpTip+' %', muted:true},
                  {label: 'Total', exact: '$ '+eTotal, rounded: '$ '+rTotal, bolded:true, align:'right'},
          ];
  }


  resetTipper(){
        this.tipPercentage = 18;
        this.ticketAmount = null;
        this.ticketTable = this.orgTicketTable;
        this.selectedTab = 0;
  }

  onTabClick(event: MatTabChangeEvent) {
          this.selectedTab = event.index;
  }

}
