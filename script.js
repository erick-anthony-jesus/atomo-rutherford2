import*as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()




/**** Particulas */
/*
const particulas = () => {
    const geometria = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 5000; i++) {
        vertices.push(
            Math.random() * 400 - 200, // Generar coordenadas x en un rango de -200 a 200
            Math.random() * 400 - 200, // Generar coordenadas y en un rango de -200 a 200
            Math.random() * 400 - 200 // Generar coordenadas z en un rango de -200 a 200
        );
    }

    geometria.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 5 // Tamaño de las partículas
    });

    const puntos = new THREE.Points(geometria, material);

    scene.add(puntos);

    return puntos;
};

const particulas1 = particulas();*/
const particulasGeometria = new THREE.BufferGeometry();
const contador = 2000;

const posiciones = new Float32Array(contador * 3);

for (let i = 0; i < contador * 3; i++)
{
    posiciones[i] = (Math.random() - 0.5) * 80
}

particulasGeometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3))


const particulasMaterial = new THREE.PointsMaterial({
    size: 0.04,
    sizeAttenuation: true,
    depthTest: false,
    blending: THREE.AdditiveBlending
    //alphaTest: 0.001
})

const particulas = new THREE.Points(particulasGeometria, particulasMaterial);
scene.add(particulas)




// Lights
const luzAmbiente = new THREE.AmbientLight(0x777777)
scene.add(luzAmbiente)

const puntoLuz = new THREE.PointLight(0xffffff, 5, 0)
puntoLuz.position.set(1, 2, -2)

scene.add(puntoLuz)





/*** Atomo */
const atomo = (size, posicionX, posicionY, posicionZ, color) => {
    const geometry = new THREE.SphereGeometry(size, 128, 128);
    const material = new THREE.MeshStandardMaterial({
        color: color,
     
    });

    const mesh = new THREE.Mesh(geometry, material);
 
    mesh.position.set(posicionX, posicionY, posicionZ);

    scene.add(mesh);
    return mesh;
};

const atomo1 = atomo(1, 0, 0, 0, "#0061a9");
const atomo2 = atomo(1, 1.5, 0, 0, "red");
const atomo3 = atomo(1, -1.5, 0, 0, "red");
const atomo4 = atomo(1, -1.5, 0, -2, "blue");
const atomo5 = atomo(1, -1.5, 0, 2, "blue");
const atomo6 = atomo(1, 0, 0, 2, "red");
const atomo7 = atomo(1, 1.5, 0, 2, "blue");
const atomo8 = atomo(1, 0, 0, -2, "red");
const atomo9 = atomo(1, 1.5, 0, -2, "blue");

/** Arriba */
const atomoArriba1 = atomo(1, 0, 1, 0, "red");
const atomoArriba2 = atomo(1, 1, 1, 1, "blue");
const atomoArriba3 = atomo(1, 1, 1, -1, "blue");
const atomoArriba4 = atomo(1, -1, 1, -1, "blue")
const atomoArriba5 = atomo(1, -1, 1, 1, "blue");
/*** Abajo */
const atomoAbajo1 = atomo(1, 0, -1, 0, "red");

/***** anilo */

const crearAnillos = (width, color, rotarX, rotarY, rotarZ) => {
    const geometria = new THREE.TorusGeometry(width, 0.02, 16, 200)
    const material = new THREE.MeshBasicMaterial({
        color: color
    })
    

    const mesh = new THREE.Mesh(geometria, material);
    
    mesh.rotation.set(rotarX, rotarY, rotarZ);
    //mesh.geometria.rotateY(rotarY);
    //mesh.geometria.rotateZ(rotarZ);    
    scene.add(mesh)
    return mesh;
}



//const anillo1 = crearAnillos(10, "white", 0, 0, 0);
const anillo2 = crearAnillos(10, "white",  0, Math.PI  / 2, 0); // medio
const anillo3 = crearAnillos(10, "white",  Math.PI /2,  Math.PI / 4, 0);
const anillo4 = crearAnillos(10, "white",  Math.PI /2,  - Math.PI / 4, 0);




/***** Rotacion del Atomo respecto a mi Anillo */
const grupoAnillo = new THREE.Group();
scene.add(grupoAnillo)


/**** Anillo y atomo izquierda */
const grupoAnillo2 = new THREE.Group();
scene.add(grupoAnillo2)



const atomoElectron = atomo(0.6, 0, 10, 0, "yellow");
const atomoElectronIzquierda = atomo(0.6, 0, 10, 0, "yellow");
const atomoElectronDerecha = atomo(0.6, 0, 10, 0, "yellow");


grupoAnillo.add(anillo2);
grupoAnillo.add(atomoElectron);


grupoAnillo2.add(anillo3);
grupoAnillo2.add(atomoElectronIzquierda);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Fullscreen
 */
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -30
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





/**
 * Animate
 */
const clock = new THREE.Clock()


// Variables de mi orbita
 
//grupoAnillo2.rotation.set(  Math.PI /2,  - Math.PI / 4, 0);


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    atomoElectronIzquierda.position.x = Math.sin(5*elapsedTime) * -7;
    atomoElectronIzquierda.position.y = Math.sin(5*elapsedTime) * 7;
    atomoElectronIzquierda.position.z = Math.cos(5 * elapsedTime) * 10;
    

    atomoElectronDerecha.position.x = Math.sin(2* elapsedTime) * 7;
    atomoElectronDerecha.position.y = Math.sin(2*elapsedTime) * 7;
    atomoElectronDerecha.position.z = Math.cos(2 * elapsedTime) * 10;


    //grupoAnillo.rotation.y = elapsedTime * 0.2; // Rotación en el eje Y
    //grupoAnillo2.rotation.x = elapsedTime * 2.0;
    grupoAnillo.rotation.x = elapsedTime * 3.0; // Rotación en el eje X
  
    controls.update()
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()