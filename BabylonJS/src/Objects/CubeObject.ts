import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

var index=0;
export function CreateCubeDefault()
{
    var cube = BABYLON.MeshBuilder.CreateBox("cube_"+index, {size: 2}, scene);
    cube.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    cube.position = new BABYLON.Vector3(0, 0, 0);
    index++;
    return cube;
}

export function CreateCubeCustom(x:number, y:number, z:number, edge:number )
{
    var cube = BABYLON.MeshBuilder.CreateBox("cube_"+index, {size: edge}, scene);
    cube.position = new BABYLON.Vector3(x, y, z);
    index++;
    return cube;
}