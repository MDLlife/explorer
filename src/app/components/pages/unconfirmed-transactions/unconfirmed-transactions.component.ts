import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output, UnconfirmedTransaction } from '../../../app.datatypes';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss']
})
export class UnconfirmedTransactionsComponent implements OnInit {

  transactions: UnconfirmedTransaction[];
  leastRecent: number;
  mostRecent: number;

  constructor(
    private explorer: ExplorerService,
    private router: Router
  ) {
    this.transactions = null;
  }

  ngOnInit() {
    this.explorer.getUnconfirmedTransactions().subscribe(transactions => {
      this.transactions = transactions;
      if (transactions.length > 0) {
        let orderedList = transactions.sort((a, b) => b.timestamp - a.timestamp);
        this.mostRecent = orderedList[0].timestamp;
        this.leastRecent = orderedList[orderedList.length-1].timestamp;
      }
    });
  }

  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }

  openTransaction(transaction: UnconfirmedTransaction) {
    this.router.navigate(['/app/transaction', transaction.id])
  }
}
