import * as BABYLON from "@babylonjs/core"

import { scene, hl, gizmoManager } from './Enviroment'
import { getListLine, getLineByName, addToListLine } from './TempVariable'
import { LineActionManager } from "./ActionManager";
import { CreatePoint, Point, getNewIndexPoint } from "./Point";

var indexLine = 0;

export class Line {
    name: string;
    length: number;
    pointA: Point;
    pointB: Point;
    mesh: BABYLON.Mesh;
    rotation: BABYLON.Vector3;
    constructor(name: string, pointA: Point, pointB: Point) {
        this.name = name;
        this.pointA = pointA;
        this.pointB = pointB;
    }
}

// export function CreateLine(point1: Point, point2: Point) {

//     var distance = BABYLON.Vector3.Distance(point1.mesh.position, point2.mesh.position);

//     if (distance > 0) {
//         var line = new Line("Line_" + indexLine, point1, point2);
//         line.length = distance;
//         var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
//         parentLine.lookAt(point2.mesh.position.subtract(BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position)));
//         parentLine.position = BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position);

//         var newLine = BABYLON.MeshBuilder.CreateCylinder("Line_" + indexLine, { height: distance, diameter: 0.05 }, scene);
//         // var newLine = BABYLON.MeshBuilder.CreateLines("Line_" + indexLine, { points: [point1.mesh.position, point2.mesh.position] }, scene);
//         // getListLine().forEach(line => {
//         //     if(line.mesh.intersectsMesh(newLine))
//         //         CreatePoint()
//         // })
//         // newLine.position = BABYLON.Vector3.Center(point1.mesh.position,point2.mesh.position);
//         LineActionManager(newLine);
//         newLine.parent = parentLine;
//         newLine.rotation.x = Math.PI / 2;
//         // console.log(newLine)
//         line.mesh = newLine;
//         line.rotation = newLine.rotation;
//         point1.linesName.push("Line_" + indexLine);
//         point2.linesName.push("Line_" + indexLine);
//         indexLine++;
//         gizmoManager.attachableMeshes.push(line.mesh);

//     }
//     return line;
// }
export function CreateLine(point1: Point, point2: Point) {

    var distance = BABYLON.Vector3.Distance(point1.mesh.position, point2.mesh.position);

    if (distance > 0) {
        var line = new Line("Line_" + indexLine, point1, point2);
        line.length = distance;
        // var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
        // parentLine.lookAt(point2.mesh.position.subtract(BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position)));
        // parentLine.position = BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position);

        // var newLine = BABYLON.MeshBuilder.CreateCylinder("Line_" + indexLine, { height: distance, diameter: 0.05 }, scene);
        var newLine = BABYLON.MeshBuilder.CreateTube("Line_" + indexLine, { path: [point1.mesh.position, point2.mesh.position],radius: 0.02,updatable: true }, scene);
        // getListLine().forEach(line => {
        //     if(line.mesh.intersectsMesh(newLine))
        //         CreatePoint()
        // })
        // newLine.position = BABYLON.Vector3.Center(point1.mesh.position,point2.mesh.position);
        LineActionManager(newLine);
        // newLine.parent = parentLine;
        // newLine.rotation.x = Math.PI / 2;
        // console.log(newLine)
        line.mesh = newLine;
        line.rotation = newLine.rotation;
        point1.linesName.push("Line_" + indexLine);
        point2.linesName.push("Line_" + indexLine);
        indexLine++;
        gizmoManager.attachableMeshes.push(line.mesh);
        var updateLine = function() {
            if(newLine) {
                newLine = BABYLON.MeshBuilder.CreateTube("Line_" + indexLine, {
                    path: [
                        point1.mesh.position,
                        point2.mesh.position
                    ],
                    instance: newLine
                });
            }
        }
        point1.mesh.onAfterWorldMatrixUpdateObservable.add(updateLine);
        point2.mesh.onAfterWorldMatrixUpdateObservable.add(updateLine);

    }
    return line;
}

export function CreateLineFromEquation(point: BABYLON.Vector3, vector: BABYLON.Vector3) { // ax + by + c = 0
    if (vector.x * vector.y * vector.z == 0){
        alert("Phương trình không hợp lệ");
        return;
    }
    var t = 10; //t thuoc R
    var point1 = CreatePoint(point,'Point_'+ getNewIndexPoint());
    var newPos = new BABYLON.Vector3(point.x + vector.x*t, point.y + vector.y*t, point.z + vector.z*t);
    var point2 = CreatePoint(newPos, 'Point_'+getNewIndexPoint());
    var line = CreateLine(point1,point2);
    addToListLine(line);
    // BABYLON.Vector3.inter

}

export function CheckIntersectLines(point1: BABYLON.Vector3, vector1: BABYLON.Vector3, point2: BABYLON.Vector3, vector2: BABYLON.Vector3){
    // t' =((y1 - y0) - (b/a)*(x1-x0))/((b/a)*u -v)
    // t =(x1+ ut' - x0)/ a
    var t2 = ((point2.y-point1.y)-(vector1.y/vector1.x)*(point2.x-point1.x))/((vector1.y-vector1.x)*vector2.x - vector2.y);
    var t1 = (point2.x + vector2.x*t2 - point1.x)/vector1.x;
    var x = point1.x + vector1.x*t1;
    var y = point1.y +vector1.y*t1;
    var z = point1.z + vector1.z*t1;
    return new BABYLON.Vector3(x,y,z);
}

// export function triggerMoveLine(name: string, delta: number | BABYLON.Vector3) {
//     var line = getLineByName(name);
//     console.log(delta)
//     if (line) {
//         if (typeof (delta) == 'number') {
//             line.pointA.mesh.position.y -= delta;
//             line.pointB.mesh.position.y -= delta;
//             triggerMovePoint(line.pointA.name);
//             triggerMovePoint(line.pointB.name);
//         }
//         else {
//             line.pointA.mesh.position = line.pointA.mesh.position.subtract(delta);
//             line.pointB.mesh.position = line.pointB.mesh.position.subtract(delta);
//             line.mesh.position = line.mesh.position.subtract(delta);
//             triggerMovePoint(line.pointA.name);
//             triggerMovePoint(line.pointB.name);
//         }
//         return true;
//     }
//     return false;

// }