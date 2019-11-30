import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'
import { int } from "@babylonjs/core";

export function CreatePyramidDefault()
{
    var polygon = BABYLON.MeshBuilder.CreateCylinder("pyramid", { diameterTop: 0, diameter: 8, height: 5, tessellation:4 }, scene);
    polygon.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    polygon.position.y=1;

    return polygon;
} 

export function CreatePyramidCustom(height:int,points:int)
{
    var polygon = BABYLON.MeshBuilder.CreateCylinder("pyramid", { diameterTop: 0, diameter: 8, height: height, tessellation: points }, scene);
     return polygon;
}