import * as BABYLON from "@babylonjs/core"

export function CreateMeshMaterial(color: BABYLON.Color3 ,scene) {
var transMat = new BABYLON.StandardMaterial("transMat", scene);
	transMat.diffuseColor = color;
    transMat.alpha = 0.5;
return transMat;
}