import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'
import { int } from "@babylonjs/core";

export function CreateConeDefault()
{

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: 3, height: 3 }, scene);
    cone.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0),scene);
    cone.position.y=1;
    return cone;
}

export function CreateConeCustom(diameter: int, height:int)
{
    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: diameter, height: height }, scene);
    return cone;
}