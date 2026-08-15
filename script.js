import * as THREE from "three";
import { GLTFLoader } from
    "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/GLTFLoader.js";


/* =====================================================
   ESCENA 3D
===================================================== */

const contenedor = document.getElementById(
    "product-3d-container"
);


/* =====================================================
   ESCENA
===================================================== */

const escena = new THREE.Scene();

escena.background = new THREE.Color(0x050505);


/* =====================================================
   CÁMARA
===================================================== */

const camara = new THREE.PerspectiveCamera(
    45,
    contenedor.clientWidth /
    contenedor.clientHeight,
    0.1,
    100
);

camara.position.set(0, 0, 6);


/* =====================================================
   RENDERIZADOR
===================================================== */

const renderizador = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderizador.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderizador.setSize(
    contenedor.clientWidth,
    contenedor.clientHeight
);

contenedor.innerHTML = "";

contenedor.appendChild(
    renderizador.domElement
);


/* =====================================================
   LUCES
===================================================== */

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

escena.add(luzPrincipal);


const luzRelleno =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

luzRelleno.position.set(
    -4,
    1,
    2
);

escena.add(luzRelleno);


const luzAmbiente =
    new THREE.AmbientLight(
        0xffffff,
        1
    );

escena.add(luzAmbiente);


/* =====================================================
   CAMISETA 3D
===================================================== */

const cargador = new GLTFLoader();

let producto = null;


cargador.load(
    "./camiseta.glb",

    (modelo) => {

        producto = modelo.scene;

        producto.scale.set(
            2,
            2,
            2
        );

        producto.position.set(
            0,
            -1.2,
            0
        );

        escena.add(producto);

    },

    undefined,

    (error) => {

        console.error(
            "No se pudo cargar la camiseta 3D:",
            error
        );

    }
);


/* =====================================================
   POSICIÓN
===================================================== */

producto.position.set(
    0,
    0,
    0
);


/* =====================================================
   MOVIMIENTO DEL MOUSE
===================================================== */

let objetivoX = 0;
let objetivoY = 0;


contenedor.addEventListener(
    "mousemove",
    (evento) => {

        const rect =
            contenedor.getBoundingClientRect();

        const x =
            evento.clientX - rect.left;

        const y =
            evento.clientY - rect.top;


        objetivoY =
            ((x / rect.width) - 0.5) * 0.8;

        objetivoX =
            ((y / rect.height) - 0.5) * 0.5;

    }
);


/* =====================================================
   ANIMACIÓN
===================================================== */

function animar() {

    requestAnimationFrame(animar);


  if (producto) {

    producto.rotation.y +=
        (objetivoY - producto.rotation.y) * 0.05;

    producto.rotation.x +=
        (-objetivoX - producto.rotation.x) * 0.05;

}


    renderizador.render(
        escena,
        camara
    );

}


animar();


/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener(
    "resize",
    () => {

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
