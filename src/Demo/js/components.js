AFRAME.registerComponent('show-graph', {  
	init() {

		this.el.addEventListener('click', () => {
			
			var cameraPosition = document.querySelector('[camera]').getAttribute('position'),
			chartPlaneWrapper = document.getElementById('chartPlaneWrapper'),
			newPosition = {
				x: cameraPosition.x, 
				y: cameraPosition.y, 
				z: cameraPosition.z - 3
			};
					
			RenderChartUsingD3();

			var animationDetails = 'property: position; startEvents: changeDisplay; to: ' + newPosition.x + ' ' + newPosition.y + ' ' + newPosition.z + ' dur: 3000';
			chartPlaneWrapper.setAttribute('visible', 'true');
			chartPlaneWrapper.setAttribute('animation',  animationDetails);
			chartPlaneWrapper.emit('changeDisplay');		
						
		});

		function RenderChartUsingD3(){
			
			document.getElementById('chartBars').innerHTML='';

			var chart = d3.select("#chartBars")
				.selectAll()
				.data(chartData)
				.enter()
				.append("div")
				.classed("bar-container", true)
				.append("div")
				.classed("bar", true)
				.style("width", function(d) { return d.value + "%"; })
				.text(function(d) { return d.year; });
			
			document.getElementById('chartPlaneWrapper').setAttribute('visible', true);
		}

	}
});	


AFRAME.registerComponent('hide-graph', {  
	init() {
        this.el.addEventListener('click', () => { 
		
			var chartPlaneWrapper = document.getElementById('chartPlaneWrapper');
			chartPlaneWrapper.setAttribute('animation', 'property: position; startEvents: changeDisplay; to: -150 0 0; dur: 4000');
			chartPlaneWrapper.emit('changeDisplay');
		  
			setTimeout(function(){
				document.getElementById('chartPlaneWrapper').setAttribute('visible', false);
			}, 4000);
		 });
    }
});