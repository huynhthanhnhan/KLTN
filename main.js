import { CreateLine } from './Line.js';
import { CreatePoint } from './Point.js';

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

    var hl = new BABYLON.HighlightLayer("hl", scene);
    ////////////////// Bouding Box ///////////////////////
    var gizmoManager = new BABYLON.GizmoManager(scene);
    gizmoManager.boundingBoxGizmoEnabled = false;
    gizmoManager.attachableMeshes = []
        //  gizmoManager.boundingBoxDragBehavior = null;
        //  gizmoManager.usePointerToAttachGizmos = false;
        //  gizmoManager.clearGizmoOnEmptyPointerEvent = true;

    // Our built-in 'sphere' shape.
    var line = BABYLON.MeshBuilder.CreateCylinder("line", { height: 10, diameter: 0.05 }, scene);
    line.position.y = 1000;
    var groundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    var pointMaster = BABYLON.MeshBuilder.CreateSphere("point", { diameter: 0.2 }, scene);
    gizmoManager.attachableMeshes.push(pointMaster);
    pointMaster.position.y = 1000;
    var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
    pointMat.diffuseColor = new BABYLON.Color3.Red();
    pointMaster.material = pointMat;
    // Our built-in 'ground' shape.

    var groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    groundMaterial.gridRatio = 1;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.5;

    var groundz = BABYLON.MeshBuilder.CreateGround("groundz", { width: 100, height: 100 }, scene);
    groundz.material = groundMaterial;
    // groundz.material.mainColor = new BABYLON.Color3(0,0,1);

    var groundx = BABYLON.MeshBuilder.CreateGround("groundx", { width: 100, height: 100 }, scene);
    groundx.rotation.x = Math.PI / 2;
    groundx.material = groundMaterial;
    // groundz.material.mainColor = new BABYLON.Color3(1,0,0);

    var groundy = BABYLON.MeshBuilder.CreateGround("groundy", { width: 100, height: 100 }, scene);
    groundy.rotation.z = Math.PI / 2;
    groundy.material = groundMaterial;

    //////////////////// Global Variable ////////////////////

    var listPoint = [];
    var listLine = [];

    var isSelectMode = true;
    var isCreateLineMode = false;
    var isCreateMultiLineMode = false;
    var isCreatePointMode = false;
    var isStartCreateLine = true;

    var isMultiSelect = false;
    var isEditMode = false;

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

    document.getElementById("cbEditMode").onclick = function() {
        isEditMode = this.checked;
        gizmoManager.boundingBoxGizmoEnabled = this.checked;


        if (this.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item) => {
                if (item !== this && item.checked) item.click();
            })
        }
    }

    function CreateCubeWithCenterSize(center, size) {
        // var p1 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y - size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        // var p2 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y - size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        // var p3 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y + size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        // var p4 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y + size / 2, center.z - size / 2),pointMaster,gizmoManager,hl,scene);
        // var p5 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y - size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        // var p6 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y - size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        // var p7 = CreatePoint(new BABYLON.Vector3(center.x + size / 2, center.y + size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);
        // var p8 = CreatePoint(new BABYLON.Vector3(center.x - size / 2, center.y + size / 2, center.z + size / 2),pointMaster,gizmoManager,hl,scene);

        // var l1 = CreateLine(p1.position, p2.position,scene);
        // var l2 = CreateLine(p2.position, p3.position,scene);
        // var l3 = CreateLine(p3.position, p4.position,scene);
        // var l4 = CreateLine(p4.position, p1.position,scene);
        // var l5 = CreateLine(p1.position, p5.position,scene);
        // var l6 = CreateLine(p2.position, p6.position,scene);
        // var l7 = CreateLine(p3.position, p7.position,scene);
        // var l8 = CreateLine(p4.position, p8.position,scene);
        // var l9 = CreateLine(p5.position, p6.position,scene);
        // var l10 = CreateLine(p6.position, p7.position,scene);
        // var l11 = CreateLine(p7.position, p8.position,scene);
        // var l12 = CreateLine(p8.position, p5.position,scene);
    }

    // CreateCubeWithCenterSize({ x: 5, y: 5, z: 5 }, 4);

    function CreateCubeMesh(center, size) {
        var cube = new BABYLON.MeshBuilder.CreateBox("cube", { size: size }, scene);
        cube.position = new BABYLON.Vector3(center.x, center.y, center.z);
        gizmoManager.attachableMeshes.push(cube);
    }

    function CreateBoxMesh(center, width, height, depth) {
        var box = new BABYLON.MeshBuilder.CreateBox("box", { width: width, height: height, depth: depth }, scene);
        box.position = new BABYLON.Vector3(center.x, center.y, center.z);
        gizmoManager.attachableMeshes.push(box);
    }

    CreateCubeMesh({ x: 0, y: 2, z: 0 }, 1);
    CreateBoxMesh({ x: 5, y: 2, z: 0 }, 2, 3, 4);


    function checkInSelectedMeshes(object) {
        if (selectedMeshes) {
            for (var i = 0; i < selectedMeshes.length; i++) {
                if (selectedMeshes[i] == object) {
                    return true;

                }
            }
            return false;
        }

    }

    function removeFromSelectedMeshes(object) {
        if (selectedMeshes) {
            for (var i = 0; i < selectedMeshes.length; i++) {
                if (selectedMeshes[i] == object) {
                    selectedMeshes.splice(i, 1);
                    return;
                }
            }
        }

    }

    function removeFromGizmoManagerList(object) {
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

    function resetSelectedMeshes() {
        selectedMeshes.forEach(mesh => {
            if (hl.hasMesh(mesh))
                hl.removeMesh(mesh);
            removeFromGizmoManagerList(mesh);
        })
        selectedMeshes = [];
    }


    scene.onPointerPick = function(evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            if ((isCreateLineMode || isCreateMultiLineMode)) {
                if (pickResult.pickedMesh.name != "point") {
                    const pt = CreatePoint(pickResult.pickedPoint,pointMaster,gizmoManager,hl,scene,isSelectMode,checkInSelectedMeshes);
                    listPoint.push(pt);
                    if (isStartCreateLine) {
                        startPoint = pt.mesh;
                        if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            var s= CreateLine(startPoint.position, pt.mesh.position,scene,isCreatePointMode);
                            listLine.push(s);
                            console.log("create with line");
                            hl.removeMesh(startPoint);
                            if (isCreateLineMode)
                                isStartCreateLine = true;
                            else {
                                startPoint = pt.mesh;
                                if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                                hl.addMesh(startPoint, BABYLON.Color3.Green());
                            }
                        }
                    }
                } else {
                    if (isStartCreateLine) {
                        startPoint = pickResult.pickedMesh;
                        if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            var s=CreateLine(startPoint.position, pickResult.pickedMesh.position,scene,isCreatePointMode);
                            listLine.push(s);
                            console.log("create with point")
                            isStartCreateLine = true;
                            hl.removeMesh(startPoint);
                        }
                    }
                }
            } else if (isCreatePointMode) {
                const pt = CreatePoint(pickResult.pickedPoint,pointMaster,gizmoManager,hl,scene,isSelectMode,checkInSelectedMeshes);
                listPoint.push(pt);
            } else if (isSelectMode || isEditMode) {
                var target = pickResult.pickedMesh;
                if (hl.hasMesh(target)) hl.removeMesh(target);
                hl.addMesh(target, BABYLON.Color3.Blue());
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
                    if (!isMultiSelect || isEditMode) {
                        selectedMeshes.forEach(mesh => {
                            if (hl.hasMesh(mesh))
                                hl.removeMesh(mesh);
                        })
                        resetSelectedMeshes();
                    }
                    selectedMeshes.push(target);
                    gizmoManager.attachableMeshes.push(target);

                    // camera.detachControl(canvas);
                } else {
                    resetSelectedMeshes();
                }
            }

        }
    };

    ////////////////////// Tinh Vector chi phuong cua mat phang ////////////////////
    var getHorizontalPlaneVector = function(y, pos, rot) {
        // if (!rot.y) {
        //     return null;
        // }

        return new BABYLON.Vector3(
            //cong thuc tinh vector chi phuong y - y0 = k * ( x - x0 )
            pos.x - (pos.y - y) * rot.x / rot.y,
            1,
            pos.z - (pos.y - y) * rot.z / rot.y
        );
    };

    ///////////////////// Drag mesh with mouse ////////////////////
    function dragMesh() {
        var target = BABYLON.Vector3.Unproject(
            new BABYLON.Vector3(scene.pointerX, scene.pointerY, 0),
            canvas.width,
            canvas.height,
            new BABYLON.Matrix.Identity(),
            camera.getViewMatrix(),
            camera.getProjectionMatrix()
        );


        target.x = camera.position.x - target.x;
        target.y = camera.position.y - target.y;
        target.z = camera.position.z - target.z;

        var p = getHorizontalPlaneVector(0, camera.position, target);
        if (selectedMeshes && selectedMeshes.length == 1)
            selectedMeshes[0].position = p;
    }



    /**************************** Key Control ******************************************************/

    scene.onKeyboardObservable.add((keyInfo) => {
        switch (keyInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if (!isEditMode) {
                    switch (keyInfo.event.key) {
                        case "x" || "X":
                            if (selectedMeshes) {
                                selectedMeshes.forEach(mesh => {
                                    if (mesh.parent)
                                        mesh.parent.dispose();
                                    removeFromGizmoManagerList(mesh);
                                    gizmoManager.attachToMesh(pointMaster);
                                    mesh.dispose();
                                })
                            }
                            break;
                        case "Control":
                            isMultiSelect = true;
                            break;
                        case "s" || "S":
                            document.getElementById("cbSelectMode").click();
                            break;
                        case "p" || "P":
                            document.getElementById("cbPointMode").click();
                            break
                        case "l" || "L":
                            document.getElementById("cbSingleLineMode").click();
                            break;
                        case "m" || "M":
                            document.getElementById("cbMultiLineMode").click();
                            break;
                        case "e" || "E":
                            document.getElementById("cbEditMode").click();
                            break;
                    }
                } else {
                    switch (keyInfo.event.key) {
                        case "g" || "G":
                            gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled;
                            if (gizmoManager.positionGizmoEnabled) {
                                gizmoManager.rotationGizmoEnabled = false;
                                gizmoManager.scaleGizmoEnabled = false;
                            }
                            break;
                        case "r" || "R":
                            gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled;
                            if (gizmoManager.rotationGizmoEnabled) {
                                gizmoManager.positionGizmoEnabled = false;
                                gizmoManager.scaleGizmoEnabled = false;
                            }
                            break;
                        case "s" || "S":
                            gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled;
                            if (gizmoManager.scaleGizmoEnabled) {
                                gizmoManager.positionGizmoEnabled = false;
                                gizmoManager.rotationGizmoEnabled = false;
                            }
                            break;
                    }
                }
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                switch (keyInfo.event.key) {
                    case "Control":
                        isMultiSelect = false;
                        break;
                }
                break;

        }
    })



    /**************************** Mouse Control ******************************************************/

    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.event.button == 2) {
            camera.attachControl(canvas);
        }
        switch (pointerInfo.type) {
            // case BABYLON.PointerEventTypes.POINTERDOWN:
            //     if(pointerInfo.pickInfo.hit) {
            //         mode = "DRAG";
            //         castRay();
            //     }
            // 	break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                // if(pickedMesh && mode === "DRAG"){
                // dragMesh();
                // }                
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                // if (pickedMesh) 
                {
                    // mode = "CAMERA";
                    // pickedMesh = null;
                    // camera.attachControl(canvas);
                }
                break;
            case BABYLON.PointerEventTypes.POINTERTAP:
                // if (pointerInfo.pickInfo.hit) {
                //     // mode = "GIZMO";
                //     // castRay();
                //     if (selectedMeshes && selectedMeshes.length == 1) {
                //         gizmoManager.attachToMesh(selectedMeshes[0]);
                //     }
                // }
                break;

        }
    });

    scene.registerBeforeRender(function() {
        // if (selectedMeshes.length >= 1) {
        //     selectedMeshes.forEach(mesh => {
        //         if (mesh)
        //             gizmoManager.attachToMesh(mesh);
        //     })
        // }
        // console.log(isMultiSelect);
    })


    // var mousePoint = point.clone();
    // scene.onPointerMove = function(evt, pickResult){
    //     if(isCreateLineMode)
    //     {
    //         console.log("hit");
    //         mousePoint.position = pickResult.pickedPoint;
    //     }
    // }

    ///////////////// Show Axis ////////////////////////
    var showAxis = function(size) {
        var makeTextPlane = function(text, color, size) {
            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            return plane;
        };

        var axisX = BABYLON.Mesh.CreateLines("axisX", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var xChar = makeTextPlane("X", "red", size / 10);
        xChar.position = new BABYLON.Vector3(size, -0.1 * size, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var yChar = makeTextPlane("Y", "green", size / 10);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, 0);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        var zChar = makeTextPlane("Z", "blue", size / 10);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    };

    showAxis(10);
    window['scene']=scene;
    return scene;

};

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