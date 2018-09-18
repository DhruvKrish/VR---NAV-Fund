(function(){

	"use strict";
	
	var scene = document.querySelector('a-scene');

	rawData.forEach(addColumn);

	setTimeout(function(){
		var cylinders = document.querySelectorAll('a-cylinder')
		cylinders.forEach(function(element){element.emit('displayGraph');});		
	}, 4000);

	addStarsToScene();

	function addColumn(dataElement){
		var cylinder = document.createElement('a-cylinder'),
		columnRadius = 0.05;

		cylinder.setAttribute('geometry', {
			radius: columnRadius,
			height: dataElement.height
		});
		
		cylinder.setAttribute('position', {
			x: dataElement.x,
			y: dataElement.height/2,
			z: dataElement.z
		});	

		cylinder.setAttribute('opacity', 0);
		cylinder.setAttribute('material', 'transparent: true; color: ' + dataElement.color);
		cylinder.setAttribute('animation', 'property: opacity; to: 1; startEvents: displayGraph; easing: easeInSine;');

		scene.appendChild(cylinder);
	}

	function addStarsToScene(){
		
		var scene = document.querySelector('a-scene').object3D, 
			materials = [],
			geometry = new THREE.Geometry(),
			particleSize = 2;
					
		var material = new THREE.PointsMaterial({size: particleSize});
		material.color.setHSL( 0.5, 0.5, 0.5);
		
		for(var i=0; i<200; i++) {
			
			var vertex = new THREE.Vector3();
				vertex.x = Math.random() * 2000 - 1000;
				vertex.y = Math.random() * 2000;
				vertex.z = Math.random() * 2000 - 1000;

			geometry.vertices.push( vertex );			
			scene.add( new THREE.Points( geometry, material ) );		
		}
	}
	
})();

