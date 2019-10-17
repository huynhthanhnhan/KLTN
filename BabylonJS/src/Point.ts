import * as BABYLON from "@babylonjs/core"

import {gizmoManager, scene, hl} from './Enviroment'
 
export var pointMaster = BABYLON.MeshBuilder.CreateSphere("point", { diameter: 0.2 }, scene);
    gizmoManager.attachableMeshes.push(pointMaster);
    pointMaster.position.y = 1000;
    var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
    pointMat.diffuseColor = BABYLON.Color3.Red();
    pointMaster.material = pointMat;

export class Point{
    name: string;
    position: BABYLON.Vector3;
    mesh: BABYLON.Mesh;
    constructor(name, position, mesh){
        this.name = name;
        this.position = position;
        this.mesh = mesh;
    }
}
export function CreatePoint(position,isSelectMode,checkInSelectedMeshes) {
    const _point= new Point("point", position, pointMaster.clone("point"));
    gizmoManager.attachableMeshes.push(_point.mesh);
    // p.isVisible = true;
    _point.mesh.position = _point.position;
    _point.mesh.actionManager = new BABYLON.ActionManager(scene);
    _point.mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function() {
                if (isSelectMode && !checkInSelectedMeshes(_point.mesh)) {
                    if (hl.hasMesh(_point.mesh)) hl.removeMesh(_point.mesh);
                    hl.addMesh(_point.mesh, BABYLON.Color3.Yellow());
                }
            }
        )
    );
    _point.mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function() {
                if (isSelectMode && hl.hasMesh(_point.mesh)) {
                    if (!checkInSelectedMeshes(_point.mesh))
                        hl.removeMesh(_point.mesh);
                    // else
                    //     setTimeout(function() {
                    //         hl.removeMesh(p);
                    //         removeFromSelectedMeshes(p);
                    //     }, 20000);

                }
            }
        )
    );
    return _point;
}