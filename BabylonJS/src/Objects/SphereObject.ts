import * as BABYLON from "@babylonjs/core"
import { scene } from '../Enviroment'
import { CreateMeshMaterial } from '../MeshMaterial'

var index = 0;
export function CreateSphereDefault() {
    var sphere = BABYLON.Mesh.CreateSphere("sphere_" + index, 16, 2, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1, 1, 0));
    sphere.position.y = 1;
    index++;
    return sphere;
}

export function CreateSphereCustom(x: number, y: number, z: number, diameter: number) {
    var sphere = BABYLON.Mesh.CreateSphere("sphere_" + index, 16, diameter, scene);
    sphere.material = CreateMeshMaterial(new BABYLON.Color3(1, 1, 0));
    sphere.position = new BABYLON.Vector3(x, y, z);
    index++;
    return sphere;
}

export function CreateSphereFromPointAndPoint(center: BABYLON.Vector3, point: BABYLON.Vector3) {
    var diameter = BABYLON.Vector3.Distance(center, point) * 2;
    return CreateSphereCustom(center.x, center.y, center.z, diameter);
}