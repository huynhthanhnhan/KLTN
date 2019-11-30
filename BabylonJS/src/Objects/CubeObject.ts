import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'
import { int } from "@babylonjs/core";

export function CreateCubeDefault()
{
    var cube = BABYLON.MeshBuilder.CreateBox("cube", {size: 2}, scene);
    cube.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0),scene);
    cube.position = new BABYLON.Vector3(0, 0, 10);
    return cube;
}

export function CreateCubeCustom(edge:int)
{
    var cube = BABYLON.MeshBuilder.CreateBox("cube", {size: edge}, scene);
    cube.position = new BABYLON.Vector3(0, 0, 10);
    return cube;
}