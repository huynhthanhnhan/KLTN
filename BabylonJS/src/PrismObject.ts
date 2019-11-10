import * as BABYLON from "@babylonjs/core"
import {scene} from './Enviroment'
import {CreateMeshMaterial} from './MeshMaterial'

export function CreatePrismDefault()
{

    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: 6, size: 3}, scene);
    prism.material = CreateMeshMaterial(scene);
    prism.rotation.y=1;
    prism.rotation.x=-2;
    return prism;
}

export function CreatePrismCustom(size)
{
    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: 6, size: size}, scene);
    return prism;
}