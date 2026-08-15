/* =====================================================
   CARRITO
===================================================== */

let carrito = [];

const contadorCarrito = document.getElementById("cart-count");


/* =====================================================
   ACTUALIZAR CONTADOR
===================================================== */

function actualizarContador() {

    contadorCarrito.textContent = carrito.length;

}


/* =====================================================
   ANIMACIÓN DEL PRODUCTO
===================================================== */

const producto3D = document.querySelector(
    ".product-placeholder"
);

const contenedor3D = document.getElementById(
    "product-3d-container"
);


contenedor3D.addEventListener("mousemove", (evento) => {

    const rect = contenedor3D.getBoundingClientRect();

    const x =
        evento.clientX - rect.left;

    const y =
        evento.clientY - rect.top;


    const centroX = rect.width / 2;
    const centroY = rect.height / 2;


    const movimientoX =
        (x - centroX) / centroX;

    const movimientoY =
        (y - centroY) / centroY;


    const rotacionY =
        movimientoX * 15;

    const rotacionX =
        movimientoY * -10;


    producto3D.style.transform = `
        perspective(800px)
        rotateY(${rotacionY}deg)
        rotateX(${rotacionX}deg)
        scale(1.03)
    `;

});


/* =====================================================
   RESTAURAR PRODUCTO
===================================================== */

contenedor3D.addEventListener("mouseleave", () => {

    producto3D.style.transform = `
        perspective(800px)
        rotateY(-15deg)
        rotateX(0deg)
        scale(1)
    `;

});


/* =====================================================
   BOTÓN EXPLORAR
===================================================== */

const botonExplorar =
    document.querySelector(".explore-button");


botonExplorar.addEventListener("click", () => {

    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =====================================================
   ANIMACIÓN AL HACER SCROLL
===================================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".product, .about, .shop h2"
    );


const observador =
    new IntersectionObserver(
        (elementos) => {

            elementos.forEach((elemento) => {

                if (elemento.isIntersecting) {

                    elemento.target.style.opacity = "1";

                    elemento.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


elementosAnimados.forEach((elemento) => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(40px)";

    elemento.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observador.observe(elemento);

});


/* =====================================================
   PRODUCTOS
===================================================== */

const productos =
    document.querySelectorAll(".product");


productos.forEach((producto, indice) => {

    producto.addEventListener("click", () => {

        carrito.push({
            id: indice + 1
        });

        actualizarContador();

        producto.style.transform =
            "scale(0.97)";

        setTimeout(() => {

            producto.style.transform =
                "scale(1)";

        }, 150);

    });

});


/* =====================================================
   INICIAR
===================================================== */

actualizarContador();
