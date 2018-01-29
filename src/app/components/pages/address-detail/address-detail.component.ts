import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { ExplorerService } from '../../../services/explorer/explorer.service';
import { Output, Transaction } from '../../../app.datatypes';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  address: string;
  balance: number;
  transactions: any[];

  constructor(
    private api: ApiService,
    private explorer: ExplorerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      return this.explorer.getTransactions(this.address);
    }).subscribe(transactions => this.transactions = transactions.sort((a, b) => b.timestamp - a.timestamp));

    this.route.params.switchMap((params: Params) => this.api.getCurrentBalance(params['address']))
      .subscribe(response => this.balance = response.head_outputs.reduce((a, b) => a + parseFloat(b.coins), 0));
  }

  openTransaction(transaction: Transaction) {
    this.router.navigate(['/app/transaction', transaction.id])
  }
  openAddress(output: Output) {
    this.router.navigate(['/app/address', output.address]);
  }
}
