import React from "react";
import {
  FaPlus,
  FaMinus,
  FaExpandArrowsAlt,
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltRight 
} from "react-icons/fa";
import {
  IconButton,
  Container,
  Tooltip,
  Typography
} from "@material-ui/core";
import TreePlot from "./TreePlot";
import "./style.scss";

function Tree(props) {
var Legend=[]

 if(props.config.l)
 {
  var L = [...props.config.l];
  Legend=L
 }
const isLegend =Legend.length
const isZoom = props.config.zoom;

  return (
    <div className="page-container">
      <Container maxWidth={false}>
        <div className="chart-tree-d3">
          <div>
            <div className="chart-legends">
             
              <div>
              <center>
              { isLegend>0 ?
                 (
                <div style={{backgroundColor:'lightblue',display:'inline-block',height:'40px',width:'100%',borderRadius:'15px',textAlign:'center'}}>
                 
                  {Legend.map((ar) => (
                    <span>
                     
                      <img
                        x="-12"
                        height="30"
                        width="30"
                        y="-12"
                        src={ar.img}
                        textAnchor="start"
                        style={{borderRadius:"50%"}}
                      />{'   '}
                    <b>{ar.name}</b> 
                    </span>
                  ))}
                  <span>
              <FaLongArrowAltRight
                style={{ color: "rgb(0, 0, 255)" }}
              />{" "}
              <b>Input</b>
            </span>{" "}
            <span>
              <FaLongArrowAltRight style={{ color: "darkorange" }} />{" "}
              <b>Output</b>
            </span>
                 
                </div>
                ):(<div></div>
               )
              }  </center>
              </div>
            </div>
          
            {isZoom ? (
              <div id="custom-zoom-controls" style={{marginTop:'15px'}}>
                <div id="zoom-out">
                  <Tooltip
                    title={<span style={{ fontSize: "12px" }}>Zoom Out</span>}
                  >
                    <IconButton
                      color="primary"
                      aria-label="zoomout"
                      // aria-describedby={""}
                    >
                      <FaMinus />
                    </IconButton>
                  </Tooltip>
                </div>
                <div id="zoom-reset">
                  <Tooltip
                    title={<span style={{ fontSize: "12px" }}>Reset</span>}
                  >
                    <IconButton color="primary" aria-label="zoomout">
                      <FaExpandArrowsAlt />
                    </IconButton>
                  </Tooltip>
                </div>
                <div id="zoom-in">
                  <Tooltip
                    title={<span style={{ fontSize: "12px" }}>Zoom In</span>}
                  >
                    <IconButton color="primary" aria-label="zoomin">
                      <FaPlus />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div id="custom-genealogy">
              <div style={{ paddingRight: "63px" }}>
                <Tooltip
                  title={
                    <span style={{ fontSize: "12px" }}>Backward Genealogy</span>
                  }
                >
                  <IconButton
                    color="primary"
                    aria-label="zoomout"
                    id="backward-genealogy"
                  >
                    <FaArrowLeft />
                  </IconButton>
                </Tooltip>
              </div>
              <div onClick={(e) => this.getPlot("forward")}>
                <Tooltip
                  title={
                    <span style={{ fontSize: "12px" }}>Forward Genealogy</span>
                  }
                >
                  <IconButton
                    color="primary"
                    aria-label="zoomout"
                    id="forward-genealogy"
                  >
                    <FaArrowRight />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div>
              <TreePlot
                data={props.config.data}
                chartType={props.config.chartType}
                handleChartClick={props.config.handleChartClick}
                zoom={props.config.zoom}
                mimage={props.config.mimage}
                pimage={props.config.pimage}
                mcolor={props.config.mcolor}
                pcolor={props.config.pcolor}
                NodeRadius={props.config.NodeRadius}
                Rclick={props.config.contextmenu}
                Hover={props.config.hover}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Tree;
