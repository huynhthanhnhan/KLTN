import * as BABYLON from "@babylonjs/core"
import {scene} from './Enviroment'

export function CreateMeshMaterial(color: BABYLON.Color3) {
var transMat = new BABYLON.StandardMaterial("transMat", scene);
	transMat.diffuseColor = color;
    transMat.alpha = 0.5;
return transMat;
}