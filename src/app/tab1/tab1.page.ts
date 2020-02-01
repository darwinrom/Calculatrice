import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
 /* initialisation des varariables */

display = 0;
memory = 0;
state = 'number';
operator = '+';
decimal = false;
decimals = 0;

/* la function clickNumber  prends en paramettre un nombre n */

clickNumber(n: number) {
  switch (this.state) { 
    /*
     pour chaque nombre : on vérifie si c'est un nombre decimal .
       si oui on incrémente decimals et on retourne display + le nombre * la puissance
       dont la base est 10 et l'exposant est le décimal incrémenté.  
       sinon on retourne display * 10 +le nombre
     */   
    case 'number':
      if (this.decimal) { 
        this.decimals++;
        this.display = this.display + n * Math.pow(10, -this.decimals);
      } else {
        this.display = this.display * 10 + n;
      }
      break;
      /*
      pour les operateur ,display prend le nombre
      */
    case 'operator':
      this.display = n;
      this.state = 'number';
      break;
      /*
      pour l' operateur =
      */
    case 'result':
      this.memory = 0;
      this.display = n;
      this.state = 'number';
  }
}

// Effectue cette operation au click
clickOperator(o: string) {
 
  this.calculate();
  this.operator = o;
  this.memory = this.display;
  this.state = 'operator';

}

// fais le calcul suivant l'operateur et les enregistrement dans la memoire
calculate() {
  this.display = eval('' + this.memory + this.operator + '(' + this.display + ')');
  this.memory = 0;
  this.state = 'result';
  this.operator = '+';
  this.decimal = false;
  this.decimals = 0;
 
}
// reinitialisation des variables
reset() {
  this.display = 0;
  this.memory = 0;
  this.state = 'number';
  this.operator = '+';
  this.decimal = false;
  this.decimals = 0;
}
// signe contraire de display
changeSign() {
  this.display = this.display * -1;
}

// modification en decimal
setDecimal() {
  this.decimal = true;
}
}
