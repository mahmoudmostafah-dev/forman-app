import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface SvgModel {
  name: string;
  path: string;
}

export const svgIcons: SvgModel[] = [
  { name: 'icon1', path: '../assets/images/Program-1.svg' },
  { name: 'icon2', path: '../assets/images/Program-1-Dash.svg' }
];

export function registerSvgIcons(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
) {
  svgIcons.forEach((icon) => {
    matIconRegistry.addSvgIcon(
      icon.name,
      domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
    );
  });
}
