import * as BABYLON from "@babylonjs/core"

export var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
// export const engine = new BABYLON.Engine(canvas, true);
export var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

export var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)
export var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
export var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

export var hl = new BABYLON.HighlightLayer("hl", scene);

////////////////// Bouding Box ///////////////////////

export var gizmoManager = new BABYLON.GizmoManager(scene);
gizmoManager.boundingBoxGizmoEnabled = false;
gizmoManager.attachableMeshes = []
//  gizmoManager.boundingBoxDragBehavior = null;
//  gizmoManager.usePointerToAttachGizmos = false;
//  gizmoManager.clearGizmoOnEmptyPointerEvent = true;

export function removeFromGizmoManagerList(object) {
    if (gizmoManager.attachableMeshes) {
        for (var i = 0; i < gizmoManager.attachableMeshes.length; i++) {
            if (gizmoManager.attachableMeshes[i] == object) {
                gizmoManager.attachableMeshes.splice(i, 1);
                // refreshGizmoManager();
                return;
            }
        }
    }

}

function refreshGizmoManager() {
    gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
    gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
}