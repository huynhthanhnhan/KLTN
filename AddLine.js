// import * as BABYLON from "./Lib/Babylon/babylon"
class Line {
    id;
    name;
    mesh;
    constructor(id, name, mesh) {
        this.id = id;
        this.name = name;
        this.mesh = mesh;
    }
}
// var a= new BABYLON.MeshBuilder.cre
// var s=new Line(1,"tseet",a);

export function CreateLine(point1, point2,scene,isCreatePointMode) {
    var distance = BABYLON.Vector3.Distance(point1, point2);
    if (distance > 0) {

        var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
        parentLine.lookAt(point2.subtract(BABYLON.Vector3.Center(point1, point2)));
        parentLine.position = new BABYLON.Vector3.Center(point1, point2);

        var newLine = BABYLON.MeshBuilder.CreateCylinder("line", { height: distance, diameter: 0.05 }, scene);
        newLine.parent = parentLine;
        newLine.rotation.x = Math.PI / 2;

        newLine.actionManager = new BABYLON.ActionManager(scene);
        newLine.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() {
                    if (isCreatePointMode)
                        hl.addMesh(newLine, BABYLON.Color3.Yellow());
                }
            )
        );
        newLine.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                function() {
                    if (isCreatePointMode)
                        hl.removeMesh(newLine);
                }
            )
        );
    }
}