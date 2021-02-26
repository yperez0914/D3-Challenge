// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg if not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // create axis title
    // var xLabel = -50;
    // var yLabel = svgHeight / 2;

    // chartGroup.append('g')
    // .attr("transform", `translate(${xLLabel}, ${yLabel} )`)
    // .append("text")
    // .attr('text-anchor', 'middle')
    // .attr("transform", 'rotate(-90)')
    // .attr("font-size", "30px")
    // .text("Lacks Healthcare (%)");
  
    // Read CSV
    d3.csv("assets/data/data.csv").then(function(healthData) {
  
        healthData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
          });
  
        // create scales
        var xScale = d3.scaleBand()
          .domain(d3.extent(healthData, d=>d.poverty))
          .range([0, width]);
  
        var yScale = d3.scaleLinear()
          .domain([0, d3.max(healthData, d => d.healthcare)])
          .range([height, 0]);
        
        // create axes
        var xAxis = d3.axisBottom(xScale).ticks(10);
        var yAxis = d3.axisLeft(yScale);
  
        // append axes
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
  
        chartGroup.append("g")
          .call(yAxis);
   
  
        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
          .data(healthData)
          .enter()
          .append("circle")
          .attr("cx", d => xScale(d.poverty))
          .attr("cy", d => yScale(d.healthcare))
        // .attr("cx", d => d.poverty)
        // .attr("cy", d => d.healthcare)
          .attr("r", "15")
          .classed("stateCircle", true);
          
        circlesGroup.append("text")
          .text(d=>d.abbr)
          .attr("font-size", "10px")
          .classed("stateText", true);
  
    //     // Step 1: Initialize Tooltip
    //     var toolTip = d3.tip()
    //       .attr("class", "tooltip")
    //       // instead of event.pageX, can use offset
    //       .offset([80, -60])
    //       .html(function(d) {
    //         // hr is horizontal rule and creates a line to divide
    //         return (`<strong>${d.medals}<strong>`);
    //       });
  
    //     // Step 2: Create the tooltip in chartGroup.
    //     chartGroup.call(toolTip);
  
    //     // Step 3: Create "mouseover" event listener to display tooltip
    //     circlesGroup.on("mouseover", function(d) {
    //       toolTip.show(d, this);
    //     })
    //     // Step 4: Create "mouseout" event listener to hide tooltip
    //       .on("mouseout", function(d) {
    //         toolTip.hide(d);
    //       });

    // .catch(function(error) {
    //     console.log(error);
    // });
    });
}
    // When the browser loads, makeResponsive() is called.
    makeResponsive();

    // When the browser window is resized, makeResponsive() is called.
    d3.select(window).on("resize", makeResponsive);
  
  