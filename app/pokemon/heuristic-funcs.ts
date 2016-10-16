import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';
import { Position } from '../maze/position';

function objEqual(obj1:any, obj2:any):boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function union(set1:number[], set2: number[]) {
    return set1.concat(set2.filter((el) => {
        return set1.indexOf(el) === -1;
    }));
}

export const Manhattan = (node:Node, information:any):void => {
    let cell:Cell = node.state.val['cell'];
    let x = cell.position.col;
    let y = cell.position.row;
    let endPoint = information.endPoint;
    let dx = Math.abs(x - endPoint.col);
    let dy = Math.abs(y - endPoint.row);
    node.estimateCost = dx + dy;
    if(information.type == 'AS')
        node.estimateCost += node.pathCost;
}

export const MST = (node:Node, information:any):void => {
    let currentPosition:Position = node.state.val['cell'].position;
    let pokePositions:Position[] = node.state.val['pokePositions'];
    let endPosition:Position = information.endPoint;
    let positionsArr:Position[] = [];
    let edges = [];
    let vertexSets = [];
    let totalCost = 0;

    positionsArr.push(currentPosition);
    positionsArr.push(endPosition);
    for(let i = 0; i < pokePositions.length; i++) {
        positionsArr.push(pokePositions[i]);
    }
    for(let i = 0; i < positionsArr.length; i++) {
        vertexSets.push([i]);
        for(let j = i + 1; j < positionsArr.length; j++) {
            let x1 = positionsArr[i].col;
            let x2 = positionsArr[j].col;
            let y1 = positionsArr[i].row;
            let y2 = positionsArr[j].row;
            let cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
            let edge = {
                u: i,
                v: j,
                cost: cost
            }
            edges.push(edge);
        }
    }

    edges.sort((a,b) => {
        return a.cost - b.cost;
    });


    for(let i = 0; i < edges.length; i++) {
        let u = edges[i].u;
        let v = edges[i].v;
        let cost = edges[i].cost;
        let setU = vertexSets[u];
        let setV = vertexSets[v];
        setU.sort();
        setV.sort();
        if(!objEqual(setU, setV)) {
            totalCost += cost;
            setU = union(setU, setV);
            for(let j = 0; j < setU.length; j++) {
                if(j != u) {
                    let vertex = setU[j];
                     vertexSets[vertex] = setU;
                }
            }
        }
    }

    node.estimateCost = totalCost;
    if(information.type == 'AS')
        node.estimateCost += node.pathCost;
}
