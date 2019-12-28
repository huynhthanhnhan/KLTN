import * as BABYLON from "@babylonjs/core"
import {gizmoManager, scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

var index=0;
export function CreateBoxDefault()
{
    var box = BABYLON.MeshBuilder.CreateBox("box_" +index, {height: 2, width: 4}, scene);
    box.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    gizmoManager.attachableMeshes.push(box);
    index++;
    return box;
}
export function CreateBoxCustom(x:number, y:number, z:number,height:number ,width:number, depth: number)
{
    var box = BABYLON.MeshBuilder.CreateBox("box_"+ index, {height: height, width: width, depth: depth}, scene);
    box.material = CreateMeshMaterial(new BABYLON.Color3(0.64, 0, 1));
    box.position = new BABYLON.Vector3(x, y, z);
    gizmoManager.attachableMeshes.push(box);
    index++;
    return box;
}
