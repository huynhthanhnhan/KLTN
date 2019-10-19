import * as BABYLON from "@babylonjs/core"
import {gizmoManager, scene} from './Enviroment'


export function CreateCubeMesh(center, size) {
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: size }, scene);
    cube.position = new BABYLON.Vector3(center.x, center.y, center.z);
    gizmoManager.attachableMeshes.push(cube);
}

export function CreateBoxMesh(center, width, height, depth) {
    var box = BABYLON.MeshBuilder.CreateBox("box", { width: width, height: height, depth: depth }, scene);
    box.position = new BABYLON.Vector3(center.x, center.y, center.z);
    gizmoManager.attachableMeshes.push(box);
        // function CreateCubeWithCenterSize(center, size) {
        //     var p1 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y - size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p2 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y - size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p3 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y + size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p4 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y + size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p5 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y - size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p6 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y - size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p7 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y + size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        //     var p8 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y + size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        
        //     var l1 = CreateLine(p1.position, p2.position,scene);
        //     var l2 = CreateLine(p2.position, p3.position,scene);
        //     var l3 = CreateLine(p3.position, p4.position,scene);
        //     var l4 = CreateLine(p4.position, p1.position,scene);
        //     var l5 = CreateLine(p1.position, p5.position,scene);
        //     var l6 = CreateLine(p2.position, p6.position,scene);
        //     var l7 = CreateLine(p3.position, p7.position,scene);
        //     var l8 = CreateLine(p4.position, p8.position,scene);
        //     var l9 = CreateLine(p5.position, p6.position,scene);
        //     var l10 = CreateLine(p6.position, p7.position,scene);
        //     var l11 = CreateLine(p7.position, p8.position,scene);
        //     var l12 = CreateLine(p8.position, p5.position,scene);
        // }
}
export function CreateBoxDefault()
{
    var box1 = BABYLON.MeshBuilder.CreateBox("box1", {size: 2}, scene);
    box1.position = new BABYLON.Vector3(0, 0, 10);
    return box1;
}
// export function CreateBoxDefault()
// {
//     var box1 = BABYLON.MeshBuilder.CreateBox("box1", {size: 2}, scene);
//     box1.position = new BABYLON.Vector3(0, 0, 10);
//     return box1;
// }
// export function CreateBoxDefault()
// {
//     var box1 = BABYLON.MeshBuilder.CreateBox("box1", {size: 2}, scene);
//     box1.position = new BABYLON.Vector3(0, 0, 10);
//     return box1;
// }