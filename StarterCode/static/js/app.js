let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function displayCharts(id) {
    console.log(id);

   // Fetch data:
   d3.json(url).then(function(data) {
    //Everything we do with the data needs to be inside here

        let samples = data.samples;

        console.log(samples);

        // Filter the data to get the sample values, otu_ids and otu_labels for the selected ID

       

        let selectedSample = samples.filter(sample => sample.id ==id);

        //So at this line 19 we should see just the data for what is selected(ie just for 940 or just for 941)
        //And it's working, we're almost ready to do the Plotly charts
        //So now we need to index into it
        console.log(selectedSample);

        //We index in and here are the three arrays we need for the Plotly Charts:
        //The bracket[0] returns the object out of the array of one thing
        otuIds = selectedSample[0].otu_ids;
        otuLabels = selectedSample[0].otu_labels;
        sampleValues = selectedSample[0].sample_values;

        console.log(otuIds);

        //We need to slice the data to get the top 10, also reverse to it in descending order
        //And we need OTU added to the IDs
        //One way is to use .map example
        //Use the example for the horizontal bar chart
        otuIds.sort((firstNum, secondNum) => secondNum - firstNum);
        let ids = otuIds.slice(0, 10);
        ids.reverse();
        console.log(ids);

        let otuForGraph = ids.map(function(ids) {
          return `OTU: ${ids}`;
            });
            //console.log("Names and Ages:", otuLabels);



        //let axisLabels = `OTU ${ids}`
        sampleValues.sort((firstNum, secondNum) => secondNum - firstNum);
        let sampleGraph = sampleValues.slice(0, 10);
        sampleGraph.reverse();

        //otuLabels.sort((firstNum, secondNum) => secondNum - firstNum);
        let labelsGraph = otuLabels.slice(0, 10);
        labelsGraph.reverse();
        console.log(labelsGraph);

        let trace = {
            x: sampleGraph,
            y: otuForGraph,
            type: 'bar',
            text: labelsGraph,
            orientation: 'h'
          };

        let values = [trace];
          
        Plotly.newPlot("bar", values);

        //Do bubble chart
        var trace3 = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            text: labelsGraph,
            marker: {
              color: otuIds,
              size: sampleValues
            }
          };
          
          var data1 = [trace3];
          
          var layout = {
            showlegend: false,
            height: 600,
            width: 600,
            xaxis: {
                title: {
                    text: 'OTU ID'
                }
            }
          };
          
          Plotly.newPlot('bubble', data1, layout);





        //Do panel
        //The sample data is in the metadata key
        //You can't use selected sample because it's based on the sample key
        //let metadata = data.metadata;

        //console.log(metadata);

        // Filter the data to get the sample values, otu_ids and otu_labels for the selected ID

        //let selectedSample = samples.filter(sample => sample.id ==id);

        //So at this line 19 we should see just the data for what is selected(ie just for 940 or just for 941)
        //And it's working, we're almost ready to do the Plotly charts
        //So now we need to index into it
        //console.log(selectedSample);
        let metadata = data.metadata;
        let selectedMeta = metadata.filter(m => m.id ==id);
        console.log(selectedMeta);

        // Use D3 to select the table body
        //let table = d3.select("sample-metadata");
        //table.h3.append.text(selectedMeta);
      // Create a new element
      let newGrade = selectedMeta;

      // Use D3 to select the table
      let table = d3.select("sample-metadata");
      
      // Use d3 to create a bootstrap striped table
      // http://getbootstrap.com/docs/3.3/css/#tables-striped
      table.attr("class", "table table-striped");
      
      // Use D3 to select the table body
      let tbody = d3.select("panel-body");
      
      // Append one table row `tr` to the table body
      let row = tbody.append("tr");
      
      // Append one cell for the student name
      row.append("td").text(selectedMeta);
   

        // Use chaining to create a new element and set its text
        //let li2 = d3.select("ul").append("li").text("Another new item!");


        //Then to append it to the HTML we need to get a d3 reference to sample-metadata
        //Create an H5 and append. You can set up it as a table or a list





    });
}



function optionChanged(selectedId) {

    console.log(selectedId);

    displayCharts(selectedId);

    //Because we do not have access to data we need to fetch it again
    //Anything we do with the data needs to be inside this promise

}

function init () {

    d3.json(url).then(function(data)  {
        console.log(data);
        // Fill the dropdown menu with all the IDs

        let dropdownMenu = d3.select("#selDataset");

        console.log(data.names);

        let ids = data.names;

        for (let i=0; i<ids.length; i++) {

            dropdownMenu.append("option").text(ids[i]).property("value", ids[i]);
        }

        first = ids[0];



        //Display the charts and panel with the first ID

        displayCharts(first);

    });
}

init()




