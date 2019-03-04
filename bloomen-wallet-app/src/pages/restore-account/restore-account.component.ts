import { Component, OnInit, OnDestroy } from '@angular/core';
import { Logger } from '@services/logger/logger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Web3Service } from '@services/web3/web3.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as fromDappSelectors from '@stores/dapp/dapp.selectors';
import * as fromMnemonic from '@stores/mnemonic/mnemonic.selectors';


import { Store } from '@ngrx/store';
import * as fromMnemonicActions from '@stores/mnemonic/mnemonic.actions';
import { Dapp } from '@core/models/dapp.model';


const log = new Logger('restore-account.component');


@Component({
  selector: 'blo-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.scss']
})
export class RestoreAccountComponent implements OnInit, OnDestroy {

  public restoreAccountForm: FormGroup;

  public address: string;

  private dapps$: Subscription;
  private mnemonics$: Subscription;

  public dapp: Dapp;

  public isCordova: boolean;

  public dappsWithMnemonics: any;
  private _selectedValue = '';

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    private location: Location,
    private web3Service: Web3Service,
    private router: Router
  ) { }

  public ngOnInit() {
    this.address = this.activatedRoute.snapshot.paramMap.get('address');

    this.dapps$ = this.store.select(fromDappSelectors.selectAllDapp).subscribe((dapps) => {
      this.dapp = dapps.find(dapp => dapp.address === this.address);
      this.mnemonics$ = this.store.select(fromMnemonic.selectAllMnemonics).subscribe((mnemonics: any) => {
        this.dappsWithMnemonics = dapps.map(dapp =>
            ({...mnemonics.find(mnemonic => mnemonic.address === dapp.address), ...dapp}))
            .filter(value => value.randomSeed);
      });
    });

    this.isCordova = !!window['cordova'];

    this.restoreAccountForm = new FormGroup({
      mnemonic: new FormControl('', Validators.required),
    });
  }

  get selectedValue(): string {
    return this._selectedValue;
  }

  set selectedValue(newValue: string) {
    this._selectedValue = newValue;
    this.restoreAccountForm.get('mnemonic').setValue(newValue);
  }

  public ngOnDestroy() {
    this.dapps$.unsubscribe();
    this.mnemonics$.unsubscribe();
  }

  public doBack() {
    this.location.back();
  }

  public onSubmit() {
    const randomSeed = this.restoreAccountForm.get('mnemonic').value;
    if (this.web3Service.validateMnemonic(randomSeed)) {
      this.store.dispatch(new fromMnemonicActions.AddMnemonic({ address: this.address, randomSeed }));
      this.router.navigate([`/dapp/${this.address}`]);
    } else {
      this.snackBar.open(this.translate.instant('common.invalid_mnemonic'), null, {
        duration: 2000,
      });
    }
  }

  public paste() {
    if (window['cordova']) {
      const clipboard = window['cordova']['plugins']['clipboard'];
      clipboard.paste((value) => {
        this.restoreAccountForm.get('mnemonic').setValue(value);
      });
    }
  }

  public hideKeyboard(event: Event) {
    if (window['cordova']) {
      event.stopPropagation();
    }
  }

}
