import * as BABYLON from "@babylonjs/core"
import {scene} from './Enviroment'
import { getDefaultMaterialAlpha } from "./TempVariable";

export function CreateMeshMaterial(color: BABYLON.Color3) {
var transMat = new BABYLON.StandardMaterial("transMat", scene);
	transMat.diffuseColor = color;
    transMat.alpha = getDefaultMaterialAlpha();
return transMat;
}