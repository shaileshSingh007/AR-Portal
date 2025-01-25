document.addEventListener('DOMContentLoaded', () => {
    const door = document.querySelector('#door');
    const sky = document.querySelector('#portalSky');
    const scene = document.querySelector('a-scene');
    const camera = document.querySelector('[camera]'); // Automatically added by A-Frame
  
    const doorPosition = new THREE.Vector3();
    const cameraPosition = new THREE.Vector3();
  
    let isPlaced = false; // Track whether the door is placed on the surface
  
    // Add surface detection and object placement
    scene.addEventListener('arjs-hit-test-start', (e) => {
      const hit = e.detail.intersection; // Get hit-test intersection
      if (hit && !isPlaced) {
        const position = hit.point;
        door.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
        door.setAttribute('visible', true);
        isPlaced = true; // Prevent further placement
      }
    });
   console.log(hit);
    // Check proximity to the door
    function checkProximity() {
      if (!isPlaced) return;
  
      // Get world positions of the door and camera
      door.object3D.getWorldPosition(doorPosition);
      camera.object3D.getWorldPosition(cameraPosition);
      
      // Calculate the distance
      const distance = doorPosition.distanceTo(cameraPosition);
      console.log(distance)
      // Trigger transition if the camera passes through the door
      if (distance < 1.0) { // Adjust threshold as needed
        sky.setAttribute('visible', true);
        door.setAttribute('visible', false);
  
        // Stop further checks
        scene.removeEventListener('tick', checkProximity);
      }
    }
  
    // Continuously check proximity on every frame
    scene.addEventListener('tick', checkProximity);
  });
  