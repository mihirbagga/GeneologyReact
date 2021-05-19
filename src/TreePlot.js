import React, { Component } from "react";
import * as d3 from "d3";
import * as $ from "jquery";
import svgPanZoom from "svg-pan-zoom";
import "./style.scss";


export default class TreePlot extends Component {
  state = {
    nodeDetails: {},
    isReset: this.props.zoom, //zoom
    processImage: this.props.pimage, //process image
    materialImage: this.props.mimage, // material image
    materialColor: this.props.mcolor, // material color
    processColor: this.props.pcolor, // process color
    nodeRadius: this.props.NodeRadius, //radius of node   
  };
  constructor(props) {
    super(props);
    this.treeDiv = React.createRef();
    this.backwardTreeDiv = React.createRef();
    this.forwardTreeDiv = React.createRef();
    this.contextmenu=React.createRef();  
  }
  componentDidMount() {
    this.drawChart(this.props.data);  
  }

 
  drawChart = (chartData) => {
    const isZoom = this.state.isReset; // FOR ENABLING ZOOM
    const pImage = this.state.processImage; // FOR PROCESS ORDER IMAGE
    const mImage = this.state.materialImage; // FOR MATERIAL IMAGE
    const mColor = this.state.materialColor; // FOR MATERIAL COLOR
    const pColor = this.state.processColor; // FOR PROCESS ORDER COLOR
    const nodeRadius = this.state.nodeRadius; //NODE RADIUS
    const menu=this.props.Rclick
    var hoverMenu=this.props.Hover
    var contextMenu = document.getElementById('contextMenu');
    
    console.log('props',hoverMenu)
    const { chartType } = this.props;
    $("#backwardDiv").empty();
    let nodeDiv = this.refs.treeDiv;
    let forwardNode = this.refs.forwardTreeDiv;
    let backwardNode = this.refs.backwardTreeDiv;
    let contextmenu= this.refs.contextmenu
    let that = this;
    var TreeViewObject = function (type) {
    var THIS = this;
    THIS.type = type;
    var zoom = d3.behavior.zoom().translate([100, 100]).scale(1);
      // var zoomlistener = d3.behavior.zoom().on("zoom", redraw);
      //context menu 
     function renderContextMenu(){
               let tooltipHtml = ""; 
              menu.map((m)=>
              (
              tooltipHtml +=
                "<a href={"+m['Url']+"}>" +
                m['Text']+
                "</a> <hr>"  ))
                
             $("#keyTooltip").html(tooltipHtml);
           
    }
    //mouse over utility
    function mouseHover()
    {
      let tooltipHtml = "";
      if (hoverMenu['Process Order']) {
        for(let keys in hoverMenu['Process Order'])
        {
        tooltipHtml =
          "<div style='padding:2px'><span class='col-xs-2'>" +
          {keys}+" : </span><span class='col-xs-1 text-left'><b>" +
          hoverMenu['Process Order'][keys] +
          "</b></span></div></a>";}
      } else if (hoverMenu['Material']) {
        for(let keys in hoverMenu['Material'])
        {
        tooltipHtml =
        "<div style='padding:2px'><span class='col-xs-2'>" +
        {keys}+" : </span><span class='col-xs-1 text-left'><b>" +
        hoverMenu['Material'][keys] +
        "</b></span></div></a>";}
      }

      $("#keyTooltip").html(tooltipHtml);
      var toolTipMarginY = 0;
          toolTipMarginY = $("#wid-id-3").position().top + 150;

          let positionToolTip = THIS.type == "forward" ? -200 : 3415;
          if (d3.event.layerX <= 1000) {
            toolTip.style("left", d3.event.layerX + "px");
          } else if (d3.event.layerX > 1000 && hoverMenu['parent']) {
            toolTip.style("left", d3.event.layerX - 400 + "px");
          } else {
            toolTip.style("left", d3.event.layerX + "px");
          }
          if (d3.event.layerY > 200 && hoverMenu['children']) {
            toolTip.style("top", d3.event.layerY - 150 + "px");
          } else {
            toolTip.style("top", d3.event.layerY + 20 + "px");
          }
    }
      function redraw() {
        $("#resetZoom").show();
        var width = 1000,
          height = 450;
        var x = d3.event.translate[0],
          y = d3.event.translate[1];
        if ($(this).attr("id") === "treeviewidbackward") {
          x = (1 - d3.event.scale) * width;
        }
        $(this)
          .find("g:eq(0)")
          .attr({
            transform:
              "translate(" +
              x +
              "," +
              y +
              ")" +
              " scale(" +
              d3.event.scale +
              ")",
            viewBox: "" + 0 + " " + 0 + " " + width + " " + height,
          });
      }

      d3.select(nodeDiv)
        .append("div")
        .attr("class", "row")
        .attr("id", "mainDiv")
        .attr("align", "center");

      window.scroll({
        top: 300,
        left: 0,
        behavior: "smooth",
      });
      var m = [20, 20, 20, 20],
        w = 1300 - m[1] - m[3],
        h = 500 - m[0] - m[2],
        i = 0;

      THIS.tree = d3.layout.tree().size([h, w]); //node overlap

      var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.y, d.x];
      });

      var toolTip = d3.select(document.getElementById("gbttooltip"));
      var menuTip=d3.select(document.getElementById('contextmenu'))
      var onclickWidget = d3.select(document.getElementById("gbtonclick"));

      onclickWidget
        .on("mouseover", function (d) {
          onclickWidget.transition().duration(200).style("opacity", "1");
        })
        .on("mouseout", function (d) {
          onclickWidget
            .transition() // declare the transition properties to
            // fade-out
            // the div
            .duration(0) // it shall take 500ms
            .style("opacity", "0")
            .style("left", "0")
            .style("top", "1750px"); // and go all the way to an opacity of nil
        });

      this.drawTree = function (json) {
        if (json && json.isException) {
          return;
        }

        let node = this.type == "forward" ? forwardNode : backwardNode;
        THIS.vis = d3
          .select(node)
          .attr("align", "center")
          .append("svg:svg")
          .attr({
            id: "treeviewid" + THIS.type,
          })
          .attr("width", w + m[1] + m[3])
          .attr("height", h)
          .call(zoom.on("zoom", redraw))
          .append("svg:g")
          .attr("transform", "translate(100,20)scale(0.9,0.9)") //size variations
          // .call(zoomlistener)
          .append("svg:g")
          // .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
          // .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
          .attr("transform", "translate(180,20)scale(0.9,0.9)")
          .attr("class", "viewport");
        // build the arrow.
        d3.select("#treeviewid" + THIS.type)
          .append("svg:defs")
          .selectAll("marker")
          .data(["material_" + THIS.type, "processOrder_" + THIS.type]) // Different link/path types can be defined here
          .enter()
          .append("svg:marker") // This section adds in the arrows
          .attr("id", String)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 17) // use -10 to draw arrow in front of node
          .attr("refY", 0)
          .attr("markerWidth", 8)
          .attr("markerHeight", 8)
          .attr("fill", function (d) {
            if (d.indexOf("material") > -1) {
              return "#0000ff";
            } else {
              return "darkorange";
            }
          })
          .attr("orient", "0") // use 180 for right to left
          .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

        // add the links and the arrows
        if (json == null || json == "null") {
          $("#results, #loading").html(
            '<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert" href="#">×</a><h4 class="alert-heading"><i class="fa fa-exclamation-triangle"></i>&nbsp;OOPS!</h4><p class="text-align-left">No matching results found for selected filters.</p></div>'
          );
          $("#results").show();
          return;
        }
        $("#results, #loading").empty();
        THIS.root = json;
        THIS.root.x0 = h / 2;
        THIS.root.y0 = w;
        $("#wid-id-3, #wid-id-5, #wid-id-6").removeClass("hide");

        THIS.update(THIS.root);
        /********  PAN ZOOM ***********/
        /********* ENABLE ZOOM CONDITION******/
           if (isZoom == true) {
          if (THIS.type == "backward") {
            var panZoomBackward = PanZoomsvg("treeviewidbackward");
            // if (panZoomBackward && panZoomBackward != null) {
            // custom zoom controls
            document
              .getElementById("zoom-in")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomBackward.zoomIn();
              });

            document
              .getElementById("zoom-out")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomBackward.zoomOut();
              });

            document
              .getElementById("zoom-reset")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomBackward.resetZoom();
                panZoomBackward.resetPan();
              });
            // END custom zoom controls
            panZoomBackward.enablePan();
            // }
          } else if (THIS.type == "forward") {
            var panZoomForward = PanZoomsvg("treeviewidforward");
            // if (panZoomForward && panZoomForward != null) {
            // custom zoom controls
            document
              .getElementById("zoom-in")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomForward.zoomIn();
              });

            document
              .getElementById("zoom-out")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomForward.zoomOut();
              });

            document
              .getElementById("zoom-reset")
              .addEventListener("click", function (ev) {
                ev.preventDefault();
                panZoomForward.resetZoom();
                panZoomForward.resetPan();
              });
            // END custom zoom controls
            panZoomForward.enablePan();
            // }
          }
        } else {
        /*DISABLE ZOOM  CONDITION*/
          if (THIS.type == "backward") {
            var panZoomBackward = PanZoomsvg("treeviewidbackward");
            panZoomBackward.resetZoom();
          }
          if (THIS.type == "forward") {
            var panZoomForward = PanZoomsvg("treeviewidbackward");
            panZoomForward.resetZoom();
          }
        }
      };
      /******** END PAN ZOOM ***********/

      this.update = function (source) {
        var duration = d3.event && d3.event.altKey ? 1300 : 450;

        // Compute the new tree layout.
        var nodes = THIS.tree.nodes(THIS.root).reverse();
        // Normalize for fixed-depth.
        // var depthCounter = 0;

        nodes.forEach(function (d) {
          if (THIS.type == "forward") d.y = d.depth * 180;
          else d.y = w - d.depth * 180;
          d.numChildren = d.children ? d.children.length : 0;
          d.traceability = THIS.type;
          if (d.type === "Material") {
            d.linkColor = "darkorange";
          } else {
            d.linkColor = "#0000ff";
          }

          if (d.numChildren == 0 && d._children)
            d.numChildren = d._children.length;

          var mastername = "";
          var headername = d.keyName;
          if (
            d.subKeyName != undefined &&
            d.subKeyName != null &&
            d.subKeyName != ""
          )
            headername += " : " + d.subKeyName;

          if (d.value != undefined && d.value != null && d.value != "")
            headername += " : " + d.value;

          d.headername = headername;
          if (d.numChildren > 0) {
            var child = d.children || d._children;
            for (var j = 0; j < child.length; j++) {
              if (child[j].title) {
                var childtitle = child[j].key.split(":");
                if (childtitle.length > 1) {
                  // mastername =
                  //   '<div class="col-sm-4">' +
                  //   childtitle[0] +
                  //   " :</div>" +
                  //   '<div class="col-sm-8 text-left">' +
                  //   childtitle[1] +
                  //   "</div>" +
                  //   mastername;
                } else {
                  // mastername =
                  //   '<div class="col-sm-12 text-center">' +
                  //   child[j].key +
                  //   "</div>" +
                  //   mastername;
                }
              }
              mastername = child[j].key;
            }
            if (d.mastername != undefined)
              mastername = mastername + d.mastername;

            d.toolTipDetails = mastername;
          }
        });
        nodes.forEach(function (d) {
          var obj = d;

          while ((obj.source && obj.source.depth > 1) || obj.depth > 1) {
            obj = obj.source ? obj.source.parent : obj.parent;
          }
          d.linkColor = obj.source ? obj.source.linkColor : obj.linkColor;
        });

        // Update the nodes…
        var node = THIS.vis.selectAll("g.node").data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node
          .enter()
          .append("svg:g")
          .attr("class", "node")
          .attr("id", function (d) {
            return "node-" + d.id;
          })

          .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
          })
          .on("click", function (d) {
            //******** Remove border on all other nodes
            d3.selectAll("svg")
              .selectAll("circle")
              .transition()
              .duration(750)
              .attr("r", 10);

            // // Set circle border on selected node
            d3.select(this)
              .select("circle")
              .transition()
              .duration(750)
              .attr("r", 20)
              .style("fill", "#ccc");

            node_onClick(d);

            toolTip
              .transition() // declare the transition properties to
              .duration(500) // fade out div for 500ms
              .style("opacity", "0"); // a
          });

        var highlightForwardLink = function (
          d,
          displayColor,
          opacity,
          strokeWidth
        ) {
          link
            .filter(function (e) {
              if (d && d != null) {
                while (e.source == d) {
                  highlightForwardLink(
                    e.target,
                    displayColor,
                    opacity,
                    strokeWidth
                  );
                  return d && d != null ? true : false;
                }
              }
            })
            .transition()
            .duration(300)
            .style("stroke", function (obj) {
              if (obj.source && obj.source.type === "Material") {
                return "#0000ff";
              } else {
                return "darkorange";
              }
            })
            .style("opacity", opacity)
            .style("stroke-width", strokeWidth);
        };

        var highlightBackwardLink = function (
          d,
          displayColor,
          opacity,
          strokeWidth
        ) {
          link
            .filter(function (e) {
              if (d && d != null) {
                while (e.target == d) {
                  highlightBackwardLink(
                    e.source,
                    displayColor,
                    opacity,
                    strokeWidth
                  );
                  return d && d != null ? true : false;
                }
              }
            })
            .transition()
            .duration(300)
            .style("stroke", function (obj) {
              if (obj.source && obj.source.type === "Material") {
                return "#0000ff";
              } else {
                return "darkorange";
              }
            })
            .style("opacity", opacity)
            .style("stroke-width", strokeWidth);
        };

        var highlightLink = function (d, displayColor, opacity, strokeWidth) {
          highlightForwardLink(d, displayColor, opacity, strokeWidth);
          highlightBackwardLink(d, displayColor, opacity, strokeWidth);
        };
        nodeEnter
          .append("svg:circle")
          .attr("r", 1e-6)
          .on("mouseover", function (d) {
            node_onMouseOver(d);

            // onclickWidget
            //   .transition() // declare the transition properties to
            //   // fade-out
            //   // the div
            //   .duration(50) // it shall take 500ms
            //   .style("opacity", "0")
            //   .style("left", "0")
            //   .style("top", "1750px"); // and go all the way to an opacity of nil

            highlightLink(d, "#0080FF", 1, 10);
          })
          .on("mouseout", function (d) {
            toolTip
              .transition()
              .duration(500) // it shall take 500ms
              .style("opacity", "0"); // and go all the way to an opacity of nil

            // onclickWidget
            //   .transition() // declare the transition properties to
            //   // fade-out
            //   // the div
            //   .duration(50) // it shall take 500ms
            //   .style("opacity", "0")
            //   .style("left", "0")
            //   .style("top", "1750px"); // and go all the way to an opacity of nil
            highlightLink(d, "#6E6E6E", "0.7", 2);
          })
          .style("fill", function (d) {
            // return d.source ? d.source.linkColor : d.linkColor;
            return "#FFF";
          })
          .style("fill-opacity", ".7")
          .style("stroke", function (d) {
            return d.source ? d.source.linkColor : d.linkColor;
          });
        // add Image In Circle
        nodeEnter
          .append("svg:image")
          .attr("x", "-25")
          .attr("height", "50")
          .attr("width", "50")
          .attr("y", "-25")
          .style("borderRadius","10%")
          .on("mouseover", function (hoverMenu) {
           node_onMouseOver(hoverMenu)
            // onclickWidget
            //   .transition() // declare the transition properties to
            //   // fade-out
            //   // the div
            //   .duration(50) // it shall take 500ms
            //   .style("opacity", "0")
            //   .style("left", "0")
            //   .style("top", "1750px"); // and go all the way to an opacity of nil
          })

          // ON DOUBLE CLICK OF THE NODE
          .on("dblclick", function (d) {
            if (d.type === "Process Order")
              window.open(
                "https://mdh-dashboard.mareana.com/d/ALI0_l9Gz/bakery-control-panel-live-dashboard?orgId=1",
                "name"
              );
          })

          //ON RIGHT CLICK OF THE NODE
          .on("contextmenu", function (event) 
          {  
            showContextMenu(event)
              d3.event.preventDefault();
          
          })

          .on("mouseout", function (d) {
            toolTip
              .transition()
              .duration(500) // it shall take 500ms
              .style("opacity", "0"); // and go all the way to an opacity of nil

            highlightLink(d, "#6E6E6E", "0.7", 2);
          })
          .attr("xlink:href", function (d) {
            //return d.traceability =="backward" ? -15 : 15;
            if (d.type === "Material") {
              return mImage; // RETURN PROCESS ORDER IMAGE ;
            } else {
              return pImage; //RETURN MATERIAL IMAGE
            }
          })
          .attr("text-anchor", function (d) {
            return d.traceability == "backward" ? "end" : "start";
            //return "start";
          });
        //
        nodeEnter
          .append("svg:text")
          .attr("x", function (d) {
            //return d.traceability =="backward" ? -15 : 15;
            return d.traceability == "backward" ? 75 : -80;
            //return 15;
          })
          .attr("dy", "-0.9em")
          .attr("text-anchor", function (d) {
            return d.traceability == "backward" ? "end" : "start";
            //return "start";
          })

          .text(function (d) {
            var text = "",
              quantity = "";
            if (
              d.parent &&
              d.parent.relationshipMap &&
              d.parent.relationshipMap[d.parent.id + "-" + d.id]
            ) {
              if (d.parent.relationshipMap[d.parent.id + "-" + d.id].qty) {
                quantity = d3.format(",.2f")(
                  d.parent.relationshipMap[d.parent.id + "-" + d.id].qty
                );
              }
              text =
                quantity +
                " " +
                (d.parent.relationshipMap[d.parent.id + "-" + d.id].uom || "");
            }
            return text;
          })
          .on("mouseover", function (d) {
            node_onMouseOver(d);
            // onclickWidget.transition() // declare the transition properties to
            // // fade-out
            // // the div
            // .duration(0) // it shall take 500ms
            // .style("opacity", "0").style("left", "0").style("top", "1750px"); // and go all the way to an opacity of nil
          })
          .on("mouseout", function (d) {
            // when the mouse leaves a circle, do
            // the
            // following
            toolTip
              .transition() // declare the transition properties to
              // fade-out
              // the div
              .duration(500) // it shall take 500ms
              .style("opacity", "0"); // and go all the way to an opacity of nil
            highlightLink(d, "#6E6E6E", "0.7", 2);
          })
          .style("fill-opacity", "0")
          .style("fill", function (d) {
            //TEXT COLOR
            return "#000fff";
          });

        // Transition nodes to their new position.
        var nodeUpdate = node
          .transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
          });

        nodeUpdate
          .select("circle")
          .attr("r", function (d) {
            return nodeRadius ? nodeRadius : 10;
          })
          .style("fill", function (d) {
            return d.type === "Material"
              ? mColor
                ? mColor
                : "#0000ff"
              : pColor
              ? pColor
              : "#ff0000"; //"#0000ff" : "#ffff00";
          })
          .style("stroke", function (d) {
            if (d.isFolder == false) return "#0B3B0B";
          });

        nodeUpdate.select("text").style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node
          .exit()
          .transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

        nodeExit.select("circle").attr("r", 1e-10);

        nodeExit.select("text").style("fill-opacity", 1e-6);

        // Update the links…
        var link = THIS.vis
          .selectAll("path.link")
          .data(THIS.tree.links(nodes), function (d) {
            return d.target.id;
          });

        var rootCounter = 0;
        let markerType = THIS.type == "forward" ? "marker-end" : "marker-start";
        // Enter any new links at the parent's previous position. "material","processOrder"
        link
          .enter()
          .insert("svg:path", "g")
          .attr("class", "link")
          .attr(markerType, function (d) {
            if (d.source.type === "Material") {
              return "url(#material_" + THIS.type + ")";
            } else {
              return "url(#processOrder_" + THIS.type + ")";
            }
          })
          .attr("d", function (d) {
            var o = {
              x: source.x0,
              y: source.y0,
            };
            return diagonal({
              source: o,
              target: o,
            });
          })
          .style("stroke", function (d) {
            if (d.source.depth == 0) {
              rootCounter++;
              if (d.source) {
                if (d.source.type === "Material") {
                  return "#0000ff";
                } else {
                  return "darkorange";
                }
              } else {
                return d.source.children[rootCounter - 1].linkColor;
              }
            } else {
              if (d.target.isFolder == false) return "#0B3B0B";
              else if (d.source) {
                if (d.source.type === "Material") {
                  return "#0000ff";
                } else {
                  return "darkorange";
                }
              } else {
                return d.linkColor;
              }
            }
          })
          .style("stroke-width", function (d) {
            if (d.target.isFolder == false) return 1;
            else return 2;
          })
          .on("mouseover", function (d) {
            $("#material_" + THIS.type)
              .parent()
              .hide();
            highlightLink(d.target, "#0080FF", 1, 10);
          })
          .on("mouseout", function (d) {
            highlightLink(d.target, "#6E6E6E", "0.7", 2);
            setTimeout(function () {
              $("#material_" + THIS.type)
                .parent()
                .show();
            }, 100);
          })

          .style("stroke-linecap", "round")
          .transition()
          .duration(duration);

        // Transition links to their new position.
        link.transition().duration(duration).attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition()
          .duration(duration)
          .attr("d", function (d) {
            var o = {
              x: source.x,
              y: source.y,
            };
            return diagonal({
              source: o,
              target: o,
            });
          })
          .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        // On Node Click Event
        function node_onClick(d) {
          // onclickWidget.transition().duration(200).style("opacity", "1");
          // let positionToolTip = THIS.type == "forward" ? -200 : 3715;
          // onclickWidget
          //   .style("left", d3.event.clientX + positionToolTip + "px")
          //   .style("top", d3.event.pageY - 240 + "px");

        that.props.handleChartClick(d);
          that.setState({ nodeDetails: d });
          
         
        }
        //on right click
        function node_onRightClick() {
          $.contextMenu({
            selector: 'svg:image', 
            
            items: {
                "edit": {name: "Edit", icon: "edit"},
                "cut": {name: "Cut", icon: "cut"},
               copy: {name: "Copy", icon: "copy"},
                "paste": {name: "Paste", icon: "paste"},
                "delete": {name: "Delete", icon: "delete"},
                "sep1": "---------",
                "quit": {name: "Quit", icon: function(){
                    return 'context-menu-icon context-menu-icon-quit';
                }}
            }
        })
         
         
        }

        function node_onMouseOver(d) {
          toolTip.transition().duration(200).style("opacity", ".9");
          // $("#head, #keyTooltip").empty();
          // if (d.type == "Material") {
          //   $("#head").html(d["nodeId"]);
          // }
          if (
            d.masterKey &&
            d.masterKey != null &&
            d.masterKey != "null" &&
            !d.mastername
          ) {
            var path =
              "/EntityTracer/DRServlet?key=" +
              d.key +
              "&subKey=" +
              d.subKey +
              "&value=" +
              d.value +
              "&isFolder=" +
              d.isFolder;
            if (d.masterKey != undefined && d.masterKey != null) {
              path = path + "&masterKey=" + d.masterKey;
            }
            if (d.masterSubKey != undefined && d.masterSubKey != null) {
              path = path + "&masterSubKey=" + d.masterSubKey;
            }

            d3.json(path, function (json) {
              var validchildren = [];
              if (json != null) {
                for (let j = 0; j < json.length; j++) {
                  if (
                    json[j] != null &&
                    json[j].isFolder == true &&
                    json[j].isMaster != true
                  ) {
                    validchildren.push(json[j]);
                  } else {
                    var mastername = "";
                    if (json[j].children && json[j].children.length > 0) {
                      for (var k = 0; k < json[j].children.length; k++) {
                        var childtitle = json[j].children[k].key.split(":");
                        if (childtitle.length > 1) {
                          mastername =
                            '<div class="col-sm-4">' +
                            childtitle[0] +
                            " :</div>" +
                            '<div class="col-sm-8 text-left">' +
                            childtitle[1] +
                            "</div>" +
                            mastername;
                        } else {
                          mastername =
                            '<div class="col-sm-12 text-center">' +
                            json[j].children[k].key +
                            "</div>" +
                            mastername;
                        }
                      }
                    }
                    d.toolTipDetails = d.mastername = mastername;
                  }
                }

                d._children = validchildren;
                $("#keyTooltip").html(d.toolTipDetails);
              }
            });
          } else {
            var key;
            if (d.type === "Material") {
              key = d["nodeId"].split("|");
            } else {
              key = [d.poNo];
            }
            var materialDescription = d.matDesc || "Not available";
            var uom = "Not Available";
            var quantity = "Not Available";
            if (
              d.parent &&
              d.parent.relationshipMap &&
              d.parent.relationshipMap[d.parent.id + "-" + d.id]
            ) {
              uom = d.parent.relationshipMap[d.parent.id + "-" + d.id].uom;
              quantity = d.parent.relationshipMap[d.parent.id + "-" + d.id].qty;
            }

            let tooltipHtml = "";
            if (d.type == "Process Order") {
              tooltipHtml =
                "<div style='padding:2px'><span class='col-xs-2'>" +
                "Process Order : </span><span class='col-xs-1 text-left'><b>" +
                key[0] +
                "</b></span></div></a>";
            } else if (d.type == "Material") {
              tooltipHtml =
                "<div ><span class='col-xs-1' style='padding:5px'>" +
                d.type +
                "  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                key[0] +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Batch  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                (key[1] || "N/A") +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Material Desc  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                materialDescription +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                quantity +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>UOM  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                uom +
                "</b></span><br/></span></div>";
            }

            $("#keyTooltip").html(tooltipHtml);
          }

          var toolTipMarginY = 0;
          toolTipMarginY = $("#wid-id-3").position().top + 150;

          let positionToolTip = THIS.type == "forward" ? -200 : 3415;
          if (d3.event.layerX <= 1000) {
            toolTip.style("left", d3.event.layerX + "px");
          } else if (d3.event.layerX > 1000 && d.type == "Material") {
            toolTip.style("left", d3.event.layerX - 400 + "px");
          } else {
            toolTip.style("left", d3.event.layerX + "px");
          }
          if (d3.event.layerY > 200 && d.type == "Material") {
            toolTip.style("top", d3.event.layerY - 150 + "px");
          } else {
            toolTip.style("top", d3.event.layerY + 20 + "px");
          }
        }
      };
    };
    var panZoomsvgObject;
    var PanZoomsvg = function (id) {
      panZoomsvgObject = svgPanZoom("#" + id, {
        panEnabled: false,
        dragEnabled: false,
        controlIconsEnabled: false,
        zoomEnabled: isZoom, //lets see
        zoomScaleSensitivity: 0.2,
        minZoom: 0.1,
        maxZoom: 10,
        fit: false,
        center: false,
        destroy: function (options) {
          for (var eventName in this.listeners) {
            options.svgElement.removeEventListener(
              eventName,
              this.listeners[eventName]
            );
          }
        },
      });
      $("#" + id)
        .mousedown(function () {
          $("#" + id).attr("class", "grabbableactive");
        })
        .mouseup(function () {
          $("#" + id).attr("class", "grabbable");
        })
        .attr("class", "grabbable");
      return panZoomsvgObject;
    };
    let TreeViewBackward = {};
    const plotType = chartType;
    TreeViewBackward = new TreeViewObject(plotType);
    TreeViewBackward.drawTree(chartData);
    if (plotType == "backward") {
      var $scroll = $("#main");
      var $backwardDiv = $("#backwardDiv");
      $scroll.scrollLeft($backwardDiv.width());
    }
   
    function showContextMenu (event) {
      contextmenu.style.display = 'block';
     contextmenu.style.left = d3.event.pageX + 'px';
      contextmenu.style.top = d3.event.pageY + 'px';
      return false;
    }
  
    function hideContextMenu () {
     contextmenu.style.display = 'none';
    }
  
    function listenKeys (event) {
      var keyCode = event.which || event.keyCode;
      if(keyCode == 27){
        hideContextMenu();
      }
    }
  };
	
  render() {
    console.log("hello", this.state.nodeDetails);
    return (
      <div>
        <div id="main">
          <div id="wid-id-3">
            <div id="body" ref="treeDiv" className="row">
              <div ref="backwardTreeDiv" id="backwardDiv"></div>
              <div ref="forwardTreeDiv" id="forwardDiv"></div>
             

              <div id="gbttooltip" className="gbttooltip">
                {/* <div id="head" className="tooltipheader alert-warning"></div> */}
                <div id="federalDiv">
                  <div id="keyTooltip" className="headerattribute row"></div>
                </div>
                
              </div>
           
              <div ref="contextmenu" id="contextmenu">
                    <li>one</li>
                    <li>two</li>
                 </div>
                 
               
            </div>
          </div>
        </div>
      </div>
    );
  }
}
