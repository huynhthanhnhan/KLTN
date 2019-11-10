import * as BABYLON from "@babylonjs/core"

import {gizmoManager, scene, hl} from './Enviroment'
import {PointActionManager} from './ActionManager'
import { getListLine, getPointByName } from "./TempVariable";
import { Line, CreateLine } from "./Line";

var indexPoint = 0;
export function getIndexPoint(){return indexPoint;}
export function setIndexPoint(index: number){indexPoint = index;}
export function getNewIndexPoint(){
    var temp =indexPoint;
    indexPoint++;
    return temp;
}
 
export var pointMaster = BABYLON.MeshBuilder.CreateSphere("point", { diameter: 0.1 }, scene);
    gizmoManager.attachableMeshes.push(pointMaster);
    pointMaster.position.y = 1000;
    var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
    pointMat.diffuseColor = BABYLON.Color3.Red();
    pointMaster.material = pointMat;

export class Point{
    name: string;
    position: BABYLON.Vector3;
    mesh: BABYLON.Mesh;
    linesName: string[];
    constructor(name, mesh){
        this.name = name;
        this.mesh = mesh;
        this.linesName = [];
    }
}
export function CreatePoint(position, name?: string) {
    if(name){
        const _point= new Point(name, pointMaster.clone(name));
        gizmoManager.attachableMeshes.push(_point.mesh);
        // p.isVisible = true;
        _point.mesh.position =position;
        PointActionManager(_point.mesh);
        indexPoint ++;
        return _point;
    }
    else{
        const _point= new Point("Point_"+indexPoint, pointMaster.clone("Point_"+indexPoint));
        gizmoManager.attachableMeshes.push(_point.mesh);
        // p.isVisible = true;
        _point.mesh.position = position;
        PointActionManager(_point.mesh);
        indexPoint ++;
        return _point;
    }
}
// export function triggerMovePoint(name: string){
//     var point = getPointByName(name);
//     if(point){
//         var listPoint: Point[] = [point];
//         listPoint.map(point=>{
//             point.linesName.map(linename=>{
//                 getListLine().forEach(line=>{
//                     if(line.name == linename){
//                         var point1, point2;
//                         if(line.pointA.name == point.name){
//                             point1 = point;
//                             point2 = line.pointB;
//                         }
//                         else{
//                             point1 = line.pointA;
//                             point2 = point;
//                         }
//                         scene.removeMesh(line.mesh.parent as BABYLON.Mesh);
//                         scene.removeMesh(line.mesh);
//                         var newLine = CreateLine(point1,point2);
//                         newLine.mesh.name = linename;
//                         line.mesh = newLine.mesh;
//                     }
//                 })
//             })
//         })
//         return true;
//     }
//     return false;
// }