//Data prep

function filterData(data) {
    return data.filter(d => {
        return(
            d.duration < 60
            //d.eversion //>= 1900
            //d.title == "Campus Learning"
            // d.title != "Campus Learning"


        );
    });
}

function prepareBarChartData(data) {
//     const rolledUp = d3.rolledUp(
//         data,
//         reducer,
//         key
    if(data.lessThanOneMin) {
        console.log(data.title);
    }
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
    const avgPercentCompletion = d3.format(".0%")(avgFinalPosition/avgDuration)
    console.log("Average Completion: " + avgPercentCompletion)
    console.log(avgFinalPosition / avgDuration);
    

}

const parseVersion = (string) => (string == null) ? undefined : string.replace(/\D/g,'')

    

//Type Conversion
function type(d) {
    return{
        title: d.title,
        final_position: +d.final_position,
        duration: +d.duration,
        eversion: +parseVersion(d.eversion),
        dversion: +parseVersion(d.dversion),
        percentCompletion: +(d.final_position / d.duration).toFixed(3),
        lessThanOneMin: +d.duration < 60,
        oneToTwoMin: +d.duration >=60 && d.duration <120

    }
}

//load data
d3.csv("AllViews.csv", type).then(result => {
    ready(result);
});