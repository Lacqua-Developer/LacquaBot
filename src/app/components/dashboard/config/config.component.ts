import { UtilService } from '../../../services/util.service';
import { environment } from '../../../../environments/environment';
import { Config } from '../../../models/config';
import { ConfigService } from '../../../services/config.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConfigDataSource, ConfigItem } from './config-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface DialogData {
  url: string;
  sessionname: string;
}

@Component({
  selector: 'app-config-dialog-qrcode',
  templateUrl: 'config-dialog-qrcode.html',
})
export class ConfigDialogQRCode {
  constructor(
    public dialogRef: MatDialogRef<ConfigDialogQRCode>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements AfterViewInit, OnInit, OnChanges {
  constructor(private cs: ConfigService,
    public dialog: MatDialog,
    private util: UtilService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Config>;
  dataSource: ConfigDataSource;

  public NroSaida: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'name', 'Telefone', 'Status', 'Acoes'];

  selection = new SelectionModel<Config>(true, []);

  ngOnInit(): void {
    this.dataSource = new ConfigDataSource(this.cs,this.util);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  selectChangeHandler(event: any, item: any): void {
    this.util.debug('Selecionado:', event);
    this.util.debug(item);

    switch (event) {
      case '1':
        this.cs.AtivaChip(item).subscribe((y) => {
          this.util.debug('Retorno Chip', y);
        });
        break;
      case '2':
        break;
      case '3':
        this.openDialog(item);
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.util.debug('Nro Sessao', this.NroSaida);
  }

  openDialog(sessionName: string): void {
    const dialogRef = this.dialog.open(ConfigDialogQRCode, {
      width: '300px',
      data: {
        url: environment.servWhats + 'qrcode?sessionName=' + sessionName + '&image=true',
        sessionname: sessionName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.util.debug('The dialog was closed');
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Config): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.ID
    }`;
  }
}
