import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'
import { resetSphereVerticleList } from "../TempVariable";

var index=0;
export function CreatePyramidDefault()
{
    var polygon = BABYLON.MeshBuilder.CreateCylinder("pyramid_"+index, { diameterTop: 0, diameter: 8, height: 5, tessellation:4 }, scene);
    polygon.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    polygon.position.y=1;
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(polygon,'mark');
    }
    polygon.onAfterWorldMatrixUpdateObservable.add(rmTag);
    return polygon;
} 

export function CreatePyramidCustom(x:number, y:number, z:number,height:number,points:number)
{
    var polygon = BABYLON.MeshBuilder.CreateCylinder("pyramid_"+index, { diameterTop: 0, diameter: 8, height: height, tessellation: points }, scene);
    polygon.material = CreateMeshMaterial(new BABYLON.Color3(0.64, 0, 1));
    polygon.position = new BABYLON.Vector3(x, y, z);
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(polygon,'mark');
    }
    polygon.onAfterWorldMatrixUpdateObservable.add(rmTag);
     return polygon;
}