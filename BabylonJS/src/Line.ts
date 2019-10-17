import * as BABYLON from "@babylonjs/core"

export function Line() {
    var name: any;
    var length: number;
    var pointA: BABYLON.Vector3;
    var pointB: BABYLON.Vector3;
    var mesh: BABYLON.Mesh;
    var rotation: BABYLON.Vector3;
}

export function CreateLine(point1, point2, scene, isCreatePointMode, hl) {
    var line = new Line();
    line.name = "Line";
    line.pointA = point1;
    line.pointB = point2;

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