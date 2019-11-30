import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'
import { int } from "@babylonjs/core";

export function CreatePrismDefault()
{

    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: 6, size: 3}, scene);
    prism.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0),scene);
    prism.rotation.y=1;
    prism.rotation.x=-2;
    return prism;
}

export function CreatePrismCustom(point: int,size: int)
{
    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: point, size: size}, scene);
    return prism;
}