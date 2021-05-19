import React from 'react'
import Tree from './home'


const config =
{
  'data':
  {
    "id": "6981",
    "matNo": "142",
    "batchNo": "CCF3",
    "nodeId": "142|CCF3",
    "level": 0,
    "type": "Material",
    "matDesc": "Chocolate Cake 1 Pack",
    "children": [
      {
        "id": "25",
        "level": 1,
        "poNo": "9525",
        "type": "Process Order",
        "children": [
          {
            "id": "6980",
            "matNo": "139",
            "batchNo": "CLB3",
            "nodeId": "139|CLB3",
            "level": 2,
            "type": "Material",
            "matDesc": "Chocolate Cake Label"
          },
          {
            "id": "6974",
            "matNo": "135",
            "batchNo": "CCK3",
            "nodeId": "135|CCK3",
            "level": 2,
            "type": "Material",
            "matDesc": "Chocolate Cake",
            "children": [
              {
                "id": "22",
                "level": 3,
                "poNo": "9522",
                "type": "Process Order",
                "children": [
                  {
                    "id": "6972",
                    "matNo": "133",
                    "batchNo": "CCM3",
                    "nodeId": "133|CCM3",
                    "level": 4,
                    "type": "Material",
                    "matDesc": "Chocolate Raw Cake Mix",
                    "children": [
                      {
                        "id": "20",
                        "level": 5,
                        "poNo": "9520",
                        "type": "Process Order",
                        "children": [
                          {
                            "id": "6967",
                            "matNo": "130",
                            "batchNo": "CM102",
                            "nodeId": "130|CM102",
                            "level": 6,
                            "type": "Material",
                            "matDesc": "Raw Cake Mix",
                            "children": [
                              {
                                "id": "18",
                                "level": 7,
                                "poNo": "9518",
                                "type": "Process Order",
                                "children": [
                                  {
                                    "id": "6964",
                                    "matNo": "127",
                                    "batchNo": "ML102",
                                    "nodeId": "127|ML102",
                                    "level": 8,
                                    "type": "Material",
                                    "matDesc": "Milk"
                                  },
                                  {
                                    "id": "6962",
                                    "matNo": "105",
                                    "batchNo": "F2002",
                                    "nodeId": "105|F2002",
                                    "level": 8,
                                    "type": "Material",
                                    "matDesc": "Flour"
                                  },
                                  {
                                    "id": "6963",
                                    "matNo": "125",
                                    "batchNo": "EG102",
                                    "nodeId": "125|EG102",
                                    "level": 8,
                                    "type": "Material",
                                    "matDesc": "Eggs"
                                  },
                                  {
                                    "id": "6965",
                                    "matNo": "126",
                                    "batchNo": "B1002",
                                    "nodeId": "126|B1002",
                                    "level": 8,
                                    "type": "Material",
                                    "matDesc": "Butter"
                                  },
                                  {
                                    "id": "6966",
                                    "matNo": "101",
                                    "batchNo": "SG102",
                                    "nodeId": "101|SG102",
                                    "level": 8,
                                    "type": "Material",
                                    "matDesc": "Cane Sugar"
                                  }
                                ],
                                "relationshipMap": {
                                  "18-6962": {
                                    "id": "17650",
                                    "type": "Input",
                                    "uom": "KG",
                                    "qty": "1000",
                                    "startNodeId": "6962",
                                    "endNodeId": "18"
                                  },
                                  "18-6963": {
                                    "id": "17651",
                                    "type": "Input",
                                    "uom": "DOZ",
                                    "qty": "10",
                                    "startNodeId": "6963",
                                    "endNodeId": "18"
                                  },
                                  "18-6964": {
                                    "id": "17653",
                                    "type": "Input",
                                    "uom": "L",
                                    "qty": "300",
                                    "startNodeId": "6964",
                                    "endNodeId": "18"
                                  },
                                  "18-6965": {
                                    "id": "17652",
                                    "type": "Input",
                                    "uom": "KG",
                                    "qty": "400",
                                    "startNodeId": "6965",
                                    "endNodeId": "18"
                                  },
                                  "18-6966": {
                                    "id": "17649",
                                    "type": "Input",
                                    "uom": "KG",
                                    "qty": "300",
                                    "startNodeId": "6966",
                                    "endNodeId": "18"
                                  }
                                }
                              }
                            ],
                            "relationshipMap": {
                              "6967-18": {
                                "id": "25370",
                                "type": "Output",
                                "uom": "KG",
                                "qty": "800",
                                "startNodeId": "18",
                                "endNodeId": "6967"
                              }
                            }
                          },
                          {
                            "id": "6970",
                            "matNo": "129",
                            "batchNo": "CH3",
                            "nodeId": "129|CH3",
                            "level": 6,
                            "type": "Material",
                            "matDesc": "Chocolate Powder"
                          },
                          {
                            "id": "6971",
                            "matNo": "131",
                            "batchNo": "CHP3",
                            "nodeId": "131|CHP3",
                            "level": 6,
                            "type": "Material",
                            "matDesc": "Chocolate Chips"
                          }
                        ],
                        "relationshipMap": {
                          "20-6967": {
                            "id": "17657",
                            "type": "Input",
                            "uom": "KG",
                            "qty": "400",
                            "startNodeId": "6967",
                            "endNodeId": "20"
                          },
                          "20-6970": {
                            "id": "17656",
                            "type": "Input",
                            "uom": "KG",
                            "qty": "50",
                            "startNodeId": "6970",
                            "endNodeId": "20"
                          },
                          "20-6971": {
                            "id": "17658",
                            "type": "Input",
                            "uom": "KG",
                            "qty": "100",
                            "startNodeId": "6971",
                            "endNodeId": "20"
                          }
                        }
                      }
                    ],
                    "relationshipMap": {
                      "6972-20": {
                        "id": "25372",
                        "type": "Output",
                        "uom": "KG",
                        "qty": "400",
                        "startNodeId": "20",
                        "endNodeId": "6972"
                      }
                    }
                  }
                ],
                "relationshipMap": {
                  "22-6972": {
                    "id": "17660",
                    "type": "Input",
                    "uom": "KG",
                    "qty": "400",
                    "startNodeId": "6972",
                    "endNodeId": "22"
                  }
                }
              }
            ],
            "relationshipMap": {
              "6974-22": {
                "id": "25374",
                "type": "Output",
                "uom": "PC",
                "qty": "800",
                "startNodeId": "22",
                "endNodeId": "6974"
              }
            }
          },
          {
            "id": "6975",
            "matNo": "136",
            "batchNo": "SPK3",
            "nodeId": "136|SPK3",
            "level": 2,
            "type": "Material",
            "matDesc": "Cake Packing Single"
          }
        ],
        "relationshipMap": {
          "25-6975": {
            "id": "17668",
            "type": "Input",
            "uom": "PC",
            "qty": "400",
            "startNodeId": "6975",
            "endNodeId": "25"
          },
          "25-6974": {
            "id": "17667",
            "type": "Input",
            "uom": "PC",
            "qty": "400",
            "startNodeId": "6974",
            "endNodeId": "25"
          },
          "25-6980": {
            "id": "17669",
            "type": "Input",
            "uom": "PC",
            "qty": "400",
            "startNodeId": "6980",
            "endNodeId": "25"
          }
        }
      }
    ],
    "relationshipMap": {
      "6981-25": {
        "id": "25377",
        "type": "Output",
        "uom": "PC",
        "qty": "400",
        "startNodeId": "25",
        "endNodeId": "6981"
      }
    }
  },
  'l': [{ 'img': '../material_edited.png', 'name': 'Material' }, { 'img': '../processorder.png', 'name': 'Process Order ' }],
   'hover':{
    
    'Process Order': {
       'name':'Mihir',
       'age':'20'
     },
   'Material':  {
       'name':'Martha',
       'age':'21'
     }
 
   },
  'contextmenu': [{
    Text: 'HOME',
    Url: 'http://www.google.com',
    Action: function () {
      alert('hello world');
    }
  },

  {
    Text: 'Google Link',
    Url: 'http://www.google.com',
    Action: function () {
      alert('hello world');
    }
  },

  {
    Text: 'Yahoo!!',
    Url: 'http://www.google.com',
    Action: function () {
      alert('hello world');
    }
  }
  ],
  'zoom': true,
  'NodeRadius': '15',
  'pcolor': '#ff0000',
  'chartType': 'backward'

}

const contextmenu= [{
  Text: 'Home',
  Url: 'http://www.google.com',
  Action: function () {
    alert('hello world');
  }
},

{
  Text: 'Google Link',
  Url: 'http://www.google.com',
  Action: function () {
    alert('hello world');
  }
},

{
  Text: 'Yahoo!!',
  Url: 'http://www.google.com',
  Action: function () {
    alert('hello world');
  }
}
]

class App extends React.Component {
constructor(props)
{
  super(props);
  this.contextmenu=React.createRef();
}
 showContextMenu =(event)=> {
    contextmenu.style.display = 'block';
   contextmenu.style.left = event.pageX + 'px';
    contextmenu.style.top = event.pageY + 'px';
    return false;
  }

 hideContextMenu =()=> {
   contextmenu.style.display = 'none';
  }

listenKeys =(event)=> {
    var keyCode = event.which || event.keyCode;
    if(keyCode == 27){
      this.hideContextMenu();
    }
  }
  render() {
    return (
      <div className="App">
         <div ref="contextmenu" id="contextmenu">
                   
                 </div>
                 
    <Tree 
    config={config}/>
      </div>
    );
  }
}

export default App;
