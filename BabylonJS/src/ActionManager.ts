import * as BABYLON from "@babylonjs/core"
import { checkInSelectedMeshes, getDefaultMaterialAlpha } from './TempVariable'
import { scene, hl } from './Enviroment'
import { getSysMode } from './TempVariable'
import { onMouseOver, onMouseOut } from "./MouseBinding";

export function PointActionManager(mesh: BABYLON.Mesh) {
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function () {
                if (getSysMode() == 'select' && !checkInSelectedMeshes(mesh)) {
                    if (hl.hasMesh(mesh)) hl.removeMesh(mesh);
                    hl.addMesh(mesh, BABYLON.Color3.Yellow());
                }
            }
        )
    );
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnRightPickTrigger,
            function () {
                onMouseOver(mesh)
            }
        )
    );
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function () {
                onMouseOut(mesh)
                if (getSysMode() == 'select' && hl.hasMesh(mesh)) {
                    if (!checkInSelectedMeshes(mesh))
                        hl.removeMesh(mesh);
                    // else
                    //     setTimeout(function() {
                    //         hl.removeMesh(p);
                    //         removeFromSelectedMeshes(p);
                    //     }, 20000);

                }
            }
        )
    );
}

export function LineActionManager(mesh: BABYLON.Mesh) {
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function () {
                // if (getSysMode()=='point')
                if (!checkInSelectedMeshes(mesh)) {
                    mesh.material.alpha = 1;
                    hl.addMesh(mesh, BABYLON.Color3.Yellow());
                }
            }
        )
    );
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function () {
                // if (getSysMode()=='point')
                if (!checkInSelectedMeshes(mesh)) {
                    mesh.material.alpha = getDefaultMaterialAlpha();
                    hl.removeMesh(mesh);
                }
            }
        )
    );

}

export function RightClickActionManager(mesh: BABYLON.Mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnRightPickTrigger,
            function () {
                onMouseOver(mesh)
            }
        )
    );
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function () {
                onMouseOut(mesh)
            }
        )
    );
}