import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

var index=0;
export function CreatePrismDefault()
{

    var prism = BABYLON.MeshBuilder.CreatePolyhedron("prism_"+index, {type: 6, size: 3}, scene);
    prism.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(prism,'mark');
    }
    prism.onAfterWorldMatrixUpdateObservable.add(rmTag);
    return prism;
}

export function CreatePrismCustom(x:number, y:number, z:number,point: number,size: number)
{
    var prism = BABYLON.MeshBuilder.CreateCylinder("prism_"+index, { diameter: 4, height: size, tessellation: point }, scene);
    prism.material = CreateMeshMaterial(new BABYLON.Color3(0.64, 0, 1));
    prism.position = new BABYLON.Vector3(x, y, z);
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(prism,'mark');
    }
    prism.onAfterWorldMatrixUpdateObservable.add(rmTag);
    return prism;
}
