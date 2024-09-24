import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GridTileDirective } from '../../directive/GridTileDirective';
import { BreakpointService } from '../../service/breakpoint.service';

@Component({
  selector: 'shared-grid',
  templateUrl: './shared-grid.component.html',
  styleUrls: ['./shared-grid.component.scss'],
  standalone: true,
  imports: [CommonModule, GridTileDirective],
})
export class SharedGridComponent implements AfterContentInit {
  @Input() cols: number = 2;

  @ContentChildren(GridTileDirective) gridTiles!: QueryList<GridTileDirective>;
  breakpoint = inject(BreakpointService);
  cdr = inject(ChangeDetectorRef);

  gridContents: GridTileDirective[] = [];
  gridTemplateColumns: string = '';
  isDataLoaded: boolean = false;
  isSmall: boolean = false;

  private breakPointSubscription!: Subscription;

  constructor() {}

  ngAfterContentInit() {
    this.gridTiles.changes.subscribe(() => {
      this.initializeGridContents();
    });
    this.initializeGridContents();
  }

  ngOnDestroy() {
    if (this.breakPointSubscription) {
      this.breakPointSubscription.unsubscribe();
    }
  }

  private initializeGridContents() {
    if (this.gridTiles) {
      this.gridContents = this.gridTiles.toArray();
      this.setupResponsive();
      this.isDataLoaded = true;
      this.cdr.detectChanges();
    }
  }

  private setupResponsive() {
    if (this.breakPointSubscription) {
      this.breakPointSubscription.unsubscribe();
    }

    this.breakPointSubscription = this.breakpoint.currentScreenSize.subscribe(
      (data) => {
        const cols = data === 'XSmall' || data === 'Small' ? 1 : this.cols;

        this.isSmall = data === 'XSmall' || data === 'Small'; // Set isSmall based on screen size

        this.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        this.cdr.detectChanges(); // Trigger change detection to update the view
      }
    );
  }

  getGridColumn(title: GridTileDirective): string {
    if (!title.center) {
      if (title.colspan === undefined) {
        return 'auto / span 1';
      } else if (title.colspan == 0) {
        return '1 / -1';
      } else {
        return `auto / span ${title.colspan} `;
      }
    } else {
      return 'auto / span 1';
    }
  }
}
