import * as THREE from "three";

import {
    GLTFLoader
} from "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/GLTFLoader.js";


/* =====================================================
   CONTENEDOR 3D
===================================================== */

const contenedor =
    document.getElementById("product-3d-container");


if (!contenedor) {

    console.error(
        "No existe el contenedor 3D."
    );

} else {


    /* =================================================
       ESCENA
    ================================================= */

    const escena =
        new THREE.Scene();


    /* =================================================
       CÁMARA
    ================================================= */

    const camara =
        new THREE.PerspectiveCamera(
            45,
            contenedor.clientWidth /
            contenedor.clientHeight,
            0.1,
            100
        );


    camara.position.set(
        0,
        0,
        6
    );


    /* =================================================
       RENDERIZADOR
    ================================================= */

    const renderizador =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderizador.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderizador.setSize(
        contenedor.clientWidth,
        contenedor.clientHeight
    );


    renderizador.outputColorSpace =
        THREE.SRGBColorSpace;


    contenedor.innerHTML = "";


    contenedor.appendChild(
        renderizador.domElement
    );


    /* =================================================
       LUCES
    ================================================= */

    const luzPrincipal =
        new THREE.DirectionalLight(
            0xffffff,
            4
        );


    luzPrincipal.position.set(
        3,
        4,
        5
    );


    escena.add(
        luzPrincipal
    );


    const luzSecundaria =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );


    luzSecundaria.position.set(
        -4,
        2,
        3
    );


    escena.add(
        luzSecundaria
    );


    const luzAmbiente =
        new THREE.AmbientLight(
            0xffffff,
            1.5
        );


    escena.add(
        luzAmbiente
    );


    /* =================================================
       CAMISETA 3D
    ================================================= */

    const cargador =
        new GLTFLoader();


    let camiseta = null;


    cargador.load(

        "./jersey%20low.glb",

        function (modelo) {

            camiseta =
                modelo.scene;


            camiseta.scale.set(
                2,
                2,
                2
            );


            camiseta.position.set(
                0,
                -1.2,
                0
            );


            escena.add(
                camiseta
            );


            console.log(
                "CAMISETA CARGADA"
            );

        },

        undefined,

        function (error) {

            console.error(
                "ERROR AL CARGAR EL GLB:",
                error
            );

        }

    );


    /* =================================================
       MOUSE
    ================================================= */

    let objetivoX = 0;

    let objetivoY = 0;


    contenedor.addEventListener(
        "mousemove",
        function (evento) {

            const rect =
                contenedor.getBoundingClientRect();


            const x =
                evento.clientX -
                rect.left;


            const y =
                evento.clientY -
                rect.top;


            objetivoY =
                (
                    x /
                    rect.width -
                    0.5
                ) * 0.8;


            objetivoX =
                (
                    y /
                    rect.height -
                    0.5
                ) * 0.5;

        }
    );


    contenedor.addEventListener(
        "mouseleave",
        function () {

            objetivoX = 0;

            objetivoY = 0;

        }
    );


    /* =================================================
       ANIMACIÓN
    ================================================= */

    function animar() {

        requestAnimationFrame(
            animar
        );


        if (camiseta) {

            camiseta.rotation.y +=
                (
                    objetivoY -
                    camiseta.rotation.y
                ) * 0.05;


            camiseta.rotation.x +=
                (
                    -objetivoX -
                    camiseta.rotation.x
                ) * 0.05;

        }


        renderizador.render(
            escena,
            camara
        );

    }


    animar();


    /* =================================================
       RESPONSIVE
    ================================================= */

    window.addEventListener(
        "resize",
        function () {

            const ancho =
                contenedor.clientWidth;


            const alto =
                contenedor.clientHeight;


            camara.aspect =
                ancho / alto;


            camara.updateProjectionMatrix();


            renderizador.setSize(
                ancho,
                alto
            );

        }
    );

}
