import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

export function CreatePrismDefault()
{

    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: 6, size: 3}, scene);
    prism.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    prism.rotation.y=1;
    prism.rotation.x=-2;
    return prism;
}

export function CreatePrismCustom(x:number, y:number, z:number,point: number,size: number)
{
    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism", {type: point, size: size}, scene);
    prism.position = new BABYLON.Vector3(x, y, z);
    return prism;
}
