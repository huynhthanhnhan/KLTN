import * as BABYLON from "@babylonjs/core"

import { scene, hl, gizmoManager } from './Enviroment'
import { getListLine, getLineByName, addToListLine } from './TempVariable'
import { LineActionManager } from "./ActionManager";
import { Point, getNewIndexPoint } from "./Point";
import { CreateMeshMaterial } from "./MeshMaterial";

var indexLine = 0;

export class Line {
    name: string;
    length: number;
    pointA: Point;
    pointB: Point;
    mesh: BABYLON.Mesh;
    rotation: BABYLON.Vector3;
    // constructor(name: string, pointA: Point, pointB: Point) {
    constructor(var1, var2, type: '2point' | 'point-vector' | 'pos-pos', name?: string) {
        if (name)
            this.name = name;
        else {
            this.name = "Line_" + indexLine;
            indexLine++;
        }
        if (var2.x && var1.x) {
            if (type == 'point-vector') {
                var result = CreateLineFromEquation(var1, var2, this.name);
                this.mesh = result.line;
                this.pointA = result.point1;
                this.pointB = result.point2;
                addToListLine(this);
            }
            if (type == 'pos-pos') {
                var result2 = CreateLineFrom2Point(var1, var2, this.name);
                this.mesh = result2.line;
                this.pointA = result2.p1;
                this.pointB = result2.p2;
                addToListLine(this);
            }
        }
        else {
            var result1 = CreateLine(var1, var2, this.name);
            this.mesh = result1.newLine;
            this.pointA = result1.point1;
            this.pointB = result1.point2;
            addToListLine(this);
        }
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
function CreateLine(point1: Point, point2: Point, name: string) {

    var distance = BABYLON.Vector3.Distance(point1.mesh.position, point2.mesh.position);

    if (distance > 0) {
        // var line = new Line(, point1, point2);
        // line.length = distance;
        // var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
        // parentLine.lookAt(point2.mesh.position.subtract(BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position)));
        // parentLine.position = BABYLON.Vector3.Center(point1.mesh.position, point2.mesh.position);

        // var newLine = BABYLON.MeshBuilder.CreateCylinder("Line_" + indexLine, { height: distance, diameter: 0.05 }, scene);
        var newLine = BABYLON.MeshBuilder.CreateTube(name, { path: [point1.mesh.position, point2.mesh.position], radius: 0.02, updatable: true }, scene);
        // getListLine().forEach(line => {
        //     if(line.mesh.intersectsMesh(newLine))
        //         CreatePoint()
        // })
        // newLine.position = BABYLON.Vector3.Center(point1.mesh.position,point2.mesh.position);
        newLine.material = CreateMeshMaterial(new BABYLON.Color3(1, 1, 1))
        LineActionManager(newLine);
        // newLine.parent = parentLine;
        // newLine.rotation.x = Math.PI / 2;
        // console.log(newLine)
        // line.mesh = newLine;
        // line.rotation = newLine.rotation;
        point1.linesName.push("Line_" + indexLine);
        point2.linesName.push("Line_" + indexLine);
        newLine.scaling.z = 2;

        // indexLine++;
        // gizmoManager.attachableMeshes.push(newLine);
        var updateLine = function () {
            if (newLine) {
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
        return { newLine, point1, point2 };
    }
}

function CreateLineFromEquation(point: BABYLON.Vector3, vector: BABYLON.Vector3, name: string) { // ax + by + c = 0
    if (vector.x * vector.y * vector.z == 0) {
        alert("Phương trình không hợp lệ");
        return;
    }
    var t = 10; //t thuoc R
    var point1 = new Point(point, 'Point_' + getNewIndexPoint());
    var newPos = new BABYLON.Vector3(point.x + vector.x * t, point.y + vector.y * t, point.z + vector.z * t);
    var point2 = new Point(newPos, 'Point_' + getNewIndexPoint());
    var result = CreateLine(point1, point2, name);
    var line = result.newLine;
    // addToListLine(line);
    return { line, point1, point2 };

    // BABYLON.Vector3.inter

}
function CreateLineFrom2Point(point1: BABYLON.Vector3, point2: BABYLON.Vector3, name: string) {
    var p1 = new Point(point1, 'Point_' + getNewIndexPoint());
    var p2 = new Point(point2, 'Point_' + getNewIndexPoint());
    var result = CreateLine(p1, p2, name);
    var line = result.newLine;
    // addToListLine(line);
    return { line, p1, p2 };
}

export function CheckIntersectLines(point1: BABYLON.Vector3, vector1: BABYLON.Vector3, point2: BABYLON.Vector3, vector2: BABYLON.Vector3) {
    // t' =((y1 - y0) - (b/a)*(x1-x0))/((b/a)*u -v)
    // t =(x1+ ut' - x0)/ a
    var t2 = ((point2.y - point1.y) - (vector1.y / vector1.x) * (point2.x - point1.x)) / ((vector1.y - vector1.x) * vector2.x - vector2.y);
    var t1 = (point2.x + vector2.x * t2 - point1.x) / vector1.x;
    var x = point1.x + vector1.x * t1;
    var y = point1.y + vector1.y * t1;
    var z = point1.z + vector1.z * t1;
    return new BABYLON.Vector3(x, y, z);
}
