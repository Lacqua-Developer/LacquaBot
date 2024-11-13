import { UtilService } from '../../../services/util.service'
import { environment } from './../../../../environments/environment';
import { ConfigService } from '../../../services/config.service';
import { Config } from '../../../models/config';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import sessionwhats from 'src/app/models/sessionwhats';

// TODO: Replace this with your own data model type
export interface ConfigItem {
  name: string;
  id: number;
  numero?: string;
  status?: string;
}



/**
 * Data source for the Config view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ConfigDataSource extends DataSource<Config> {

  data: Config[] ;
  datasessoes: sessionwhats[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private cs: ConfigService, private util: UtilService) {
    super();
    cs.RetConfig.subscribe(x => this.data = x);
    util.debug( environment);
    cs.SessoesWhats().subscribe(x => {
      this.datasessoes = x;
      this.data.forEach(k => {
        for ( let i = 0 ; i < this.datasessoes.length ; i++){
           // tslint:disable-next-line: triple-equals
           if ( k.Apelido == this.datasessoes[i].name )
           {
            k.StatusConeccao =   k.Apelido == this.datasessoes[i].name ?
                                  true :
                                  false;
            k.StatusChip = this.datasessoes[i].name + ' - ' +
                            this.datasessoes[i].state + ' - ' +
                            this.datasessoes[i].status;
           }
        }
      });
    } );


  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Config[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Config[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Config[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.Apelido, b.Apelido, isAsc);
        case 'id': return compare(+a.ID, +b.ID, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
