import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

var index=0;
export function CreateSphereDefault()
{
    var sphere = BABYLON.Mesh.CreateSphere("sphere"+index, 16, 2, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    sphere.position.y = 1;
    index++;
    return sphere;
}

export function CreateSphereCustom(x:number, y:number, z:number,diameter:number)
{
    var sphere = BABYLON.Mesh.CreateSphere("sphere"+index, 16, diameter, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    sphere.position = new BABYLON.Vector3(x, y, z);
    index++;
    return sphere;
}