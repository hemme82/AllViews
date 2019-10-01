//Data prep

function filterData(data) {
	return data.filter((d) => {
		return (
			//d.duration >=720 && d.duration <= 800
			d.title
			//d.ccms_id.startsWith("SYO.")
			 //d.eversion <= 1800,
			//d.oneToTwoMin
			//d.eversion// >= 1900
			//d.title == "Record Health Office Visit Using Health Office Calendar Tool"
			// d.title != "Campus Learning"
		);
	});
}



//Main Function
function ready(videoViews) {
	const viewsFiltered = filterData(videoViews);
	
	console.log(viewsFiltered);

	const avgFinalPosition = d3.mean(viewsFiltered, function(d) {
		return d.final_position;
	});
	const avgDuration = d3.mean(viewsFiltered, function(d) {
		return d.duration;
	});
	const avgVidFinalPosition = d3.format('.0%')(avgFinalPosition / avgDuration);
	console.log('Average Final Position: ' + avgVidFinalPosition);
	console.log(avgFinalPosition / avgDuration);

	


	const getNum = (val) => {
		if (isNaN(val)) {
			return 0;
		}
		return val;
	}

	var avgFinalPositionArray = [];
	

	let durationMin = 0;
	let durationMax = 60;

	
	while(durationMax < 600) {
		
		const durationSum1 = viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.duration, 0);

		const avgFinalPositionByDuration = viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.final_position, 0) / durationSum1;
	
		durationMin += 60;
		durationMax +=60;
		
		const NaNCoversion = getNum(avgFinalPositionByDuration.toFixed(2));
			
		console.log("n " + NaNCoversion);
			
		avgFinalPositionArray.push(NaNCoversion);

		console.log(avgFinalPositionByDuration)
	}
	

	//console.log(avgPertCompletion);
	console.log('avgFinalPositionArray: ' + avgFinalPositionArray);
	console.log(avgFinalPositionArray.length);
	// debugger;

	// Margin Convention.
	const margin = { top: 30, right: 20, bottom: 75, left: 75 };
	const graphWidth = 600 - margin.left - margin.right;
	const graphHeight = 600 - margin.top - margin.bottom;

	

	// const colors = d3.scaleLinear().domain([ 0, avgFinalPositionArray.length ]).range([ '#90ee90', '#30c230' ]);

	// const makeYLines = () => d3.axisLeft()
	//     .scale(yScale);

	// const xScale = d3.scaleBand()
	//     .domain([0, avgFinalPositionArray.length])
	//     .range([0, width])
	//     .padding(0.8);
	// chart.append('g')
	//     .call(d3.axisLeft(yScale));

	// Draw base.
	const svg = d3
		.select('.bar-chart-container')
		.append('svg')
		.attr('width', 600) // + margin.left + margin.right)
		.attr('height', 600) // + margin.top + margin.bottom)
		.style('background', '#f4f4f4');
	
	const graph = svg.append("g")
		.attr("width", graphWidth)
    	.attr("height", graphHeight)
    	.attr("transform", `translate(${margin.left}, ${margin.top})`);

	const xAxisGroup = graph.append("g")
    .attr("transform", `translate(0,${graphHeight})`);

	const yAxisGroup = graph.append("g");

	

	// Scales.
	const x = d3.scaleBand()
		.domain(d3.range(0, avgFinalPositionArray.length))
		.range([ 0, 500 ])
		.paddingInner(0.2)
        .paddingOuter(0.2);
	

	const y = d3.scaleLinear()
		.domain([ 0, d3.max(avgFinalPositionArray) ])
		.range([graphHeight, 0]);
	console.log(d3.max(avgFinalPositionArray));

	const transition = d3.transition().duration(500);

	//join data to recs
    const rects = graph.selectAll("rect")
    	.data(avgFinalPositionArray);

	rects.style('fill', 'lightgreen')
		.attr('x', (d, i) => x(i))
		.attr('y', (d) => graphHeight - y(d))
		.transition(transition)
			.attr('width', x.bandwidth())
			.attr('height', (d) => y(d));

	rects.enter()
		.append('rect')
		.style('fill', 'lightgreen')
		.attr('width', x.bandwidth())
		.attr("y", graphHeight)
		.attr('x', (d, i) => x(i))
		
		.transition(transition)
			.attr('y', (d) => y(d))
			.attr('height', d => graphHeight - y(d));
		

	//create and call the axes// axisBottom refers to ticks being on bottom of line
    const xAxis = d3.axisBottom(x)
		.tickFormat(d => d + " min");
    const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat( d3.format(".0%"));

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

	// Add X axis label:
	graph.append("text")
		.attr("text-anchor", "end")
		.attr("x", graphWidth)
		.attr("y", graphHeight + margin.top + 20)
		.text("Video Length")
		.attr("font-family", "arial");

	// Y axis label:
	graph.append("text")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-90)")
		.attr("y", -margin.left+20)
		.attr("x", -margin.top)
		.attr("font-family", "arial")
		.text("Avg Final Position Percentage");
	
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
		

	graph.append("text")
        .attr("x", (graphWidth / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Avg Final Position by Video Length (" + numberWithCommas(viewsFiltered.length) + " views)" );

	const nested = d3.nest()
		.key(d => d.final_position)
		.sortKeys(d3.ascending)
		//.key(d => d.duration)
		.entries(viewsFiltered);
	console.log(nested);

	// const tip = d3.tip()
	// .attr("class", "tip card")
	// .html(d => {
	// 	let content = `<div> ${avgFinalPositionArray}`
	// 	return content;
	// });

	// graph.call(tip);

	// graph.selectAll("rect")
	// 	.on("mouseover", (d,i,n) => {
	// 		tip.show(d, n[i]);
	// 	})
}

	//     .append("g")
	//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

	// chart.append("g")
	//     .call(d3.axisLeft(yScale));

	//     chart.append('g')
	//         .attr('transform', `translate(0, ${height})`)
	//         .call(d3.axisBottom(xScale));

	// chart.append("g")
	//     //.attr("class", "grid")
	//     .call(makeYLines()
	//         .tickSize(-width, 0, 0)
	//         .tickFormat('')
	//     );

	// const barGroups = chart.selectAll()
	//     .data(avgFinalPositionArray)
	//     .enter()
	//     .append("g")

	// barGroups
	//     .append("rect")
	//     .style("fill", "steelblue")
	//     .attr("class", "bar")
	//     .style("border", "solid black 1px")
	//     .attr("width", xScale.bandwidth())
	//     .attr("height", function(d){
	//         return yScale(d);
	//     })
	//     .attr("x", function (d,i) {
	//         return i * 35 + 5;
	//     })
	//     .attr("y", function(d) {
	//         return (d);
	//     })
	// .attr("x", function(d, i) { return xScale(completionPerentageByDuration[i]); })
	const durationNames = [ '1min', '2min', '3min', '4min', '5min', '6min', '7min', '8min' ];


const parseVersion = (string) => (string == null ? undefined : string.replace(/\D/g, ''));

//Type Conversion
function type(d) {
	return {
		title: d.title,
		ccms_id: d.ccms_id,
		final_position: +d.final_position,
		duration: +d.duration,
		eversion: +parseVersion(d.eversion),
		dversion: +parseVersion(d.dversion),
		percentCompletion: +(d.final_position / d.duration).toFixed(3),
		lessThanOneMin: +d.duration < 60,
		oneToTwoMin: +d.duration >= 60 && d.duration < 120
	};
}

//load data
d3.csv('AllViews.csv', type).then((result) => {
	ready(result);
});
