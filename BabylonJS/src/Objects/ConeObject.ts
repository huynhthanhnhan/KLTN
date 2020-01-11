import * as BABYLON from "@babylonjs/core"
import {scene} from '../Enviroment'
import {CreateMeshMaterial} from '../MeshMaterial'

var index=0;
export function CreateConeDefault()
{
    var cone = BABYLON.MeshBuilder.CreateCylinder("cone_" + index, { diameterTop: 0, diameter: 3, height: 3 }, scene);
    cone.material = CreateMeshMaterial(new BABYLON.Color3(1,1,0));
    cone.position.y=1;
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(cone,'mark');
    }
    cone.onAfterWorldMatrixUpdateObservable.add(rmTag);
    return cone;
}

export function CreateConeCustom(x:number, y:number, z:number,diameter: number, height:number)
{
    var cone = BABYLON.MeshBuilder.CreateCylinder("cone_"+index, { diameterTop: 0, diameter: diameter, height: height }, scene);
    cone.material = CreateMeshMaterial(new BABYLON.Color3(0.64, 0, 1));
    cone.position = new BABYLON.Vector3(x, y, z);
    index++;
    function rmTag(){
        BABYLON.Tags.RemoveTagsFrom(cone,'mark');
    }
    cone.onAfterWorldMatrixUpdateObservable.add(rmTag);
    return cone;
}