import { Cell } from "./cell";
import { Position } from "./position";
import { Direction } from "../datastructures/direction";
// M rows and N cols
export class Maze {
  maze:Cell[][];
  start:Cell;
  end:Cell;
  steps:number;
  dir:Direction;


  genMaze(M,N) {
    console.log(`${M} ${N}`);
    this.maze=[];
    for( let i = 0; i < M; ++i) {
      this.maze[i] = [];
      for( let j = 0; j < N; ++j) {
        this.maze[i][j] = new Cell(new Position(i, j));
      }
    }
    let position = new Position(0, 0);
    let history = [position];
    while (history.length != 0) {
      let c = position.col;
      let r = position.row;
      let cell = this.maze[r][c];
      cell.isVisted = true;
      cell.isPokemons = (Math.random() > 0.7)? true : false ;
      let check = [];
      if( c > 0 && !this.maze[r][c - 1].isVisted) { check.push(Direction.Left)}
      if( r > 0 && !this.maze[r - 1][c].isVisted) { check.push(Direction.Up)}
      if( c < N - 1 && !this.maze[r][c + 1].isVisted) { check.push(Direction.Right)}
      if( r < M - 1 && !this.maze[r + 1][c].isVisted) { check.push(Direction.Down)}
      if( check.length !=0){
        const moveDirection = check[Math.floor(Math.random() * check.length)];
        if(moveDirection == Direction.Left){
          this.maze[r][c].isLeft = false;
          c -= 1;
          this.maze[r][c].isRight = false;
        }

        if(moveDirection == Direction.Up){
          this.maze[r][c].isUp = false;
          r -= 1;
          this.maze[r][c].isDown = false;
        }

        if(moveDirection == Direction.Right){
          this.maze[r][c].isRight = false;
          c += 1;
          this.maze[r][c].isLeft = false;
        }

        if(moveDirection == Direction.Down){
          this.maze[r][c].isDown = false;
          r += 1;
          this.maze[r][c].isUp = false;
        }
        position = new Position(r, c);

        history.push(position);

      } else {
        position = history.shift();
      }
    }
    const startI = Math.floor(Math.random() * (M - 1));
    const startJ = Math.floor(Math.random() * (N - 1));
    let endI = Math.floor(Math.random() * (M - 1));
    let endJ = Math.floor(Math.random() * (N - 1));
    while(startI == endI && startJ == endJ) {
      endI = Math.floor(Math.random() * (M - 1));
      endJ = Math.floor(Math.random() * (N - 1));
    }
    this.start = this.maze[startI][startJ];
    this.end = this.maze[endI][endJ]
    this.steps = Math.floor(Math.random() * 10) + 1;
    const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    this.dir = directions[Math.floor(Math.random() * 3)];
  }
}