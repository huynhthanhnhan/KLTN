import * as BABYLON from "@babylonjs/core"
import {scene} from './Enviroment'
import {CreateMeshMaterial} from './MeshMaterial'

export function CreatePyramidDefault()
{
    var polygon = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 8, size: 3}, scene);
    polygon.material = CreateMeshMaterial(scene);
    polygon.rotation.x=4;
    polygon.rotation.z=0.1;
    return polygon;
}

export function CreatePyramidCustom(size)
{
    var polygon = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 8, size: size}, scene);
    return polygon;
}