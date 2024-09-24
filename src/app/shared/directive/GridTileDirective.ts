import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gridTile]',
  standalone: true,
})
export class GridTileDirective {
  private _colspan: number = 1;
  @Input() full = true;
  @Input() center = false;

  @Input('gridTile')
  set gridTile(value: string | number | '') {
    if (value === '' || value === undefined) {
      this._colspan = 1;
    } else if (value === '0' || value === 0) {
      this._colspan = 0;
    } else {
      const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
      this._colspan = isNaN(parsedValue) ? 1 : parsedValue;
    }
  }

  get colspan(): number {
    return this._colspan;
  }

  constructor(public template: TemplateRef<any>) {}
}
