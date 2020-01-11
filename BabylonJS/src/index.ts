import {engine, scene} from './Enviroment'
import {InitGround, showAxis} from './BasicScreen'
import {formBinding} from './FormBinding'
import {KeyControl} from './KeyControl'
import {MouseControl} from './MouseBinding'

import { } from "./Line";


var createScene = function() {

   ///////////////////// Init functions /////////////////////////
    InitGround();
    showAxis(10);
    formBinding();
    KeyControl();
    MouseControl();

    ////////// TEST OBJECT ///////////////

    
    /////////////////////////////////////

    

    scene.registerBeforeRender(function() {
        
    })

    window['scene'] = scene;
    return scene;

};

var mainScene = createScene();

engine.runRenderLoop(function() {
    if (mainScene) {
        mainScene.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " FPS";
        // var modeLabel = document.getElementById("modeLabel");
        // modeLabel.innerHTML = getSysMode() + " mode";
    }
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});