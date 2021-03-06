// Basic
import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { from, Observable } from 'rxjs';

// Services
import { StorageService } from '@services/storage/storage.service';


// Config
import { dappConfig } from '@config/dapp.db.config';
import { DappCache } from '@core/models/dapp.model';

/**
 * Application data database service to access to the persistance data.
 */
@Injectable({ providedIn: 'root' })
export class DappDatabaseService {

  /**
   * Application data database instance
   */
  private dappDatabase: NgForage;

  /**
   * Constructor where we import all needed in the service.
   * @param storageService instance of the storage general service.
   */
  constructor(private storageService: StorageService) {
    this.dappDatabase = this.storageService.create(dappConfig.databaseConfig);
  }

  /**
   * Method to get an application data stored inside database.
   * @param key Primary key to get the value inside the database.
   */
  public get(key: string): Observable<DappCache> {
    return from(this.storageService.get(this.dappDatabase, dappConfig.encryption, key));
  }

  /**
   * Method to set an application data inside database.
   * @param key Primary key to be stored inside the database.
   * @param value Value to be stored inside the database
   */
  public set(key: string, value: DappCache): Observable<DappCache> {
    return from(this.storageService.set(this.dappDatabase, dappConfig.encryption, key, value));
  }

  /**
   * Delete the application data of the key provided by parameter.
   * @param key Primary key to delete the value.
   */
  public remove(key: string): Observable<void> {
    return from(this.storageService.remove(this.dappDatabase, key));
  }

  /**
   * Get all dapp
   */
  public getAll(): Observable<DappCache[]> {
    return from(this.storageService.getAll(this.dappDatabase, dappConfig.encryption));
  }

  /**
   * Get all dapp addresses
   */
  public getAllAddresses(): Observable<string[]> {
    return from(this.dappDatabase.keys());
  }
}
