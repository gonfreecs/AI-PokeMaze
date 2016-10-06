import { Position } from "./position";
export class Cell {
  isVisted:boolean;
  isRight:boolean;
  isLeft:boolean;
  isUp:boolean;
  isDown:boolean;
  isPokemons:boolean;
  pokemonNumber: number;
  position: Position;

  constructor(pos){
    this.isRight = true;
    this.isLeft = true;
    this.isUp = true;
    this.isDown = true;
    this.isVisted = false;
    this.isPokemons = false;
    this.pokemonNumber = Math.floor(Math.random() * 151) + 1;
    this.position = pos;
  }
  print(){
    return `rightwall: ${this.isRight}, leftwall: ${this.isLeft}, upperwall: ${this.isUp}, downwall: ${this.isDown}, number: ${this.pokemonNumber}`
  }

}