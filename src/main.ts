/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/*
  =========================
  == ACCORDION IN FOOTER ==
  =========================
*/
const accordionBtn1 = document.querySelectorAll<HTMLImageElement>(".quastion-header img:nth-of-type(1)");
const accordionBtn2 = document.querySelectorAll<HTMLImageElement>(".quastion-header img:nth-of-type(2)");
const accordionList = document.querySelectorAll<HTMLElement>(".quastion .content");

for (let i = 0; i < accordionList.length; i++) {
  accordionBtn1[i].onclick = () => {
    accordionBtn1[i].style.display = "none";
    accordionBtn2[i].style.display = "inline";
    accordionList[i].classList.add("open");
  };
}

for (let i = 0; i < accordionList.length; i++) {
  accordionBtn2[i].onclick = () => {
    accordionBtn2[i].style.display = "none";
    accordionBtn1[i].style.display = "inline";
    accordionList[i].classList.remove("open");
  };
}
