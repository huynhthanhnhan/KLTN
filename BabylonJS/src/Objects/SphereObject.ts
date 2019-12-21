import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

export function CreateSphereDefault()
{
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    sphere.position.y = 1;
    return sphere;
}

export function CreateSphereCustom(x:number, y:number, z:number,diameter:number)
{
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, diameter, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    sphere.position = new BABYLON.Vector3(x, y, z);
    return sphere;
}