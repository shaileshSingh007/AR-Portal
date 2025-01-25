document.addEventListener('DOMContentLoaded', () => {
    const door = document.querySelector('#door');
    const sky = document.querySelector('#portalSky');
    const scene = document.querySelector('a-scene');
    const camera = scene.querySelector('[camera]'); // Get the camera entity
  
    const doorPosition = new THREE.Vector3();
    const cameraPosition = new THREE.Vector3();
  
    // Function to check distance between camera and door
    function checkProximity() {
      // Get the world positions of the door and the camera
      door.object3D.getWorldPosition(doorPosition);
      camera.object3D.getWorldPosition(cameraPosition);
  
      // Calculate the distance between camera and door
      const distance = doorPosition.distanceTo(cameraPosition);
  
      // Transition if the camera "passes through" the door
      if (distance < 1.0) { // Adjust threshold as needed
        sky.setAttribute('visible', true);
        door.setAttribute('visible', false);
  
        // Stop further checks once the transition is triggered
        scene.removeEventListener('tick', checkProximity);
      }
    }
  
    // Continuously check proximity on every frame
    scene.addEventListener('tick', checkProximity);
  });
  