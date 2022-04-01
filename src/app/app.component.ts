import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public nutzerauswahl: number;
  public zweiternutzerauswahl: number;
  private gewonnen: boolean = false;
  private unentschieden: boolean = false;
  public ergebnis: string;
  public gegnerwahl: string;
  public nutzerwahl: string;
  public spielmodus: number = 0;
  private playerselect: boolean = false;
  public spielertyp: string;
  public gewinner: string;
  public gesamtgewinner: string[] = [];
  public spieler1zaehler: number = 0;
  public spieler2zaehler: number = 0;
  private index: number = 0;
  public gewinneranzeige: string;

  auswahlfunktion(auswahl: number) {
    if (this.spielmodus == 1) {
      this.nutzerauswahl = auswahl;
      console.log(this.nutzerauswahl);
    }

    if (this.spielmodus == 2 && this.playerselect == true) {
      this.zweiternutzerauswahl = auswahl;
    }

    if (this.spielmodus == 2 && this.playerselect == false) {
      this.nutzerauswahl = auswahl;
    }
    this.playerselect = true;
  }

  setgamemode(gamemode: number) {
    if (gamemode == 1) {
      this.spielmodus = 1;
      this.spielertyp = 'Computer';
    } else {
      this.spielmodus = 2;
      this.spielertyp = 'Spieler 2';
    }
  }

  startspiel() {
    if (this.gewinneranzeige) {
      delete this.gewinneranzeige;
    }
    if (this.spielmodus == 1) {
      let zufallsnummer: number;
      zufallsnummer = this.getrandomnumber(3);
      this.spielfunktion(zufallsnummer);
    } else if (this.spielmodus == 2) {
      this.playerselect = false;
      this.spielfunktion(this.zweiternutzerauswahl);
    }
  }

  spielfunktion(gegnernummer: number) {
    if (this.nutzerauswahl == gegnernummer) {
      this.gewonnen = false;
      this.unentschieden = true;
      this.gewinner = 'Keiner';
    } else if (this.nutzerauswahl == 0 && gegnernummer == 1) {
      this.gewonnen = true;
      this.unentschieden = false;
      this.gewinner = 'Spieler1';
    } else if (this.nutzerauswahl == 0 && gegnernummer == 2) {
      this.gewonnen = false;
      this.unentschieden = false;
      this.gewinner = 'Spieler2';
    } else if (this.nutzerauswahl == 1 && gegnernummer == 0) {
      this.gewonnen = false;
      this.unentschieden = false;
      this.gewinner = 'Spieler2';
    } else if (this.nutzerauswahl == 1 && gegnernummer == 2) {
      this.gewonnen = true;
      this.unentschieden = false;
      this.gewinner = 'Spieler1';
    } else if (this.nutzerauswahl == 2 && gegnernummer == 0) {
      this.gewonnen = true;
      this.unentschieden = false;
      this.gewinner = 'Spieler1';
    } else if (this.nutzerauswahl == 2 && gegnernummer == 1) {
      this.gewonnen = false;
      this.unentschieden = false;
      this.gewinner = 'Spieler2';
    }

    if (this.spielmodus == 1 && this.gewinner == 'Spieler2') {
      this.gewinner = 'Computer';
    }

    this.gesamtgewinner.push(this.gewinner);

    if (this.gewonnen == true && this.unentschieden == false) {
      this.ergebnis = 'Gewonnen';
    }
    if (this.unentschieden == false && this.gewonnen == false) {
      this.ergebnis = 'Verloren';
    }
    if (this.unentschieden == true && this.gewonnen == false) {
      this.ergebnis = 'Unentschieden';
    }
    this.gewonnen = false;
    this.unentschieden = false;

    if (gegnernummer == 0) {
      this.gegnerwahl = 'Stein';
    } else if (gegnernummer == 1) {
      this.gegnerwahl = 'Schere';
    } else if (gegnernummer == 2) {
      this.gegnerwahl = 'Papier';
    }
    if (this.nutzerauswahl == 0) {
      this.nutzerwahl = 'Stein';
    } else if (this.nutzerauswahl == 1) {
      this.nutzerwahl = 'Schere';
    } else if (this.nutzerauswahl == 2) {
      this.nutzerwahl = 'Papier';
    }

    for (let i = this.index; i < this.gesamtgewinner.length; i++) {
      if (this.gesamtgewinner[i] == 'Spieler1') {
        this.spieler1zaehler++;
      } else if (this.gesamtgewinner[i] == 'Spieler2') {
        this.spieler2zaehler++;
      }
      this.index = this.gesamtgewinner.length;
    }
    if (this.spieler1zaehler == 3) {
      this.spieler1zaehler = 0;
      this.index = 0;
      this.gesamtgewinner = [];
      this.gewinneranzeige = 'Spieler 1';
    }
    if (this.spieler2zaehler == 3) {
      this.spieler2zaehler = 0;
      this.index = 0;
      this.gesamtgewinner = [];
      this.gewinneranzeige = 'Spieler 2';
    }
  }

  getrandomnumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  menu() {
    this.spielmodus = 0;
    delete this.nutzerwahl;
    this.nutzerauswahl = 5;
    delete this.gegnerwahl;
    delete this.gewinneranzeige;
    delete this.gewinner;
    delete this.ergebnis;
    this.playerselect = false;
  }
}
