import { Component } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 /* declaration des varariables */
   display = '0'; /* la varibale de l'ecran de calculatrice */
   oldValue = '0'; /* declaration des varariables */
   lastOperator = 'x'; /* declaration des varariables */
   newEntry = true; /* la variable verifie si on peut entrer une nouvelle operande */
   Matrice = [ /* Tableau contenant l'ensemble des symboles de ma calculatrice */
                ['AC', '+/-', '%', '/'],
                [7, 8, 9, 'x'],
                [4, 5, 6, '-'],
                [1, 2, 3, '+'],
                [0, ' ', ',', '=']
              ];
/* la fonction calculatrice prends en parametre le symbole appuyé ;
*  teste si le symbole saisi est un entier ;dans ce si cest l'insertion d'une nouvelle operande
* il remplace display par sa valeur; sinon il concatene a l'ancienne valeur de display
* suivant le bouton AC ou +/- il fait l'action sur l'operande
* quand  j'appuie sur un operateur different de AC ,+/- et = , il met display dans la variable oldValue 
* et permet la saisie d'une nouvelle operande.Il met l'operateur dans lastOperateur
* A la saisie de = il effectue l'operation qui a lieu;
*/ 
  fonctionCalculatrice(symbole) {
   if (isNumber(symbole)) {
        if (this.newEntry) {
          this.display = '' + symbole;
        } else {
          this.display += '' + symbole;
        }
        this.newEntry = false;
    } else if (symbole === '+/-') {
        this.display = '' + (parseFloat(this.display ) * -1);
        this.newEntry = false;
    } else if (symbole === ',') {
      this.display = '' + parseFloat(this.display ) + '.';
      this.newEntry = false;
  } else if (symbole === 'AC') {
        this.display = '0';
        this.newEntry = true;
    } else if (symbole === '=') {
        if (this.lastOperator === 'x') { 
          this.display = '' + (parseFloat(this.oldValue) * parseFloat(this.display ));
         }  else if (this.lastOperator === '-') {
          this.display = '' + (parseFloat(this.oldValue) - parseFloat(this.display));
         } else if (this.lastOperator === '/') {
          this.display = '' + (parseFloat(this.oldValue) / parseFloat(this.display));
         } else if (this.lastOperator === '+') {
          this.display = '' + (parseFloat(this.oldValue) + parseFloat(this.display));
         } else if (this.lastOperator === '%') {
          this.display = '' + (parseFloat(this.oldValue) % parseFloat(this.display));
         }
        this.newEntry = true;
    } else { // operator
        this.newEntry = true;
        this.oldValue = this.display;
        this.lastOperator = symbole;
    }
  }
}
