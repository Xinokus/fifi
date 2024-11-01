import * as THREE from 'three';

import init from './init';

import './style.css';
import { HemisphereLight } from 'three';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.set(0,6,8) 

const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({
	color: '#444444', 
	metalness: "0", 
	roughness: "0.5",
}))

const hemilight = new THREE.HemisphereLight(0xffffff,0xffffff,0.61)
hemilight.position.set(0,50,0)
scene.add(hemilight)

const dirlight = new THREE.DirectionalLight(0xffffff, 0.54)
dirlight.position.set(-8,12,-8)
dirlight.castShadow = true
dirlight.setSize = new THREE.Vector2(1024,1024)
scene.add(dirlight)

floor.receiveShadow = 'true'
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();

/** Базовые обпаботчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
