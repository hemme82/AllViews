//Data prep

function filterData(data) {
	return data.filter((d) => {
		return (
			 //d.title
			//d.eversion >= 1800
			//
			d.eversion// >= 1900
			// d.title == "Campus Learning"
			// d.title != "Campus Learning"
		);
	});
}

function prepareBarChartData(data) {
	//     const rolledUp = d3.rolledUp(
	//         data,
	//         reducer,
	//         key
	// if(data.lessThanOneMin) {
	//     console.log(data.title);
	// }
}

//Main Function

function ready(videoViews) {
	const viewsFiltered = filterData(videoViews);
	const barChartData = prepareBarChartData(viewsFiltered);
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

	// const avgCompUnderMin = viewsFiltered.filter(function(d){
	//     if(d.duration < 60){
	//         console.log(d.final_position);

	//     }

	// });

	var avgFinalPositionArray = [];

	let durationMin = 0;
	let durationMax = 60;

	//Videos under 1 minute/////////////////////////////////////

	let durationSum1 = viewsFiltered
		.filter((d) => d.duration > durationMin && d.duration < durationMax)
		.reduce((total, d) => total + d.duration, 0);

	let avgFinalPositionByDuration =
		viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.final_position, 0) / durationSum1;

	avgFinalPositionArray.push(avgFinalPositionByDuration.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 1 and 2 minutes/////////////////////////////////////

	durationSum1 = viewsFiltered
		.filter((d) => d.duration > durationMin && d.duration < durationMax)
		.reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.final_position, 0) / durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 2 and 3 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered
		.filter((d) => d.duration > durationMin && d.duration < durationMax)
		.reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.final_position, 0) / durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 3 and 4 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered
		.filter((d) => d.duration > durationMin && d.duration < durationMax)
		.reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered
			.filter((d) => d.duration > durationMin && d.duration < durationMax)
			.reduce((total, d) => total + d.final_position, 0) / durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 4 and 5 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.final_position, 0) /
		durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 5 and 6 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.final_position, 0) /
		durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 6 and 7 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.final_position, 0) /
		durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	durationMin += 60;
	durationMax += 60;

	//videos between 8 and 9 minutes/////////////////////////////////////
	durationSum1 = viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.duration, 0);

	avgPertCompletion =
		viewsFiltered.filter((d) => d.duration < durationMin).reduce((total, d) => total + d.final_position, 0) /
		durationSum1;

	avgFinalPositionArray.push(avgPertCompletion.toFixed(2));

	// const finalPositionSum2 = viewsFiltered
	//     .filter (d => d.duration < 60)
	//     .map(d => += d.final_position)
	// const durationSum = viewsFiltered.reduce(function(total, d) {
	//     return total + d.duration;
	// }, 0);

	// const durationSum2 = viewsFiltered.reduce((total, d) => total + d.duration, 0);

	//console.log(durationSum1);
	// console.log(durationSum);

	//console.log(avgPertCompletion);
	console.log('avgFinalPositionArray: ' + avgFinalPositionArray);
	console.log(avgFinalPositionArray.length);
	// debugger;

	// Margin Convention.
	const margin = { top: 20, right: 20, bottom: 100, left: 100 };
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
		.range([graphHeight, 0 ]);
	console.log(d3.max(avgFinalPositionArray));

	//join data to recs
    const rects = graph.selectAll("rect")
    	.data(avgFinalPositionArray);

	rects.style('fill', 'lightgreen')
		.attr('width', x.bandwidth())
		.attr('height', (d) => y(d))
		.attr('x', (d, i) => x(i))
		.attr('y', (d) => graphHeight - y(d));

	rects.enter()
		.append('rect')
		.style('fill', 'lightgreen')
		.attr('width', x.bandwidth())
		.attr('height', d => graphHeight - y(d))
		.attr('x', (d, i) => x(i))
		.attr('y', (d) => y(d));

	//create and call the axes// axisBottom refers to ticks being on bottom of line
    const xAxis = d3.axisBottom(x)
		.tickFormat(d => d + " min");
    const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat( d3.format(".0%"));

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

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
}

const parseVersion = (string) => (string == null ? undefined : string.replace(/\D/g, ''));

//Type Conversion
function type(d) {
	return {
		title: d.title,
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
