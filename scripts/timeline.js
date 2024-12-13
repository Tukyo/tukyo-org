document.addEventListener("DOMContentLoaded", function () {
    initialize(false, timelineData.nodes, timelineData.links);

    console.log("Timeline initialized...");

    if (videoNode) {
        const parsedVideos = youtubeData.videos.map(video => ({
            ...video,
            parsedViews: parseVideoViews(video.views) // Parse views into integers
        }));

        const maxViews = Math.max(...parsedVideos.map(video => video.parsedViews));
        const maxViewsLog = Math.log10(maxViews);
        const scalingFactor = 3.5;

        videoNode.subgroup = parsedVideos.map((video, index) => {
            const videoLogViews = Math.log10(video.parsedViews || 1);
            const normalizedLogSize = Math.pow(videoLogViews / maxViewsLog, scalingFactor);
            const bubbleSize = Math.round(
                normalizedLogSize * (maxVideoBubbleSize - minVideoBubbleSize) + minVideoBubbleSize
            );

            return {
                id: `c${index + 1}`,
                text: video.title,
                hoverHTML: `${video.views} views`,
                color: timelineColors.VideoColor,
                width: bubbleSize,
                height: bubbleSize,
                link: video.link,
                video: video.videoPreview || null,
                mobileFallback: video.mobileFallback || null
            };
        });

        d3.selectAll(".video-node")
            .on("mouseover", function (event, d) {
                const rect = d3.select(this.parentNode).select("rect");

                rect.transition()
                    .duration(transitionDuration)
                    .attr("fill", d.color)
                    .attr("stroke", d.color + "3A");

                const content = d3.select(this).select('.node-content');

                if (d.video && d.mobileFallback) {
                    content.html(
                        isMobileDevice()
                            ? `<img src="${d.mobileFallback}" class="bubble-image" style="border: 5px solid ${d.color};">`
                            : `<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop playsinline></video>`
                    );
                } else {
                    content.html(`<p>${d.hoverHTML}</p>`);
                }

                content.classed('bubble-hovered', true);
            })
            .on("mouseout", function (event, d) {
                const rect = d3.select(this.parentNode).select("rect");

                rect.transition()
                    .duration(transitionDuration)
                    .attr("fill", d.color + "3A")
                    .attr("stroke", d.color);

                const content = d3.select(this).select('.node-content');

                if (d.video) { content.html(`<p>${d.hoverHTML}</p>`); }

                content.classed('bubble-hovered', false);
            })
            .append('xhtml:div')
            .attr('class', 'node-content')
            .style('padding', '10px')
            .html(d => {
                if (d.video && d.mobileFallback) {
                    return isMobileDevice()
                        ? `<img src="${d.mobileFallback}" class="bubble-image" style="border: 5px solid ${d.color};">`
                        : `<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop playsinline></video>`;
                } else {
                    return `<p>${d.hoverHTML}</p>`;
                }
            });
    }
});

const nodeWidth = 100; // Fallback - Should be defined in timelineData.js
const nodeHeight = 100; // Fallback - Should be defined in timelineData.js
const transitionDuration = 250;

const videoNode = timelineData.nodes.find(node => node.id === 'b');

let svg = null;
let simulation = null;
let link = null;
let node = null;
let label = null;
let isSubgroup = false;

let currentNodesData = null;
let currentContainerHeight = null;
let currentLinkDistance = null;
let currentStrength = null;
let currentForceX = null;
let currentForceY = null;

window.addEventListener('resize', debounce(() => { initialize(isSubgroup, currentNodesData, currentLinkDistance, currentStrength, currentContainerHeight, currentForceX, currentForceY); }, 250));
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// #region Initialization
function initialize(isSubgroup, nodesData, linkDistance = 150, strength = -2050, containerHeight = 2000, forceX = 0.1, forceY = 0.1, scrollToView = false, isCentered = false) {
    console.log("Initializing nodes...");
    console.log("Is Subgroup? " + isSubgroup);

    const containerWidth = window.innerWidth;

    const minNodeScale = 0.75;
    const maxNodeScale = 1;
    const scalingFactor = 1.5;
    const defaultWindowWidth = 1920;
    const sizeAdjustment = Math.max(minNodeScale, Math.min(Math.pow(containerWidth / defaultWindowWidth, 1 / scalingFactor), maxNodeScale)); // Adjust node sizes based on screen width

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

    // #region Forces
    const collisionPadding = 10; // Padding to keep nodes from overlapping
    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(d => d.length)
        )
        .force("charge", d3.forceManyBody().strength(strength))
        .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
        .force("x", d3.forceX(d => d.homeX).strength(forceX)) // Attraction to homeX
        .force("y", d3.forceY(d => d.homeY).strength(forceY)) // Attraction to homeY
        .force("collision", d3.forceCollide().radius(d => (d.width || nodeWidth) / 2 + collisionPadding));
    // #endregion Forces

    // #region Container
    svg = d3.select("#timeline")
        .append("svg")
        .attr("viewBox", [0, 0, containerWidth, containerHeight])
        .attr("height", containerHeight)
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
    // #endregion Container

    // #region Nodes
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
        .attr("rx", d => Math.min(d.width, d.height) / 2)
        .attr("width", d => d.width * sizeAdjustment || nodeWidth)
        .attr("height", d => d.height * sizeAdjustment || nodeHeight)
        .attr("class", "node-background")
        .attr("fill", d => d.color + "3A") // Use the color with transparency
        .attr("stroke", d => d.color); // Use full-opacity color for stroke
    node.append("foreignObject")
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', d => d.width * sizeAdjustment || nodeWidth)
        .attr('height', d => d.height * sizeAdjustment || nodeHeight)
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
                isMobileDevice()
                    ? content.html(`<img src="${d.mobileFallback}" class="bubble-image" style="border: 5px solid ${d.color};" alt="${d.previewText}">`)
                    : content.html(`<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop playsinline alt="${d.previewText}">`);
            } else {
                content.text(d.previewText); // Restore preview text
            }

            content.classed('bubble-hovered', false); // Remove 'hovered' class
        })
        .append('xhtml:div') // Use div to support both images and text
        .attr('class', 'node-content')
        .style('padding', isSubgroup ? '0px' : '10px')
        .html(d => {
            if (d.img) { // Display image if img property exists
                return `<img src="${d.img}" class="bubble-image" style="border: 5px solid ${d.color};" alt="${d.previewText}">`;
            } else if (d.video) {
                return isMobileDevice()
                    ? `<img src="${d.mobileFallback}" class="bubble-image" style="border: 5px solid ${d.color};" alt="${d.previewText}">`
                    : `<video src="${d.video}" class="bubble-image" style="border: 5px solid ${d.color};" autoplay muted loop playsinline alt="${d.previewText}">`;
            } else { // Fallback to text
                d.previewText = d.text; // Store previewText
                return `<p>${d.previewText}</p>`;
            }
        });
    // #endregion Nodes

    // #region Physics
    const containerPadding = 5;
    simulation.on("tick", () => {
        nodes.forEach(d => {
            // Ensure nodes stay within container bounds
            d.x = Math.max(containerPadding + (d.width * sizeAdjustment) / 2, Math.min(containerWidth - (d.width * sizeAdjustment) / 2 - containerPadding, d.x));
            d.y = Math.max(containerPadding + (d.height * sizeAdjustment) / 2, Math.min(containerHeight - (d.height * sizeAdjustment) / 2 - containerPadding, d.y));
        });

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        label.attr("transform", d => `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`);
        node.attr("transform", d => `translate(${d.x - (d.width * sizeAdjustment) / 2}, ${d.y - (d.height * sizeAdjustment) / 2})`);
    });
    // #endregion Physics

    // Store current values for resize handling
    currentNodesData = nodesData;
    currentContainerHeight = containerHeight;
    currentLinkDistance = linkDistance;
    currentStrength = strength;
    currentForceX = forceX;
    currentForceY = forceY;

    if (scrollToView) {
        $('html, body').animate({
            scrollTop: $('#timeline').offset().top - (isCentered ? $(window).height() / 2 - $('#timeline').height() / 2 + 70 : 70)
        }, 50);
    }
}
// #endregion Initialization

// #region Subgroups
function openSubgroup(parentNode) {
    console.log("Opened subgroup for node: " + parentNode.id);
    isSubgroup = true;

    const subgroupForceX = 0.1;
    const subgroupForceY = 0.1;

    if (videoNode && parentNode.id === 'b') {
        const angleIncrement = (2 * Math.PI) / videoNode.subgroup.length; // Calculate circular placement for video bubbles around the video center node
        const radius = 200; // Distance from the center node

        const subgroupWidth = 500;
        const subgroupHeight = 900;
        const subgroupLinkDistance = 1;
        const subgroupStrength = -50;

        const subgroupNodes = videoNode.subgroup.map((sub, i) => ({
            ...sub,
            homeX: subgroupWidth / 2 + Math.cos(i * angleIncrement) * radius,
            homeY: subgroupHeight / 2 + Math.sin(i * angleIncrement) * radius,
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
            homeX: subgroupWidth / 2,
            homeY: subgroupHeight / 2
        });

        // Store current values for resize handling
        currentNodesData = subgroupNodes;
        currentContainerHeight = subgroupHeight;
        currentLinkDistance = subgroupLinkDistance;
        currentStrength = subgroupStrength;
        currentContainerHeight = subgroupHeight;
        currentForceX = subgroupForceX;
        currentForceY = subgroupForceY;

        console.log("Initializing subgroup for videos without links.");
        initialize(isSubgroup, subgroupNodes, 1, -50, subgroupHeight, subgroupForceX, subgroupForceY, true, true);
    } else { // Default behavior for non-video subgroups
        const angleIncrement = (2 * Math.PI) / parentNode.subgroup.length;
        const radius = 75; // Distance from the center node

        const subgroupWidth = 500;
        const subgroupHeight = 650;
        const subgroupLinkDistance = 150;
        const subgroupStrength = -2050;

        const subgroupNodes = parentNode.subgroup.map((sub, i) => ({
            ...sub,
            homeX: subgroupWidth / 2 + Math.cos(i * angleIncrement) * radius,
            homeY: subgroupHeight / 2 + Math.sin(i * angleIncrement) * radius,
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
            homeX: subgroupWidth / 2,
            homeY: subgroupHeight / 2
        });

        currentNodesData = subgroupNodes;
        currentContainerHeight = subgroupHeight;
        currentLinkDistance = subgroupLinkDistance;
        currentStrength = subgroupStrength;
        currentContainerHeight = subgroupHeight;
        currentForceX = subgroupForceX;
        currentForceY = subgroupForceY;

        console.log("Initializing subgroup for node: " + parentNode.id);
        initialize(isSubgroup, subgroupNodes, 150, -2050, subgroupHeight, subgroupForceX, subgroupForceY, true, true);
    }
}
function returnToMainView() {
    console.log("returnToMainView called, restoring main data.");
    isSubgroup = false;

    currentNodesData = timelineData.nodes;
    currentContainerHeight = 2000;
    currentLinkDistance = 150;
    currentStrength = -2050;
    currentForceX = 0.1;
    currentForceY = 0.1;

    timelineData.nodes.forEach(d => d.isCenter = false); // Remove isCenter flags
    initialize(isSubgroup, timelineData.nodes, currentLinkDistance, currentStrength, currentContainerHeight, currentForceX, currentForceY, true, false);
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