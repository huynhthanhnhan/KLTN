// import { CreateLine, Line } from './AddLine';

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var hl = new BABYLON.HighlightLayer("hg", scene);

    // Our built-in 'sphere' shape.
    var line = BABYLON.MeshBuilder.CreateCylinder("line", { height: 10, diameter: 0.05 }, scene);
    line.position.y = 1000;
    var groundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    var point = BABYLON.MeshBuilder.CreateSphere("point", { diameter: 0.2 }, scene);
    point.position.y = 1000;
    var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
    pointMat.diffuseColor = new BABYLON.Color3.Red();
    point.material = pointMat;
    // Our built-in 'ground' shape.

    var groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    groundMaterial.gridRatio = 0.5;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.5;

    var groundz = BABYLON.MeshBuilder.CreateGround("groundz", { width: 20, height: 20 }, scene);
    groundz.material = groundMaterial;
    // groundz.material.mainColor = new BABYLON.Color3(0,0,1);

    var groundx = BABYLON.MeshBuilder.CreateGround("groundx", { width: 20, height: 20 }, scene);
    groundx.rotation.x = Math.PI / 2;
    groundx.material = groundMaterial;
    // groundz.material.mainColor = new BABYLON.Color3(1,0,0);

    var groundy = BABYLON.MeshBuilder.CreateGround("groundy", { width: 20, height: 20 }, scene);
    groundy.rotation.z = Math.PI / 2;
    groundy.material = groundMaterial;

    //////////////////// Global Variable ////////////////////
    var isSelectMode = true;
    var isCreateLineMode = false;
    var isCreateMultiLineMode = false;
    var isCreatePointMode = false;
    var isStartCreateLine = true;

    var isMultiSelect = false;

    var selectedMeshes = [];

    var startPoint;


    //////////////////// Form Binding ////////////////////
    document.getElementById("cbSelectMode").onclick = function() {
        isSelectMode = this.checked;

        if (this.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item) => {
                if (item !== this && item.checked) item.click();
            })
        }
    }

    document.getElementById("cbPointMode").onclick = function() {
        isCreatePointMode = this.checked;

        if (this.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item) => {
                if (item !== this && item.checked) item.click();
            })
        }
    }

    document.getElementById("cbSingleLineMode").onclick = function() {
        isCreateLineMode = this.checked;
        if (startPoint) {
            hl.removeMesh(startPoint);
            startPoint = "";
        }
        if (this.checked)
            isStartCreateLine = true;

        if (this.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item) => {
                if (item !== this && item.checked) item.click();
            })
        }
    }

    document.getElementById("cbMultiLineMode").onclick = function() {
        isCreateMultiLineMode = this.checked;
        if (startPoint) {
            hl.removeMesh(startPoint);
            startPoint = "";
        }
        if (this.checked)
            isStartCreateLine = true;

        if (this.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item) => {
                if (item !== this && item.checked) item.click();
            })
        }
    }



    function CreateLine(point1, point2) {
        var distance = BABYLON.Vector3.Distance(point1, point2);
        if (distance > 0) {

            var parentLine = BABYLON.MeshBuilder.CreateBox("parentLine", { size: 0.02 }, scene);
            parentLine.lookAt(point2.subtract(BABYLON.Vector3.Center(point1, point2)));
            parentLine.position = new BABYLON.Vector3.Center(point1, point2);

            var newLine = BABYLON.MeshBuilder.CreateCylinder("line", { height: distance, diameter: 0.05 }, scene);
            newLine.parent = parentLine;
            newLine.rotation.x = Math.PI / 2;

            newLine.actionManager = new BABYLON.ActionManager(scene);
            newLine.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function() {
                        if (isCreatePointMode)
                            hl.addMesh(newLine, BABYLON.Color3.Yellow());
                    }
                )
            );
            newLine.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function() {
                        if (isCreatePointMode)
                            hl.removeMesh(newLine);
                    }
                )
            );
        }
    }

    function CreatePoint(position) {
        const p = point.clone("point");
        // p.isVisible = true;
        p.position = position;
        p.actionManager = new BABYLON.ActionManager(scene);
        p.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() {
                    if (isSelectMode)
                        hl.addMesh(p, BABYLON.Color3.Yellow());
                }
            )
        );
        p.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                function() {
                    if (isSelectMode)
                        hl.removeMesh(p);
                }
            )
        );
        return p;
    }



    var p = new BABYLON.Vector3(0, 10, 1);
    // p.subtract
    scene.onPointerPick = function(evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            if ((isCreateLineMode || isCreateMultiLineMode)) {
                if (pickResult.pickedMesh.name != "point") {
                    const pt = CreatePoint(pickResult.pickedPoint);
                    if (isStartCreateLine) {
                        startPoint = pt;
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            CreateLine(startPoint.position, pt.position);
                            console.log("create with line");
                            hl.removeMesh(startPoint);
                            if (isCreateLineMode)
                                isStartCreateLine = true;
                            else {
                                startPoint = pt;
                                hl.addMesh(startPoint, BABYLON.Color3.Green());
                            }
                        }
                    }
                } else {
                    if (isStartCreateLine) {
                        startPoint = pickResult.pickedMesh;
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            CreateLine(startPoint.position, pickResult.pickedMesh.position);
                            console.log("create with point")
                            isStartCreateLine = true;
                            hl.removeMesh(startPoint);
                        }
                    }
                }
            } else if (isCreatePointMode) {
                const pt = CreatePoint(pickResult.pickedPoint);
            } else {
                var target = pickResult.pickedMesh;
                hl.addMesh(target, BABYLON.Color3.Blue());
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz") {
                    if (!isMultiSelect) {
                        selectedMeshes.forEach(mesh => {
                            if (hl.hasMesh(mesh))
                                hl.removeMesh(mesh);
                        })
                        selectedMeshes = [];
                    }
                    selectedMeshes.push(target);

                }
                // setTimeout(function () {
                //     hl.removeMesh(target);
                // }, 3000);
            }

        }
    };

    /****************************Key Control Multiple Keys************************************************/

    var map = {}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));


    /****************************Key Control******************************************************/

    scene.registerAfterRender(function() {

        if (map["Control"]) {
            isMultiSelect = true;
        } else
            isMultiSelect = false;
        if ((map["x"] || map["X"])) {
            if (selectedMeshes) {
                selectedMeshes.forEach(mesh => {
                    if (mesh.parent)
                        mesh.parent.dispose();
                    mesh.dispose();
                })
            }
        }



    });

    // var mousePoint = point.clone();
    // scene.onPointerMove = function(evt, pickResult){
    //     if(isCreateLineMode)
    //     {
    //         console.log("hit");
    //         mousePoint.position = pickResult.pickedPoint;
    //     }
    // }

    return scene;

};
__createScene = createScene;

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function() {
    if (scene) {
        scene.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});



// https://www.babylonjs-playground.com/#T3DJ2B#3