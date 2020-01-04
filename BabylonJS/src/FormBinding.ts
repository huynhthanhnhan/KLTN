import { CreateBoxDefault } from './Objects/BoxObject'
import { CreateBoxCustom } from './Objects/BoxObject'
import { CreateCubeDefault } from './Objects/CubeObject'
import { CreateCubeCustom } from './Objects/CubeObject'
import { CreateSphereDefault } from './Objects/SphereObject'
import { CreateSphereCustom } from './Objects/SphereObject'
import { CreatePyramidDefault } from './Objects/PyramidObject'
import { CreatePyramidCustom } from './Objects/PyramidObject'
import { CreateConeDefault } from './Objects/ConeObject'
import { CreateConeCustom } from './Objects/ConeObject'
import { CreatePrismDefault } from './Objects/PrismObject'
import { CreatePrismCustom } from './Objects/PrismObject'
import $ from 'jquery'
import { triggerStartPoint, setSysMode, setStartPoint, setIsStartCreateLine, setInputObject, getInputObject, setContent, getSelectedMesh } from './TempVariable'
import { setIsPickableBasicScene } from './BasicScreen'
import { Point } from './Point'
import * as BABYLON from '@babylonjs/core'
import { Line } from './Line'
import { Plane } from './Plane'
import { gizmoManager, resetHL } from './Enviroment'



export function formBinding() {
    function changeSystemMode(mode: 'select' | 'line' | 'multiLine' | 'point' | 'edit' | 'intersect' |
        'plane3Point' | 'plane2Line' | 'planePointLine' | 'distance2Point' | 'distance2Line' | 'distancePointLine' | 'totalArea' | 'box-inputs' | 'cube-inputs' | 'cone-inputs' | 'sphere-inputs' | 'pyramid-inputs' | 'prism-inputs'|
        'spherePointPoint' | 'planeMidPointPoint' | 'planePlanePoint' | 'pointMidPointPoint') {
        setIsStartCreateLine(true);
        switch (mode) {
            case 'edit':
                setContent('Use Keys R / G / S / B to control');
                break;
            case 'select':
                setContent("Right-click object to show information, Press key X to remove object");
                break;
            case 'point':
                setContent('Double-click on the screen');
                break;
            case 'line':
                setContent('Double-click to create point');
                break;
            case 'intersect':
                setContent('Select 2 mesh to see the intersect');
                break;
            case 'plane3Point':
                setContent('Select or create 3 point to create Plane');
                break;
            case 'plane2Line':
                setContent('Select two line intersect other');
                break;
            case 'planePointLine':
                setContent('Select a Point and a Line');
                break;
            case 'distance2Point':
                setContent('Select 2 points exist')
                break;
            case 'distance2Line':
                break;
            case 'distancePointLine':
                setContent('Select a Point and a Line');
                break;
            case 'totalArea':
                setContent('Double-click a mesh to get total area');
                break;
            case 'spherePointPoint':
                setContent('Select a point for center of sphere');
                break;
            case 'planeMidPointPoint':
                setContent('Select 2 Point');
                break;
            case 'planePlanePoint':
                setContent('Select a Plane and a Point');
                break;
            case 'pointMidPointPoint':
                setContent('Select 2 Point');
                break;
            default:
                break;
        }
        if (mode != 'edit') {
            gizmoManager.positionGizmoEnabled = false;
            gizmoManager.scaleGizmoEnabled = false;
            gizmoManager.rotationGizmoEnabled = false;
            gizmoManager.boundingBoxGizmoEnabled = false;
        }
        resetHL();
        setSysMode(mode);
    }
    $("#point_click").on('click', function () {
        changeSystemMode('point');
        setIsPickableBasicScene(true);
    })
    $("#line_click").on('click', function () {
        changeSystemMode('line');
        setIsPickableBasicScene(true);
    })
    $("#line_click_multi").on('click', function () {
        changeSystemMode('multiLine');
        setIsPickableBasicScene(true);
    })
    $("#btn_select_mode").on('click', function () {
        changeSystemMode('select');
        setIsPickableBasicScene(false);
    })
    $("#btn_edit_mode").on('click', function () {
        changeSystemMode('edit');
        setIsPickableBasicScene(false);
    })
    $("#btn_view_intersect_mode").on('click', function () {
        changeSystemMode('intersect');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_3_point").on('click', function () {
        changeSystemMode('plane3Point');
        setIsPickableBasicScene(true);
    });
    $("#plane_click_2_line").on('click', function () {
        changeSystemMode('plane2Line');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_point_line").on('click', function () {
        changeSystemMode('planePointLine');
        setIsPickableBasicScene(true);
    });
    $("#caculate_distance_2_point").on('click', function () {
        changeSystemMode('distance2Point');
        setIsPickableBasicScene(false);
    });
    $("#caculate_distance_2_line").on('click', function () {
        changeSystemMode('distance2Line');
        setIsPickableBasicScene(false);
    });
    $("#caculate_distance_point_line").on('click', function () {
        changeSystemMode('distancePointLine');
        setIsPickableBasicScene(false);
    });
    $("#caculate_total_area").on('click', function () {
        changeSystemMode('totalArea');
        setIsPickableBasicScene(false);
    });
    $("#sphere_point_point").on('click', function () {
        changeSystemMode('spherePointPoint');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_point_point").on('click', function () {
        changeSystemMode('planeMidPointPoint');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_plane_point").on('click', function () {
        changeSystemMode('planePlanePoint');
        setIsPickableBasicScene(false);
    });
    $("#point_mid").on('click', function () {
        changeSystemMode('pointMidPointPoint');
        setIsPickableBasicScene(false);
    });



    var form_input = document.getElementById("formInput");
    var point1 = document.getElementById('point1'); 
    var point2 = document.getElementById('point2');
    var point3 = document.getElementById('point3');
    var vector = document.getElementById('vector');
    var position = document.getElementById('position');
    var colorpick = document.getElementById('colorpicker'); 


    var box = document.getElementById('box');
    var cube = document.getElementById('cube');
    var cone = document.getElementById('cone');
    var sphere = document.getElementById('sphere');
    var pyramid = document.getElementById('pyramid');
    var prism = document.getElementById('prism');

    var position_x = document.getElementById('position-x') as HTMLInputElement;
    var position_y = document.getElementById('position-y') as HTMLInputElement;
    var position_z = document.getElementById('position-z') as HTMLInputElement;
    var point1_x = document.getElementById('point1-x') as HTMLInputElement;
    var point1_y = document.getElementById('point1-y') as HTMLInputElement;
    var point1_z = document.getElementById('point1-z') as HTMLInputElement;
    var point2_x = document.getElementById('point2-x') as HTMLInputElement;
    var point2_y = document.getElementById('point2-y') as HTMLInputElement;
    var point2_z = document.getElementById('point2-z') as HTMLInputElement;
    var point3_x = document.getElementById('point3-x') as HTMLInputElement;
    var point3_y = document.getElementById('point3-y') as HTMLInputElement;
    var point3_z = document.getElementById('point3-z') as HTMLInputElement;
    var vector_x = document.getElementById('vector-x') as HTMLInputElement;
    var vector_y = document.getElementById('vector-y') as HTMLInputElement;
    var vector_z = document.getElementById('vector-z') as HTMLInputElement;

    var box_width = document.getElementById('box-width') as HTMLInputElement;
    var box_height = document.getElementById('box-height') as HTMLInputElement;
    var box_depth = document.getElementById('box-depth') as HTMLInputElement;

    var cube_edge = document.getElementById('cube-edge') as HTMLInputElement;

    var cone_diameter = document.getElementById('cone-diameter') as HTMLInputElement;
    var cone_height = document.getElementById('cone-height') as HTMLInputElement;

    var sphere_diameter = document.getElementById('sphere-diameter') as HTMLInputElement;

    var pyramid_height = document.getElementById('pyramid-height') as HTMLInputElement;
    var pyramid_face = document.getElementById('pyramid-face') as HTMLInputElement;

    var prism_height = document.getElementById('prism-height') as HTMLInputElement;
    var prism_face = document.getElementById('prism-face') as HTMLInputElement;

    $("#renderCanvas").on('click', function () {
        resetFormInput();
        form_input.style.display = "none"
    })

    $("#box_default").on('click', function () {
        CreateBoxDefault();
    })
    $("#cube_default").on('click', function () {
        CreateCubeDefault();
    })
    $("#sphere_default").on('click', function () {
        CreateSphereDefault();
    })
    $("#prism_default").on('click', function () {
        CreatePrismDefault();
    })
    $("#pyramid_default").on('click', function () {
        CreatePyramidDefault();
    })
    $("#cone_default").on('click', function () {
        CreateConeDefault();
    })

    
    $("#colorChoice").change(function(){
        console.log($(this).val());
        // $(getSelectedMesh().name).css('background', $(this).val());
      });
    


    function resetFormInput() {
        document.getElementsByName('div-form-input').forEach(e => {
            e.style.display = "none";
        })
        document.getElementsByName('form-input-value').forEach(e => {
            (e as HTMLInputElement).value = "";
        })
        setInputObject('');
        form_input.style.display = "block";
        document.getElementById('btnCreate').style.display = 'block';
        document.getElementById('btnClose').style.display = 'block';

    }
    $("#point_input").on('click', function () {
        resetFormInput();
        position.style.display = 'block';
        setInputObject('point');

        // var x = document.getElementById('position-x');
    })

    $("#line_input_point_vector").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        vector.style.display = 'block';
        setInputObject('line-point-vector');
    })

    $("#line_input_2_point").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        point2.style.display = 'block';
        setInputObject('line-point-point');
    })

    $("#plane_input_3_point").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        point2.style.display = 'block';
        point3.style.display = 'block';
        setInputObject('plane-3-point');
    })

    $("#plane_input_point_vector").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        vector.style.display = 'block';
        setInputObject('plane-point-vector');
    })

    $("#box_input").on('click', function () {
        resetFormInput();
        box.style.display = 'block';
        position.style.display = 'block';
        setInputObject('box-inputs');
    })

    $("#cube_input").on('click', function () {
        resetFormInput();
        cube.style.display = 'block';
        position.style.display = 'block';
        setInputObject('cube-inputs');
    })

    $("#sphere_input").on('click', function () {
        resetFormInput();
        sphere.style.display = 'block';
        position.style.display = 'block';
        setInputObject('sphere-inputs');
    })

    $("#cone_input").on('click', function () {
        resetFormInput();
        cone.style.display = 'block';
        position.style.display = 'block';
        setInputObject('cone-inputs');
    })

    $("#pyramid_input").on('click', function () {
        resetFormInput();
        pyramid.style.display = 'block';
        position.style.display = 'block';
        setInputObject('pyramid-inputs');
    })

    $("#prism_input").on('click', function () {
        resetFormInput();
        prism.style.display = 'block';
        position.style.display = 'block';
        setInputObject('prism-inputs');
    })

    $("#btnClose").on('click', function () {
        resetFormInput();
        form_input.style.display = "none";
    })

    // $("#btn_select_mode").on('click', function () {
    //     resetFormInput();
    //     colorpick.style.display = "block";
    //     document.getElementById('btnCreate').style.display = 'none';
    // })

    
    $("#btnCreate").on('click', function () {
        switch (getInputObject()) {
            case "point":
                new Point(new BABYLON.Vector3(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value)));
                break;
            case "line-point-point":
                var pt1 = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var pt2 = new BABYLON.Vector3(parseInt(point2_x.value), parseInt(point2_y.value), parseInt(point2_z.value));
                new Line(pt1, pt2, "pos-pos");
                break;
            case "line-point-vector":
                var pt = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var vt = new BABYLON.Vector3(parseInt(vector_x.value), parseInt(vector_y.value), parseInt(vector_z.value));
                new Line(pt, vt, "point-vector");
                break;
            case "plane-3-point":
                var pt1 = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var pt2 = new BABYLON.Vector3(parseInt(point2_x.value), parseInt(point2_y.value), parseInt(point2_z.value));
                var pt3 = new BABYLON.Vector3(parseInt(point3_x.value), parseInt(point3_y.value), parseInt(point3_z.value));
                new Plane('3point', pt1, pt2, pt3);
                break;
            case "plane-point-vector":
                var pt = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var vt = new BABYLON.Vector3(parseInt(vector_x.value), parseInt(vector_y.value), parseInt(vector_z.value));
                new Plane('point-vector', pt, vt, 0);
                break;
            case "box-inputs":
                CreateBoxCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(box_width.value), parseInt(box_height.value), parseInt(box_depth.value));
                break;
            case "cone-inputs":
                CreateConeCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(cone_diameter.value), parseInt(cone_height.value));
                break;
            case "sphere-inputs":
                CreateSphereCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(sphere_diameter.value));
                break;
            case "cube-inputs":
                CreateCubeCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(cube_edge.value));
                break;
            case "pyramid-inputs":
                CreatePyramidCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(pyramid_height.value), parseInt(pyramid_face.value));
                break;
            case "prism-inputs":
                CreatePrismCustom(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value), parseInt(prism_face.value), parseInt(prism_height.value));
                break;
            default:
        }
        form_input.style.display = "none";
    })

    // $('#plane').on('change', function () {
    //     if (this.value == "3point") {
    //         changeSystemMode('point');
    //         setIsPickableBasicScene(true);
    //     }
    //     else if (this.value == "point_normal") {
    //         // console.log('line')
    //         changeSystemMode('line')
    //         setIsPickableBasicScene(true);
    //     }
    // }
}


