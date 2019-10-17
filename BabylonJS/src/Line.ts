import * as BABYLON from "@babylonjs/core"

import {scene, hl} from './Enviroment'

export class Line{
    name: string;
    length: number;
    pointA: BABYLON.Vector3;
    pointB: BABYLON.Vector3;
    mesh: BABYLON.Mesh;
    rotation: BABYLON.Vector3;
    constructor(name, pointA, pointB){
        this.name = name;
        this.pointA =pointA;
        this.pointB = pointB;
    }
}

export function CreateLine(point1, point2, isCreatePointMode) {
    var line = new Line("Line", point1, point2);

    var distance = BABYLON.Vector3.Distance(point1, point2);

    if (distance > 0) {
        line.length = distance;
        var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
        parentLine.lookAt(point2.subtract(BABYLON.Vector3.Center(point1, point2)));
        parentLine.position = BABYLON.Vector3.Center(point1, point2);

        var newLine = BABYLON.MeshBuilder.CreateCylinder("line", { height: distance, diameter: 0.05 }, scene);
        newLine.parent = parentLine;
        newLine.rotation.x = Math.PI / 2;
        line.mesh = newLine;

        newLine.actionManager = new BABYLON.ActionManager(scene);
        newLine.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function () {
                    if (isCreatePointMode)
                        hl.addMesh(newLine, BABYLON.Color3.Yellow());
                }
            )
        );
        newLine.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                function () {
                    if (isCreatePointMode)
                        hl.removeMesh(newLine);
                }
            )
        );

    }
    return line;
}