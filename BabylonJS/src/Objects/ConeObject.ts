import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

export function CreateConeDefault()
{

    var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: 3, height: 3, tessellation: 6 }, scene);
    cone.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0),scene);
    cone.position.y=1;
    return cone;
}

// export function CreateConeCustom(size)
// {
//     var cone = BABYLON.MeshBuilder.CreateCylinder("cone", { diameterTop: 0, diameter: 10, height: 10, tessellation: 6 }, scene);
//     return cone;
// }