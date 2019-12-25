import * as BABYLON from "@babylonjs/core"
import {gizmoManager, scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'


// export function CreateCubeMesh(center, size) {
//     var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: size }, scene);
//     cube.position = new BABYLON.Vector3(center.x, center.y, center.z);
//     gizmoManager.attachableMeshes.push(cube);
// }

// export function CreateBoxMesh(center, width, height, depth) {
//     var box = BABYLON.MeshBuilder.CreateBox("box", { width: width, height: height, depth: depth }, scene);
//     box.position = new BABYLON.Vector3(center.x, center.y, center.z);
//     gizmoManager.attachableMeshes.push(box);
// }
var index=0;
export function CreateBoxDefault()
{
    var box = BABYLON.MeshBuilder.CreateBox("box_" +index, {height: 2, width: 4}, scene);
    box.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    box.position.y = -2;
    gizmoManager.attachableMeshes.push(box);
    index++;
    return box;
}
export function CreateBoxCustom(x:number, y:number, z:number,height:number ,width:number, depth: number)
{
    var box = BABYLON.MeshBuilder.CreateBox("box_"+ index, {height: height, width: width, depth: depth}, scene);
    box.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    box.position = new BABYLON.Vector3(x, y, z);
    gizmoManager.attachableMeshes.push(box);
    index++;
    return box;
}
