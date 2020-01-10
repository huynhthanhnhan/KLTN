import * as BABYLON from "@babylonjs/core"

import { gizmoManager, scene, hl } from './Enviroment'
import { PointActionManager } from './ActionManager'
import {  addToListPoint } from "./TempVariable";

var indexPoint = 1;
export function getIndexPoint() { return indexPoint; }
export function setIndexPoint(index: number) { indexPoint = index; }
export function getNewIndexPoint() {
    var temp = indexPoint;
    indexPoint++;
    return temp;
}

export var pointMaster = BABYLON.MeshBuilder.CreateSphere("Point_0", { diameter: 0.1 }, scene);
gizmoManager.attachableMeshes.push(pointMaster);
pointMaster.position.y = 1000;
var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
pointMat.diffuseColor = BABYLON.Color3.Red();
pointMaster.material = pointMat;

export class Point {
    name: string;
    position: BABYLON.Vector3;
    mesh: BABYLON.Mesh;
    linesName: string[];
    constructor(position: BABYLON.Vector3, name?: string) {
        if (name)
            this.name = name;
        else
            this.name = "Point_" + getNewIndexPoint();
        console.log(this.name)
        this.position = position;
        var mesh = CreatePoint(position, name);
        this.mesh = mesh;
        this.linesName = [];
        addToListPoint(this);
    }
}
function CreatePoint(position, name) {
    const mesh = pointMaster.clone(name);
    gizmoManager.attachableMeshes.push(mesh);
    // p.isVisible = true;
    mesh.position = position;
    PointActionManager(mesh);
    return mesh;
}