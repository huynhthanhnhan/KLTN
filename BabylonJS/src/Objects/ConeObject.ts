import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

export function CreateConeDefault()
{

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: 3, height: 3 }, scene);
    cone.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    cone.position.y=1;
    return cone;
}

export function CreateConeCustom(x:number, y:number, z:number,diameter: number, height:number)
{
    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: diameter, height: height }, scene);
    cone.position = new BABYLON.Vector3(x, y, z);
    return cone;
}