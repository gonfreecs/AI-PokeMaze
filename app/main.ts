import { GenMaze } from './maze/gen-maze';
import { Cell} from "./maze/cell";
declare var Handlebars:any;

const gen = GenMaze(10, 30);
const pokeMaze = gen.maze;
console.log(pokeMaze);

// console.log(`start: (${gen.start.row}, ${gen.start.col}) end: (${gen.end.row}, ${gen.end.col}), steps: (${gen.steps})`);
console.log(`direction: ${gen.dir}`);
renderMazeView();

function renderMazeView() {
    let template:(param?:any) => any = Handlebars.templates['maze'];
    let host:HTMLElement = document.getElementById('maze');
    let data = {
        row: []
    };

    for(let i=0;i<pokeMaze.length;i++){
      let col = {col: pokeMaze[i]};
      data.row.push(col);
    }

    host.innerHTML = template(data);
}
