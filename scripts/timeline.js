document.addEventListener("DOMContentLoaded", function () {
    initialize(timelineData.nodes, timelineData.links);

    console.log("Timeline initialized...");

    if (videoNode) {
        const parsedVideos = youtubeData.videos.map(video => ({
            ...video,
            parsedViews: parseVideoViews(video.views) // Parse views into integers
        }));

        const maxViews = Math.max(...parsedVideos.map(video => video.parsedViews)); // Find the max views value
        const maxViewsLog = Math.log10(maxViews); // Maximum log10 of views
        const scalingFactor = 3.5; // Exaggerate differences with a scaling factor (tune as needed)

        const truncatedVideoTitle = (title) => {
            if (title.length <= 6) return title; // If the title is short, don't truncate
            return `${title.substring(0, 10)}...${title.substring(title.length - 10)}`;
        };

        videoNode.subgroup = parsedVideos.map((video, index) => {
            const videoLogViews = Math.log10(video.parsedViews || 1); // Avoid log(0) by using || 1
            const normalizedLogSize = Math.pow(videoLogViews / maxViewsLog, scalingFactor); // Power adjustment
            const bubbleSize = Math.round(
                normalizedLogSize * (maxVideoBubbleSize - minVideoBubbleSize) + minVideoBubbleSize
            );

            return {
                id: `c${index + 1}`,
                text: truncatedVideoTitle(video.title),
                hoverHTML: `${video.views} views`,
                color: timelineColors.VideoColor,
                width: bubbleSize,
                height: bubbleSize,
                link: video.link
            };
        });
    }
});

const width = 1000;
const height = 600;
const nodeWidth = 100;
const nodeHeight = 100;
const containerPadding = 10;
const transitionDuration = 250;

const videoNode = timelineData.nodes.find(node => node.id === 'b');

let svg = null;
let simulation = null;
let link = null;
let node = null;
let label = null;
let isSubgroup = false;

// #region Initialization
function initialize(nodesData, linkDistance = 150, strength = -250, forceX = 0.1, forceY = 0.1) {
    console.log("Initializing nodes...");

    const links = nodesData.flatMap(node =>
        (node.connections || []).map(target => ({
            source: node.id,
            target: target,
            length: node.linkLength || linkDistance
        }))
    );

    d3.select("#timeline").selectAll("svg").remove();

    const nodes = nodesData.map(d => Object.create(d));
    nodes.reverse();

    const collisionPadding = 10; // Padding to keep nodes from overlapping

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(d => d.length)
        )
        .force("charge", d3.forceManyBody().strength(strength))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(d => d.homeX).strength(forceX)) // Attraction to homeX
        .force("y", d3.forceY(d => d.homeY).strength(forceY)) // Attraction to homeY
        .force("collision", d3.forceCollide().radius(d => (d.width || nodeWidth) / 2 + collisionPadding));

    svg = d3.select("#timeline")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", "link") // Add class for styling
        .attr("stroke-width", 1.5)
        .attr("stroke", "#fff"); // Default stroke color, overridden by CSS

    label = svg.append("g")
        .selectAll(".label")
        .data(links)
        .join("g");

    node = svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .call(drag(simulation))
        .on("click", function (event, d) {
            console.log("Node clicked: " + d.id);
            if (!event.defaultPrevented) {
                if (d.link) { // Open link in a new tab if Link property exists
                    console.log(`Opening link: ${d.link}`);
                    window.open(d.link, '_blank');
                    return
                }
                if (d.subgroup && d.subgroup.length > 0 && !d.isCenter) {
                    console.log("Opening subgroup for node: " + d.id);
                    openSubgroup(d);
                } else if (d.isCenter) {
                    console.log("Returning to main view from center node: " + d.id);
                    returnToMainView();
                }
            }
        });

    node.append("rect")
        .attr("rx", 50)
        .attr("width", d => d.width || nodeWidth)
        .attr("height", d => d.height || nodeHeight)
        .attr("class", "node-background")
        .attr("fill", d => d.color + "3A") // Use the color with transparency
        .attr("stroke", d => d.color); // Use full-opacity color for stroke

    node.append("foreignObject")
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', d => d.width || nodeWidth)
        .attr('height', d => d.height || nodeHeight)
        .attr('class', 'bubble-container')
        .on("mouseover", function (event, d) {
            const rect = d3.select(this.parentNode).select("rect");

            rect.transition()
                .duration(transitionDuration)
                .attr("fill", d.color) // Set fill to fully opaque color
                .attr("stroke", d.color + "3A"); // Set stroke to semi-transparent color

            const content = d3.select(this).select('.node-content');
            if (isSubgroup && d.isCenter) {
                content.html(`<p>Back <i class="fa-solid fa-rotate-left"></i></p>`); // Display return text for center node
                return
            }
            if (d.img) { // Switch to hoverHTML
                content.html(`<p>${d.hoverHTML}</p>`); // Replace image with hover text
            } else if (d.video) {
                content.html(`<p>${d.hoverHTML}</p>`); // Replace video with hover text
            } else {
                content.text(d.hoverHTML); // Replace preview text with hover text
            }

            content.classed('bubble-hovered', true); // Add 'hovered' class
        })
        .on("mouseout", function (event, d) {
            const rect = d3.select(this.parentNode).select("rect");
            rect.transition()
                .duration(transitionDuration)
                .attr("fill", d.color + "3A") // Reset fill to semi-transparent color
                .attr("stroke", d.color); // Reset stroke to fully opaque color

            const content = d3.select(this).select('.node-content');
            if (d.img) { // Restore preview state
                content.html(`<img src="${d.img}" class="bubble-image" style="border: 5px solid ${d.color};" alt="${d.previewText}">`);
            } else if (d.video) {
                content.html(`<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop alt="${d.previewText}">`);
            } else {
                content.text(d.previewText); // Restore preview text
            }

            content.classed('bubble-hovered', false); // Remove 'hovered' class
        })
        .append('xhtml:div') // Use div to support both images and text
        .attr('class', 'node-content')
        .html(d => {
            if (d.img) { // Display image if img property exists
                return `<img src="${d.img}" class="bubble-image" style="border: 5px solid ${d.color};" alt="${d.previewText}">`;
            } else if (d.video) {
                return `<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop alt="${d.previewText}">`;
            } else { // Fallback to text
                d.previewText = d.text; // Store previewText
                return `<p>${d.previewText}</p>`;
            }
        });

    // #region Physics
    simulation.on("tick", () => {
        nodes.forEach(d => {
            d.x = Math.max(containerPadding + d.width / 2, Math.min(width - d.width / 2 - containerPadding, d.x));
            d.y = Math.max(containerPadding + d.height / 2, Math.min(height - d.height / 2 - containerPadding, d.y));
        });

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        label.attr("transform", d => `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`);
        node.attr("transform", d => `translate(${d.x - d.width / 2}, ${d.y - d.height / 2})`);
    });
    // #endregion Physics
}
// #endregion Initialization

// #region Subgroups
function openSubgroup(parentNode) {
    console.log("Opened subgroup for node: " + parentNode.id);
    isSubgroup = true;

    if (videoNode && parentNode.id === 'b') {
        // Calculate circular placement for video bubbles around the video center node
        const angleIncrement = (2 * Math.PI) / videoNode.subgroup.length;
        const radius = 75; // Distance from the center node

        const subgroupNodes = videoNode.subgroup.map((sub, i) => ({
            ...sub,
            homeX: width / 2 + Math.cos(i * angleIncrement) * radius,
            homeY: height / 2 + Math.sin(i * angleIncrement) * radius,
        }));

        // Ensure the center node remains in the middle
        subgroupNodes.push({
            id: parentNode.id,
            text: parentNode.text,
            hoverHTML: parentNode.hoverHTML,
            color: parentNode.color,
            width: parentNode.width,
            height: parentNode.height,
            isCenter: true,
            homeX: width / 2,
            homeY: height / 2
        });

        console.log("Initializing subgroup for videos without links.");
        initialize(subgroupNodes, 1, -50);
    } else { // Default behavior for non-video subgroups
        const angleIncrement = (2 * Math.PI) / parentNode.subgroup.length;
        const radius = 75; // Distance from the center node
        
        const subgroupNodes = parentNode.subgroup.map((sub, i) => ({
            ...sub,
            homeX: width / 2 + Math.cos(i * angleIncrement) * radius,
            homeY: height / 2 + Math.sin(i * angleIncrement) * radius,
        }));

        parentNode.isCenter = true;
        subgroupNodes.push({
            id: parentNode.id,
            text: parentNode.text,
            hoverHTML: parentNode.hoverHTML,
            color: parentNode.color,
            width: parentNode.width,
            height: parentNode.height,
            isCenter: true,
            homeX: width / 2,
            homeY: height / 2
        });

        console.log("Initializing subgroup for node: " + parentNode.id);
        initialize(subgroupNodes);
    }
}

function returnToMainView() {
    console.log("returnToMainView called, restoring main data.");
    isSubgroup = false;

    timelineData.nodes.forEach(d => d.isCenter = false); // Remove isCenter flags
    initialize(timelineData.nodes);
}
// #endregion Subgroups

// #region Dragging
function drag(simulation) {
    function dragstarted(event) {
        console.log("Drag started on node: " + event.subject.id);
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        d3.select(this).select(".bubble-container").classed("grabbing", true);
    }

    function dragged(event) {
        console.log("Dragging node: " + event.subject.id + " to x: " + event.x + ", y: " + event.y);
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        console.log("Drag ended on node: " + event.subject.id);
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        d3.select(this).select(".bubble-container").classed("grabbing", false);
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}
// #endregion Dragging