//Data prep

function filterData(data) {
    return data.filter(d => {
        return(
            
            d.final_position 

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
    const avgPercentCompletion = d3.format(".0%")(avgFinalPosition/avgDuration)
    console.log("Average Completion: " + avgPercentCompletion)
    console.log(avgFinalPosition / avgDuration);

    // const avgCompUnderMin = viewsFiltered.filter(function(d){
    //     if(d.duration < 60){
    //         console.log(d.final_position);
            
    //     }

    // });

    var completionPerentageByDuration = [];
        
    let durationMin = 60;
    let durationMax = 120;

    //Videos under 1 minute/////////////////////////////////////
    let durationSum1 = viewsFiltered
        .filter (d => d.duration < durationMin)
        .reduce((total, d) => total + d.duration, 0);

    let avgPertCompletion = viewsFiltered
        .filter (d => d.duration < durationMin)
        .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    completionPerentageByDuration.push(avgPertCompletion.toFixed(2));
    
    //videos between 1 and 2 minutes/////////////////////////////////////
    
    durationSum1 = viewsFiltered
        .filter (d => d.duration > durationMin && d.duration < durationMax)
        .reduce((total, d) => total + d.duration, 0);

    avgPertCompletion = viewsFiltered
        .filter (d => d.duration > durationMin && d.duration < durationMax)
        .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    completionPerentageByDuration.push(avgPertCompletion.toFixed(2));
    
    // durationMin += 60;
    // durationMax += 60;
    
    // //videos between 2 and 3 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration > durationMin && d.duration < durationMax)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration > durationMin && d.duration < durationMax)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));

    // durationMin += 60;
    // durationMax += 60;

    // //videos between 3 and 4 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration > durationMin && d.duration < durationMax)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration > durationMin && d.duration < durationMax)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;

    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));

    // durationMin += 60;
    // durationMax += 60;

    // //videos between 4 and 5 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));

    // durationMin += 60;
    // durationMax += 60;

    // //videos between 5 and 6 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));


    // durationMin += 60;
    // durationMax += 60;
    
    // //videos between 6 and 7 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));

    // durationMin += 60;
    // durationMax += 60;

    // //videos between 7 and 8 minutes/////////////////////////////////////
    // durationSum1 = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.duration, 0);

    // avgPertCompletion = viewsFiltered
    //     .filter (d => d.duration < durationMin)
    //     .reduce((total, d) => total + d.final_position, 0) / durationSum1;
    
    // completionPerentageByDuration.push(avgPertCompletion.toFixed(2));
    
            
        // const finalPositionSum2 = viewsFiltered
        //     .filter (d => d.duration < 60)
        //     .map(d => += d.final_position)
        // const durationSum = viewsFiltered.reduce(function(total, d) {
        //     return total + d.duration;    
        // }, 0);
            
        //const durationSum2 = viewsFiltered.reduce((total, d) => total + d.duration, 0);

        //console.log(durationSum1);
        // console.log(durationSum);

        //console.log(avgPertCompletion);
        console.log("completionPerentageByDuration: " + completionPerentageByDuration);
        console.log(completionPerentageByDuration.length);
        // debugger;
    

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