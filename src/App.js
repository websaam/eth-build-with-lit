import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
import ICON from './icon.png'
import StackGrid from "react-stack-grid";

import QrReader from "react-qr-reader";

import Dragger from './Dragger.js';
import { useDrop } from 'react-dnd'

import { Icon, Tooltip, Button, CardActions, Divider, Drawer, Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import lessons from './data/lessons';

import SaveDialog from "./dialogs/SaveDialog";
import LoadDialog from "./dialogs/LoadDialog";
import html2canvas from 'html2canvas';

import * as LitJsSdk from 'lit-js-sdk';

// -- init litNodeClient
global.litNodeClient = new LitJsSdk.LitNodeClient();
global.litNodeClient.connect();
global.LitJsSdk = LitJsSdk;

var codec = require('json-url')('lzw');
var QRCode = require('qrcode.react')
const axios = require('axios');


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin:"5%"
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
});


console.log("LOAD MODULES")
let dynamicallyloadedis = require('./Modules')
console.log("dynamicallyloadedis",dynamicallyloadedis);
global.modules = {
  "price": {"nodes":[{"type":"Modules/Module","pos":[280,310],"size":{"0":140,"1":46},"flags":{},"order":0,"mode":0,"outputs":[{"name":"price","type":0,"links":null}],"properties":{"enabled":"on","title":"Price","color":"7eccc2"},"subgraph":{"last_node_id":16,"last_link_id":21,"nodes":[{"id":3,"type":"Control/Timer","pos":[180,220],"size":{"0":140,"1":26},"flags":{},"order":0,"mode":0,"outputs":[{"name":"on_tick","type":-1,"links":[10],"label":"30000ms"}],"properties":{"interval":30000,"event":"tick"},"boxcolor":"#222"},{"id":7,"type":"Storage/Variable","pos":[1110,190],"size":{"0":140,"1":26},"flags":{},"order":8,"mode":0,"inputs":[{"name":"in","type":0,"link":19}],"outputs":[{"name":"out","links":[11]}],"properties":{"varname":"price","global":true}},{"id":10,"type":"Modules/Output","pos":[1130,310],"size":[180,40],"flags":{},"order":10,"mode":0,"inputs":[{"name":"","type":0,"link":11}],"properties":{"name":"price"}},{"id":11,"type":"Input/Text","pos":[80,360],"size":[300,50],"flags":{},"order":1,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.radarrelay.com/v2/markets/WETH-DAI/ticker"}},{"id":2,"type":"Input/Text","pos":[80,70],"size":[300,50],"flags":{},"order":2,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[12]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.coinmarketcap.com/v1/ticker/ethereum/"}},{"id":1,"type":"Network/Request","pos":[430,160],"size":{"0":180,"1":46},"flags":{},"order":4,"mode":0,"inputs":[{"name":"[url]","type":"string","link":12},{"name":"request","type":-1,"link":10}],"outputs":[{"name":"output","type":"object","links":[14],"label":1}],"properties":{"url":"https://api.coinmarketcap.com/v1/ticker/ethereum/","debounce":1000}},{"id":14,"type":"Input/Number","pos":[540,360],"size":[190,50],"flags":{"collapsed":true},"order":3,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"number","links":[15]}],"properties":{"placeholder":"#","title":"Number","value":"0"}},{"id":13,"type":"Object/index","pos":[650,320],"size":[190,60],"flags":{},"order":5,"mode":0,"inputs":[{"name":"obj","type":0,"link":14},{"name":"index","type":"number","link":15}],"outputs":[{"name":"value","type":"string,object,array","links":[17]},{"name":"index","type":"number","links":null}],"properties":{}},{"id":4,"type":"Object/property","pos":[670,190],"size":[190,30],"flags":{},"order":6,"mode":0,"inputs":[{"name":"obj","type":0,"link":17}],"outputs":[{"name":"","type":"","links":[18]}],"properties":{"value":"price_usd"}},{"id":6,"type":"Display/Watch","pos":[850,70],"size":[200,60],"flags":{},"order":9,"mode":0,"inputs":[{"name":"","type":0,"link":21,"label":""}],"properties":{}},{"id":16,"type":"Utils/To Float","pos":[900,220],"size":[170,30],"flags":{},"order":7,"mode":0,"inputs":[{"name":"","type":0,"link":18}],"outputs":[{"name":"","type":"number","links":[19,21]}],"properties":{}}],"links":[[10,3,0,1,1,-1],[11,7,0,10,0,0],[12,2,0,1,0,"string"],[14,1,0,13,0,0],[15,14,0,13,1,"number"],[17,13,0,4,0,0],[18,4,0,16,0,0],[19,16,0,7,0,0],[21,16,0,6,0,0]],"groups":[],"config":{},"version":0.4}}],"links":[]}
}

const touchHandler = (event)=>{



  //console.log("global.showLibrary",global.showLibrary)

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; if(global.showLibrary==true){}else{event.preventDefault()};break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);



}


function App() {
  console.log("APP")

  /*
  window.addEventListener("wheel", event => {
    console.info(event.deltaY)
    event.preventDefault();
  });*/


  const [menu, setMenu] = React.useState("");

  const [selectToolActive, setSelectToolActive] = React.useState(false);




//  var defaultPrevent=function(e){e.preventDefault();}
//document.addEventListener("touchstart", defaultPrevent);
//document.addEventListener("touchmove" , defaultPrevent);
//
//
//
  const [moreInfo, setMoreInfo] = React.useState(false);

  const [drawing, setDrawing] = React.useState(false);
  const [drawingColor, setDrawingColor] = React.useState("#03A9F4");

  const classes = useStyles();

  const [snackbar, setSnackbar] = React.useState({msg:"",color:""});
  global.setSnackbar = setSnackbar

  const [readQr, setReadQr] = React.useState(false);

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openLoadDialog, setOpenLoadDialog] = React.useState(false);
  const [currentScreenShot, setCurrentScreenShot] = React.useState(null);

  const handleOpenSaveDialog = async () => {
    let canvas = await html2canvas(document.body);
    let canvasImg = canvas.toDataURL("image/png", 0.35);
    console.log({canvasImg});
    setCurrentScreenShot(canvasImg);
    setOpenSaveDialog(true);
  }

  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  if(showLibrary=="true") showLibrary=true
  else if(showLibrary=="false") showLibrary=false
  //console.log("showLibrary",showLibrary)
  const [showVideoLibrary, setShowVideoLibrary] = React.useState(showLibrary);
  global.showLibrary=showLibrary


  const dynamicWidth = window.innerWidth/3
  /*
   document.ontouchstart = touchHandler
   document.ontouchmove = touchHandler
   document.ontouchend = touchHandler
   document.ontouchcancel = touchHandler
   */

    document.addEventListener("touchstart", touchHandler, {passive: false});
    document.addEventListener("touchmove", touchHandler, {passive: false});
    document.addEventListener("touchend", touchHandler, {passive: false});
    document.addEventListener("touchcancel", touchHandler, {passive: false});

    //console.log("ADDING KEY DOWN!!!",document.onkeydown)
    document.onkeydown = (keydown)=>{

      //console.log("EVENT")
      if(keydown.key=="Escape"){
        setMenu("")
        setDrawing("")
        global.graph.canvas.drawing = false
        global.graph.canvas.selectToolActive = false
        setSelectToolActive(global.graph.canvas.selectToolActive)
      }else{
        //console.log(keydown)
      }

    }



  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);

  function AboutDialog(props) {
    const { open, liteGraph } = props;

    return (
      <Dialog onClose={()=>{setOpenAboutDialog(false)}} open={openAboutDialog} maxWidth="md" fullWidth={true}>
        <DialogTitle id="save-dialog" style={{textAlign:"center"}}>
          <Icon style={{verticalAlign:'middle'}}>
            info
          </Icon>
          <span style={{fontsize:38,fontWeight:"bold"}}>
            About
          </span>
        </DialogTitle>
        <Divider/>
        <CardActions style={{justifyContent: 'center'}}>
          <div style={{padding:"2%"}}>
            <a target="_blank" href="https://eth.build">Eth.Build</a> (<a target="_blank" href="https://github.com/austintgriffith/eth.build">source</a>) created by <a target="_blank" href="https://twitter.com/austingriffith">Austin Griffith</a>
          </div>
        </CardActions>
        <CardActions style={{justifyContent: 'center'}}>
          <div style={{padding:"2%"}}>
            With support from <a target="_blank" href="https://ethereum.org">the Ethereum Foundation</a>, <a target="_blank" href="https://consensys.net/">Consensys</a>, and <a target="_blank" href="https://gitcoin.co/grants/122/austin-griffith-ethereum-rampd">Gitcoin Grants</a>
        </div>
      </CardActions>
      <CardActions style={{justifyContent: 'center'}}>
        <div style={{padding:"2%"}}>
          Special thanks to <a target="_blank" href="https://github.com/jagenjo">Javi Agenjo</a> for <a target="_blank" href="https://github.com/jagenjo/litegraph.js">litegraph</a>
      </div>
    </CardActions>
  </Dialog>
)
}


const [{ isOver, isOverCurrent }, drop] = useDrop({
  accept: "node",
  drop(item, monitor) {
    //console.log("DROP!",item.monitor)
    const didDrop = monitor.didDrop()
    if (didDrop) {
      return
    }
  },
  collect: monitor => ({
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  }),
})

const [{ isOver2, isOverCurrent2 }, drop2] = useDrop({
  accept: "node",
  drop(item, monitor) {
    //console.log("DROP!",item.monitor)
    const didDrop = monitor.didDrop()
    if (didDrop) {
      return
    }
  },
  collect: monitor => ({
    isOver2: monitor.isOver(),
    isOverCurrent2: monitor.isOver({ shallow: true }),
  }),
})

React.useEffect(()=>{
  console.log("MOUNT",LiteGraphJS)

  global.title = "eth.build"

  global.LiteGraphJS = LiteGraphJS
  var graph = new LiteGraphJS.LGraph();

  global.graph = graph

  //config
  LiteGraphJS.LiteGraph.debug = true

  console.log("can we set grid here?",LiteGraphJS.LiteGraph)

  var canvas = new LiteGraphJS.LGraphCanvas("#main", graph);

  window.addEventListener("resize", function() { canvas.resize(); } );

  graph.onAfterExecute = function() {
    canvas.draw(true);
  };

  window.onpagehide = function(){
    var data = JSON.stringify( graph.serialize() );
    localStorage.setItem("litegraph", data );
  }

  CustomNodes(LiteGraphJS)

  let url = window.location.pathname
  console.log("URL",url)
  if(url&&url.length>1){
    url = url.substring(1)

    if(url.indexOf("wof")==0){
      console.log("decompressing",url)
      codec.decompress(url).then(json => {
        console.log("configure graph with:",json)
        graph.configure( json );
        //graph.start()
        graph.canvas = canvas

        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)

        window.history.pushState("", "", '/');

        setShowVideoLibrary(false);global.showLibrary=false;
      })
    }else if(url.indexOf("build")==0){
      console.log("THIS IS A BUILD")
      let key = window.location.hash.replace("#","")

      //let result = await axios.get("https://network.eth.build:44386/build",{})
      axios.get('https://network.eth.build:44386/build', {
        params: {
          key
        }
      }).then((result)=>{
        console.log("GET BUILD RESULT",result)
        let compressed = result.data.compressed
        codec.decompress(compressed).then(json => {
          console.log("configure graph with:",json)
          graph.configure( json );
          //graph.start()
          graph.canvas = canvas

          setLiteGraph(graph)
          setLiteGraphCanvas(canvas)

          window.history.pushState("", "", '/');

          setShowVideoLibrary(false);global.showLibrary=false;
        })
      })

    }


  }else{
    var viewedNewFrontPage = localStorage.getItem("viewedNewNewNEWFrontPage");
    var data = localStorage.getItem("litegraph");

    if(viewedNewFrontPage && data) {
      graph.configure( JSON.parse( data ) );
      //graph.start()
      graph.canvas = canvas
      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
    } else {
      if(!viewedNewFrontPage) localStorage.setItem("viewedNewNewNEWFrontPage","true")

              //THIS IS THE DEFAULT FIRST TIME LANDING CASE

      let defaultData = "wofCrGxhc3Rfbm9kZV9pZHfEgcSDxIVsaW5rxItkw4zClcKlxIfEiXPDnAAYworCosSMJsKkdHlwZcKwVXRpbHMvVG8gQsSDZSAxNsKjcG9zwpLDjQTDu8ONA8KmwqRzaXplwoLCoTDDjMOJwqExGsKlZsSCZ3PCgMKlb3LEiXIRwqRtxIhlAMKmxJNwdXRzwpHCg8KkbmFtZcKlxaTFpsSlxKfFocKkxJLElCvCp2_FpsWlxafFqcWrxa1lwqbFu3TFvcWzxKjCpsSEcsSTZ8KlxbdrxahTwqpwcm_EqHLErGXFlsShxIw_xofEqUNvbnTGlWwvxqJDaGFuZ2XEusS8xL4DL8WCasWFxYfFicWLw4zCvsWPxZHFk2HFlcKBwqljb2zEgnBzZWTDg8WYxZplcg7FnsWgxaLFscW-xarFrMWuwqDGnwDFtsSTa2LFusW8xabFqMeWxoHHmcSmxKjDv8aOx53FqGPGk8aVxpfGmcabxKJkPsafwrDGocajxqXGp27Gqcarxq3Gr8S9xYLGswLDgMa2xYjFisWMxrvFkMWSxZRzx4HHg8eFYceHx4nHi8WZxZsKx5HEiceTbsW9x6PGgMeYx5rHnMSUYMegxoXHosW_x5dlx6bFtMepxo_FqGHHrsaWx47HscKAwozHswXGn8KsScicxaYvQsWmdMaiyIDEvgHDucONAcKUyIZlyYQnRsiMxr_FlseMxZsByJnFocWjyLzHlcifyKrGn8O_yKJrw4DIpcidwpLHpMigx6dlyK3Hq8KRXMmkyZvJpsKubnVtYseOLGJvx4RlxqvHqsSUc8OAyLHHsGnGmsKDwqV2YWx1xq5HTyHCpcSsdGxlwq5TdGHErGMgRW5jcsSndMKlx4N1xqPDjQJByp_HhMWZwqQjMzIzwqdiZ8iQyqgjNTM1xpxkQMe2x7jGpMeEx7vHvcasxq7Eu8iBBjvFghrJisiIxrrGvMmPx4DHgseEx4bHiMeKyZLHjhTJlcibyJ3IqMelyKHGj2fJocinyazIq8eoybvGkMKRZsm_yLPKgcWWyLbEjCzGn8KtRGlzcMSCeS9XypVjaMmDw40GMcS_KMmKxrHDgk7LjMiOy47IkciTZMOCy5NyF8uWyZfLmMKEyZrLocW1xo9Dxo5hybNswqDLnsW-zJLIqcyUAMujc8KQzJjMmsKgy6fGmMupwoLKjWnKj2XCsk1FU1NBR0UgREVDUllQVEVEIcKoZsaidFPGt8KiMjDKpmzKssqrMsquyrDKp3LKqcq0M8q3Esafwr9MzK5QxpXJgciQL1NhdsS2ypnKm8qdacaiIEtlecu7xrLFgsWExYbFiMmEwpB4zIXIj8uPyJLLkcyLyJbHjhDMj8eUc8KVyazCt2FjY8aac8q7xqXHuGTMrs2rbnPIuWFycmF5LG9iamVjdMmeRsmswqxzeW3FrsakaWPNrnnGn8KlzpfOmc6vxo8LyazCp2HFpmjNiGfGn8aDzp7OoM6ixo8MyazKn8aqxJPOvsaKxozJng3JrMKxc82lxLbJgSDNnXQgTsWgzpXJpsmdxo9jzJ3Insipw5kiKFXEk3Q4Qc6YzpopIGXKmsqccHTHiVPOqM6qxovOrc2vxp_CoMyjwpIrw4zCi8ypx7HCgc2NxZnCpyMyOTDQijDKt2jLrk_PgM6hL9CQzp_Oocu7BMKXyqMgzIHDjSvDlMONDsKczbrMh8uQyJTMjM2axZ_ImsyQx6LEnsK5y6DOvs6d0JXPgsedz7_JrMWLxp_CtM-KxqwsybDJssm00LHPgcmew4DQtjHQuNC6Z9C8ybHJs3LOnNCR0LPElNGDyZrCoTLRhs6r0LvQvdGL0Y3QstGC0LYz0ZXGi9GX0YrQv9GO0ZzRkjTRn8aM0YnQvtGM0YDOodGlyKnCoTXRqNGh0avRmtGBxo_RkdGwNtGz0YjRmNGj0ZvRuNC2N9G80arRmdGt0Y_Jn9C2ONKE0b7RrNGk0oHRkjnSjNGi0o7SgMed0bnGgcKiMTDSk9G10ofRr9KZMdGFyabQudGW0b3SlNG20a7SkMip0prRlNKk0YfShdG_0bfSl8ms0prRntKv0qbSsdKV0rPRkNK1MdGn0rjRoNKn0p7Sj9K0yZrSmtGy04HRqdKN0qnSiNKYxa7SmtG704rRtNKG04XSvdOHMdKD05PTg9OV0pbTl9KsMdKL05vSutON0qDTkDHSktOj04zSn9Kr0pnNi9Kd053SvNKJ04cy0qPFtNKl04LTpNOs04bSrDLSrtO30rDTq9OW07PTvdK31IDSudSC057UhNOu04DUh9O51InTstOPZc2K04nUjtOL0qjTu9Of067TktSW05TSstKq07zTrtOa1J3TnNSf047StTLTotSk07rUg9SSzYrTqdSr1JDUoNSa05Az0pzTqtSY1K3StTPTtsSo07jUl9OE1IrUrsqr07DUptOm1JMz1IbUvtSB1LnVgtS71I3Vi9SI1Y3UkdS71JXVkdSP1ZPUs9SL1LXUnNWX1YDTsdWa1YPUo9We1J7Su9Wh1LvUqtWk1KXVptSn04cz1LDVqtSs1Y7ThzTUt9Sx1ZnVrdKsNNS9ZdS_1aXTpdOt05A007_VsdSy1bnSmTTVitW91YzVgdWU1bTVkNaL1ZLWjdWn1bTVltaR1ZjWk9aH1oLVndaX1Z_VhtaB1JM01aPWndW_1JnVm9ah1anWpNWr1oDUodaC1bDWqtWy1o7SrDXVttaF1bjVh8KiNdW81b7Wq9am1K411oTWsNaG1rjKtNWF1azXhNaQ1rzWsdaU1rPWlteK14PWoNa51pzXj9a315E11qPXlNaZ14TWqdeZ1aDWmtSTNdav153Wn9at1JM21rXXgteV16XCojbWu9aM157WuDbXgdej14fXkTbWite01qzUtNem14nXr9ek17vXrNeO177XtderNteT2IPXutan16zXmNiI1r7StTbXnNiN1LrThzbXotiS1bPSrDfXqNe52I7ThzfXrtaS17DXkTfXs9iX1rLSmTfXuNim14zYqNe92KHXv9iKN9iC2K_YhNiAN9iH2LTYidSuN9iM2LnYndiZ2JHYvtiT2JnYltmC2JjSmTjYm9ir15_CojjYoNaY2KLXqzjYpdmG2KfTkDjYqtmV2KzZl9iu2ZDYsNSuONiz2Z7YtdiKONi42aPYutK1ONi92ajYv9mI2YHZrdmD2YjZhdmx2YfTkNCJ14bZqdOHOdmP1p7ZpNSuOdmU2bXZltSTOdmZ2oPZm9qF2Z3Zvtm60qw52aLajNmu2bfZp9qR2bLZt9ms2pXZttqF2bDamdqEwqI52bTandqJwqPSm9mK2ZrXn9qkMNm91qXalsau0pvagtqi2qjSm9qH2rHVh9qp2ovarNqa2qnakNq52oTaqdqU2r3ao9Kb2pjbgdqyMNqc24XattKb2qHbidag2qTSm9m52pLartKi25HarduP2rDbjdel24_atNuZ17vbj9q41r3bltKi2rzbodq60qLbgNul2r7SotuE26nbgtOh25XbptOo27DbqtOv1LjXmtuOMdO127PbgtO-27vassqs277bijLboNeL27_bpNyF3ILbqNyI27gy26zci9ua27nbiNut27_bjNyT24rUttyB27jUvNyZ3JDVhNu22ZHbnjHVidyc3KEz3ITXkNyd3IfcqNyl3Ircq9an2qQz3I7crtSS3LDcktyP3KXcldy33K_Sv9qm2ojastW73KTcu9aD3YHctNK_25zcltu4NNyn16rcoTTcqt2M3YLcrd2Q3YXWot2EyazapDTcttyz3ZfSv9y53ZvJmtqk1rTdlt2gMda63aPIqd2h25jdiNyQ14Xcn9mf3Zw13Yvbt92s3Y_ds9yhNd2S3bbcu9eX3afGgd2h3Zrdk92w3Z7egd2k16fdvcWu2qTXrd6H2q7Xst6L3ondh9y63YU23bLcoNy7Nt213pXekt253pndnDbcst6E3ajEuN6A3brekt6D3qTdnNia3o7Tmdqr3avcodik3qrYqd6w3pTdr92k2LLesN6b3rTeodi83rDeo96c3rXept6-3qHZid6q2Y7fhN2q3pHdnNmY3YTPn9Ct0K_Jps6_0LLMo9SS0Lffj9KN1YfFj86-35bWoNGT35nSlN-X1orCpt-a16XCodaQ36Hfnt-b1pbfptGr35fWnN-q0Yvfl9aj367Hjt-X1qnfss2V35vWr9-21rjbkN-V36fXq9uU373fq9eR27nfneCggt-_36DfotiA0r_goIXfr-Cgg9-p4KCJ2IrEuOCgjN-z4KCD37HgoJDUrtuv4KCB4KCN37_fueCgl9So16jfuteR27rgoJrgoJTXq9u94KCk37fgoKbgoIjfvtiA3IPgoJPgoKngoK3goI_goKzYijLfreCgntO04KCW4KCz1K7UqeCgr9a40IjgoL3XkdyY4KCo1rjcm-Chg-ChgdeB4KCh16vco-ChhuChit-l4KC30qzKteChgOChiuCgtuCgutS74KC54KCG2IAz37XgoY_SmdWv4KGS2IDVteChn9iK3YDgoYzgoaDgoYjgoZzWguCgq-ChmOCho-ChjuChldaV4KGi1K404KGU4KGr4KGx4KGX4KCb4KGg4KGb4KGu1brgoJ3gobrSmd2i4KGl2IrdpuCigNa_4KGn4KG905DdrcW04KGJ2IDdseChsNK1NeCgsuChtOCijuChs-Cht-CigeChtuCgpeCii-ChueCikdOH16Hgoo3YlOCgoOChqNem1bzgoorYit6N4KKD2I_goargopTUrt6T4KKd0qzel-CirNKZ2Ibgoq_TkN6e4KKy16bgopngoqnYj-ChvOCimtiZ4KKf4KKG1JPYn-CitcKi3q_goqbYnuCiqOCil9ix4KGt4KK72KjgopDgorjYnuCik-Cjh9i74KKW4KCw2LHgorfgo5DStTfgorrgo43SrN-D4KOE4KOb4KKi4KKg2Y3gooXgo4rZl-CjhuCjk9mg4KOJ4KOa2Yjgo4zgo5bTh9mm4KOB2avgo6_go5Xgo6bZquCjmeCjrNqO4KK94KOj2oXgo5_gor7an-CjouCjqdm34KOl1rg54KOo4KO20pnaj-CjgTngo4_go7PZu-CjkuCkguCjsuCkguCjteCki96h0IrgorXaqeCju-Cjudqp4KO-4KSF3ojas-CkldKb4KSE4KSS3b7Sm-Cjq-CkoeCknDDgpIrbijDgpI3buNuH4KSeMOCkkduK37zgoongoqDbj-Ckl-Cjv9uT4KSa4KSl25PgpIHbuOCgi-CjneCkot2l4KSe4KCS4KS_4KSc05ngpYLgpI_gpL3gpLDcjOCjuOCkt9qk4KCj4KSz4KK-4KWO4KS53ILgpLzckOCgruClhNquMuCkpNyJ4KSe3I3gpZ3gpYjgpZbgpYrcneCljOCkm9qu4KGF4KWQ4KSY3KLgpZPcmuClldyl4KSg3JfgpZvcmuCkqNya4KSr3J3gpaDcuOCknuChoeClmN2Y4KS24KWl3ZjgpavckNaJ4KW54KWv3YngpbHgpoHgpbPgpoHgpbXdjeClt92C4KWi3bfgpaTgpLrdoeClveCmkd2l4KaA3bfgpa3du-CmhN204KSe3bjgppzgpordu-CmjN2F4KKc4KW7xLjgppDbit6K4Kak4KKl4KWo4KWNxLjgppjekuCmmtyh4KKu4Kap4KaI4Kax4Kaf3pLgpqHeneCmjty73qngpqTgo4Dgpr3gppbgprvgpq7eqOCmsOCmu-Cmht6u4Ka04Ka74Ka23qjgprjev-CknuCjnOCmq-ClvtOh4KaT24rZk-CnjuCmrtCBy6nChMytzK_CptCUz4HQhHLQhjVh4Kej4KejzYTNhs2IxYgQyoTKhsqIw5oJRHsKICAiMCI6xLfgoZos4Kez4Ke1MeCnuCDahuCnvOCntCIy4KiANzjgqIPgp7Uz4KiA074z4KiKIjTgqIDSouCoj-CnvSI14KiA2Y7gqJA24KiNNOCokDfgqJMw4KiV4KiEOOCok9ik4KiQOeCojTA14KiQ0pvgqIDgqKPgp77gp7_gp7nYkOCoreCohuCnudai4Kit4KiM4Ke527k54Kit4KiS4Kiz4KiJ4KiW3aXgqKYw4Kit4Kic4Ke52qDgqK3gqKDgqLvaquCoreCopeCnuc2L4KmF4KmC4Kip4Ke51rrgqJDNi-Cok9O14KmX4KiyIMqsNuCpl-CotuCpneCouOColsqs4KiA4Kis4Kmk4Ki_INen4KmX4KiY4KmI4Ki94Kmk4KmHIN2K4KmX4KmL4Kmq4Kmv4KiE1KngqJPgqafgqbjgqZTEt92x4KiQ1LbgqZkx4KqA4Kmc4Ke74KiWyqvgqKrgqLAi1YngqIDgqaPgqITcpuCogOCoguCqh-CprSDZieCqgOCpsc2L4Km34KiL4Km14KWa4KqD4KqH4KmP4Kmy4KqA4Km93IPgqbvgp7XVteConeCpkuCohNW74KiT4KqS4Kqq4Kmh0qLgqJ7gqJbWieCooTfgqJDdiuCojd2l4Kq24KqU1rTgqrbgqbHSouCqtuCqnDLgqrbgqqDTteCqteCqsuCpvdOo4KuG4KiE1rTgqIDek-CokNa64KiN14Dgq4_gqaHTvuCpgeCri-CouuCpneCrluCntd2x4KiN4KC14KuP4Kq74Kqp4Kub4Kq-1Yngq4_gqbXYsuCrj-CqoNK_4Kua4KiX4Kqj3I3gqJvgp7fgqLvTqOCom-CpnN2l4KuhItey4Kim4KqK17fgqI3gq7rgqanUtuCom-CqlNOZ4Kmf4KiW2IbgqK_grIPgqITenuCqjeCqmuCrt-CqoOChsuCom-CriNCK4Kif4Kuw4KmdzYvgqJ_gqZzYhuCon-CpoeCrttip4Kiq4KurN-CpqdCI4Kif4KqU2J_gqJ_gqbHgq6fgqJbYvOCooeCsi-CoiOCqkeCqnuCohOCjmOCrkeCsruCntdmJ4KuR4Ku22Y7gqJPZk-CokNmT4KiH4KqK2ZjgrLXgrLrgrKDToeCsuuCqlOCrleCsuuCqvtCJ4Ky64Km14Kqx4Kik4KuE4Kyh4KiWOOCqo-CrpOColtCJ4Kih4Kio4KyX4Ku22oHgqpHgq4LgrZPgq5jKrOCssiLgpIPgqqzgqqXgraDgrIHel-CoqOCqvtyi4Kio4Km1OOCrqzngqqDYqeCoqOCriNyD4Kit0Irgq43gq4rgp77aquCok-CqhuCohNqv4KqR4KyL2rPgqKHgrZvgrbww4Kmp4KqW4KmC4Kir4K264Ku20pvgqpjgrYLgrofgqbXSv-CuguCtuOCsjeCttyLbi-CquOCrq9Ki4KyT3KLgrYvgqLHgq7TEuOCordu54Kid4K2j4KiU4KiH4K6Y0r_gq5Hgqorbo-Cok9aJ4K6g4Kq-4K2m4KmC05ngqKHgrorToeCrvOCus-CpveCtiOCpguCpmOCou-ComuCuueCpnOCpieCuueCpodaD4Ki14KuY3aXgrpzgrpXcg-CqtOCoteCthOCts-CuueCujOCuqdyN4Kqs4Ki14Kqg4K6K0IjgqIDgrorgqoHgp7ngr5fgqZzgr5fgrJrgqLngq5jgr5fgqangr5fgqpTKq-CoueCqmNWv4Ki54Kqc4K-G3KLgq6nZmOCoueCpveCurOCpguCqp-CpkNW74Ki-4Ku02LzgqL7gqaHgq5Lgr7HgrZ3gqo7gp77gqrfgqYjgrordjuCooeCsh-CvvuCqmOCkr-CovuCqnOCujeCtvN2Z4KiH4K2f3Z3gqbrgrqngq4zgr5ngqK3gq5DgqLPgrqPXgOCrvOCtv8q04KuR4LCX4Kmp27ngsJHgraXgrpjduOCqkeCwouCuj-CpluCpgjXgq4Qz4LCE4K6V16HgqJngsKzgpqXgraLgqYbgq7Tgrrzgrbzgq7jgqLPgr6rgq7vgqZDgr4zgsLbgqangrJ_gqYbgqpTZpuCphuCth-CwjuCsieCpkOCtu-CnvtiQ4Kqs4K6Y2JXgrrLgqYrgrJM04K2_2J_gqqzgsI7YpOCoquCxleCrmNyx4KmK4K6F4LCw2LLgq7zgqYrgr6bgrqngrKngqLvgqLTgqYLgrKzgqZXgrpjgrLDgp7ncpuCpjuCsk-CsleCpguCst-Cnudi34KmO4Kqv4K-w4K284Ky-4Ki72JoKfcq31pzCvs-VzZ9vzaHKvUdlz5bNqM-wxKzNrM6uy7vLhMqjetCcAc240KPIkNClzIrMjBPOg8mYzoXOh86Jzotzzo3Nhs6PxqLOkeCyis6UzpbPqs6b1qZHyazCqcmBRM6g4LKJz4nSpsmeU8-Fy7lhz4jfj9GHyZ5JzrfOuXTOu2nOvd-P1qZU3ZfGrc6iz5vJnmTPn8uZxa7Cuc-kz6bPqOCyqc-szqfOqeCyhs-3zq7OsM6yzprMo8KTTGfDjMKN4KeYxprQg8qx4Keh0IfQidCLyrfWlsK64LKAzaBvzaLgsrDNqc-xIMqT04Lgso3LvgNM4LKRwpDJjsa-y43gspXNvceJzb_HjXIW4LKayJ3Ck8mswq3PruCztc-yZETKlWHQsNSDw4zCjs6l4LOXz7bOrOCzm8mmzrHgsqnJnkzOt8SJ4LSQyZzJnmbgs47JrMKv4LSl4LKJz7PgsrTgs4XRjsyjwpFD4LOlx7LEjATGn-Czr82e4LOxzaLgsojKneCzt9KmzbE5yqPHtc21yYvJhwDgtIDIjc27zIjNvsyMB-C0iseiyaPJmsKnxa7gsqDGv2XgsrPTgsmeAc634LSP4LKy4LOLxo9cz5_gtZTIqcK7KELNjmIg4KeezqHPrOC1oMqdx4ngtJPKlOC0lt-RyK7CkcOMwo_JrMK94LOSxqPgs5TOsyjKqyngs5bPteCzmeC0nc-54LSf4LOdeeCznwtgw4zCiOC0tsKAyrdmy67LsMuyy7TLtsu4y7rLgsS-0JjJh8KAzIHDjMOIPOCylM28zInIleC0hwngtZLMnsyTy5vQtMKPzKZlzJvgs47Mn8uayabMouC1uOC0mOC2ssyb4LS2zKzKjsqQwqXLt3TLueCnp8aj4Kep1JPbucq34LWayabLr8uxy7POmuC2muC3hOC2nMawxL_CjcmHwrzgtqLgtqTgtqbgtY7Qps6AcgvgtqzFqOC2tsmlxbTHm8aP4LaQ4La8zJzGhMyR4Lau4La435Lgt6rgtr7gp5vgt4Hgt4Pgt4XNheC3h82J4LeKx7McyLnIu8W9yL7JgMmC4Lady7zLvgHgt7zgtYfJhAs-zIXFl-C3nwLgt6Lgs4_Jrcis0YLgtaXfjsis4LSzZOC4lsSoya_SqMm2ybjJusiuyb7GlMiyzKrKguCnrMqHyonKi-C3s8qRypPKlc6szLngsrHKncqmyqF0yYfChMq3cMafwrXgs7DgsoLgs7LKvUjJscary7HHicmDw4zDocqjw4rgs77gtYvJkOC1jeCyluC2qcWbCOC4kOCync6KzozOjseEzpDOksaiz5rFtMKs4LaL2InDjMKU4LSqyZrCqWjguYFu4LmDZOC1m8aM4LSzxJjgtpLKtwPGn8Kq4Le-yL1UZXh0y7sBw7TJhyXgspFJ4Lal4LSBzIbgtIPMieC0hsWb4Lmw0KnJls6E4LiRzKHguJTgt6zLn-C3ruCiidGH4LSzAeC0tsKEwqtizY5ja8qB4LeIMsKr4LeQzotox4TFm8Kvz67PsnIgz7LgubcgaMeOxa_gt4DMsE3OjOC1meC6qcSy4LS_z7HguKfKiMKwU8y7UkVUIMyyzLTMtkUhIcq3FdCP0Y7Qk9GO4LmFw5zKo8Ou4LKRw6nJh8KK4Lec4LKW4LqFx47gtLnguojLl-C1k-C4msaC25LflNW33qTguJXgupDGiNKH4LOfRkfguaDQtuCgoNa-4LqV4LirwrlB4LmU4LKgIOC5lmzgu7XgsqTguZnOlOCnoOCnouCnpOC7vuC3hs2Hxrfgp6vKheC4qMOaAQtb4Ke94Key4Ke04KiEx4PHuc6JdEFkZHLOjOCogCIi4KiK4KiExITGq2TOl2TOjuC8kFTFtOC8l-C8meCnveC8jc-HbuC8l-CyhuC6reC8lcmx4Lym4LyM4Ke1zqrguqJk4Lyr4LOBX-CzicS0xILKmmXgvLDgvIwicM6XxoHguqdz4KiA4LyJ4Lyx4KiEOnXHiHLgvJLgvJTgvJbgvJrgvL_Egs-yxIQi4LynIF3gvZEi4LyVdHVyblbgp61l4Lm14L2V4Ke54LyL4L2IIseDbeC9gc6ZyYFy4LyXPj3gvL7gvLEi4LyEyojgvJfgp7fgvZd94Ke94L27Xcq34LOExbTgt47gtpjgt5Hgt7Xgt5TIgQTCnMmHw6rgtqLDpcql4LqB4LmN4LSEy5Lgt58P4LiQ4Lek4LiSxKjgt6fQtOC7lcSCzKfgtrXgu6XFoeC3sOC-nOC2s8yo4LijyoDGmuC2v8yu4Le04Lab4LyA4LeI0q3KtwzGn8OZIeC4vOCyg8amxqnOoGsgJuCzt-Czg24gQc664LuBc2fNsciDw6jguYrgu5bgvpHgu5hyDeC3ouC1psaBz4bgsrlu4LmqxqzJngfJrMa2Z-C_k-C1osedYeC5osipwqjgs4Dgs4Lgv5rgtbbgp5_IrsKUDFRiw4zCiuC2ksKIx7N2xp_Cr-C2l-C3kMu1xqHgs5jGo-C5ucOqxrrgspHDtMyi4LqB4LiN4LSHyLjgu5vgupXgvqzGtxLgup_EguC6oeC6o8eOwq4vLyDgvarFrsajcy7hgJbguKvCp-C_t-GAk8qe4L22ZcOZ160uIOC8o8SoIHnFu-C6qOC1l8-Qxq3hgKXFuyB3xqvPls-T4LWxz7EKMuGAoUPEkuC6muCntUdvIuC_r8SMd-C_suC_tOC2meGAmuC6puCyjSzgtqPgv73gv7_IjeGAgcWbBsuW4YCF4Le34LyBxYjhgIjguqBl4LqibMWb4YCO4YCQ4YCS4Lqm4YCV4YCX4Lqw4YCZb-C_uOGAnOC9osKvM-GAoeCztOCyiSDgvJ7KlMq3xrXgt43hgYPgvoTgtpvLuwgWyYfRu-C4iMOMw7zJh1Xgv4ngtqjMjOC7ieC7m9Cr4LatzKDgtq_ElOCzo-C3quC-nuGChuC3r-C4oeC3seC-pcuo4L6n4Lir4LeC4L6r4YGS4L6t4Le6xIxx4LaW4LeP4LaZ4L6F4LuOyqPCnuCykcK-GOGBv8uR4LmPx47gvrDhgoPguorgvpbguozgt6jEmeC-ouC2tOC6juGCheC2t-C3puC-ocyZ4L6j4Ley4Lqw4YKU4LeT4YCGxYjgvq7Hs8eQyabgubLJmMSw4Lm24Lm44Ladw4zDpsqjOuCykSwy4YKl4LSFzIzHm-GCquCym-C6i-GCh8mf4L-f4YK0xojgupLIrsKTBw1J4LqV4LqX4LqZ4LqbZeC6neGAic6J4YGX4YCMcuC6pcajx47guqnhg4bguqzguq7hgpPHvcST4Lq5ZcKo4Lys4LquybHMo8SeHcKWAQMABMWi0YfClgcOAAzhhIXSpsKWCwQBEgHgtKDOs8KWDOGEixIC35DPgcKWDeGEiRLFg-GEhisSACYAAMKWQzUALOGEp8KWRhUA4YSk4Lmd4LKp043ClkfhhLE2AOGEtM6z4YS2SeGEiTbhhJrhhIZM4YS6NeGEk-C2i8KWU-GEpjYBxonhhI1U4YSLNsWD0ofCllwF4YSDAcO_wpZg4YSQPuGErmHhhZ4M4YWZwpZi4YSLP-GErmPhhacSBOGFmmQcADbhhazClmZAADUC4YWaZ-GEuuGFteGEqOC2kOGEkMWh4YW9worhhItn4YSuz7_hhKRoxaLhhZTgs6PhhLpq4YaFwo5m4YW24YaJ0Y7CluC1uuGEhOGGkOGFvcKU4YSxcOGEu-C5nuGGisKV4YabceGEp8KmZ8aVdceHwpDCpuC8jmbgs4PCgMKnzaZyxYbGosOLP8OZwpnhhrbhhrbCmg"

      
      codec.decompress(defaultData).then(json => {
        global.graph.configure( json )
        //graph.start()
        graph.canvas = canvas
        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)

        setShowVideoLibrary(false);global.showLibrary=false; //lets try starting down with the video up
      })
    }
  }
  setInterval(()=>{
    //console.log(graph)
    graph.runStep()
  },250)
},[])


const barHeight = 45

//let compressed = await codec.compress(liteGraph.serialize())
//liteGraph?JSON.stringify( liteGraph.serialize(), null, 2 ):""
//

let allCards = []












allCards = lessons.map(lesson => {
  
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={()=>{  window.open(lesson.video) }}>
        <div style={{padding:3,fontSize:18,backgroundColor:lesson.color,color:"#FFFFFF",fontFamily: "'Rubik Mono One', sans-serif"}}>
          {lesson.header}
        </div>
        <CardMedia
          className={classes.media}
          image={lesson.image}
          title={lesson.name}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {lesson.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {lesson.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent:"center"}}>

        <Button size="small" variant="contained" onClick={()=>{
            codec.decompress(lesson.save).then(json => {
              global.graph.configure( json )
              global.graph.stop()
              global.graph.start()
              setShowVideoLibrary(false);global.showLibrary=false;
            })
          }}>
          Load
        </Button>

        <Button size="small" style={{marginLeft:20}} variant="contained" onClick={()=>{
            window.open(lesson.video)
          }}>
          Watch
        </Button>

      </CardActions>
    </Card>
  )
})


/* FOR TOP MENU FOR TABLETS:
<div style={{zIndex:1,position:"fixed",right:0,top:0,width:"100%"}}>
  <div style={{borderRadius:"0px 0px 8px 8px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,right:0,top:0,width:475,backgroundColor:"#DFDFDF"}}>
    <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

      <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
          alert("click")
        }}>
        <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
          <Icon>
            swap_vert
          </Icon>
        </Tooltip>
      </span>

    </div>
  </div>
</div>
*/

/*
<div style={{zIndex:1,position:"fixed",width:"100%",left:0,top:0}}>
  <Grid container className={classes.root} spacing={2}>
    {customNodes}
  </Grid>
</div>

 */


let [width, height] = useWindowSize();

const toggleDraw = (e)=>{
    let currentDrawing = drawing
    console.log("toggle draw",currentDrawing,drawingColor)
    currentDrawing = !currentDrawing
    if(currentDrawing){
      currentDrawing = drawingColor
      global.graph.canvas.drawing = drawingColor
      global.graph.canvas.selectToolActive = false
      setSelectToolActive(global.graph.canvas.selectToolActive)
    }else{
      global.graph.canvas.drawing = false
    }

    setDrawing(currentDrawing)
    console.log("toggle draw is now",global.graph.canvas.drawing)

}


let spacing = 0

const mouseEnter = (name,e)=>{
  //console.log(e.pageY,height)
  if(e.pageY > 60 && e.pageY < height-60){
    setMenu("")
  }else{
    setMenu(name)
  }
}

const mouseLeave = (e)=>{
  setMenu("")
}

const tabFontSize = 14

let extraTabs = []
console.log("MENU:",menu)
let customNodes = []

if(!showVideoLibrary){

  for(let n in global.customNodes){

    console.log("N:", global.customNodes[n]);

    //console.log("GRID",global.customNodes[n])
    //if(global.customNodes[n].name!="Special" && global.customNodes[n].name!="Modules"){
      if(!drawing && global.customNodes[n].name==menu){
        let positionStyle = {position:"absolute"}
        let style = {borderBottom:'3px solid #888888',whiteSpace:"nowrap",letterSpacing:-1,fontSize:14,margin:4,borderRadius:"8px 8px 8px 8px",padding:6,textAlign:"center",color:"#FFFFFF",backgroundColor:"#"+global.customNodes[n].color}
        if(n < 6 ){
          positionStyle.left = 0
        }else{
          positionStyle.right = 0
        }


        let items = []
        let itemspace = 40
        for(let i in global.customNodeItems[global.customNodes[n].name]){
          let item = global.customNodeItems[global.customNodes[n].name][i]
          console.log("Add item",item)
          items.push([
            <div style={{...positionStyle,top:50+itemspace*i}}>
            <Dragger key={"dragger"+n+"_"+i} name={item.title} drop={(name,x,y)=>{
                //console.log("DO A DROP AT ",name,x,y)
                setMenu("")
                var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
                node_watch.pos = [x-40+global.graph.canvas.visible_area[0],y+global.graph.canvas.visible_area[1]];
                //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                global.graph.canvas.graph.add(node_watch);
              }}>
              <div onMouseUp={()=>{
                  if(menu){
                    setMenu("")
                    var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
                    node_watch.pos = [width/2-40+global.graph.canvas.visible_area[0],height/2+global.graph.canvas.visible_area[1]];
                    //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                    global.graph.canvas.graph.add(node_watch);
                  }

              }} style={style}>
                {item.title}
              </div>
            </Dragger>
            </div>
          ])
        }

        if(global.customNodes[n].name=="Modules"){

          /*
          items.push(<div key={"bar4"} style={{padding:4,position:"absolute",bottom:itemspace*4,width:"80%",borderTop:"1px solid #888888"}}></div>)

          let count = 3
          for(let m in global.modules){
            items.push(
              <Dragger key={"draggercustom"+m} name={m}  drop={(name,x,y)=>{
                  //console.log("DO A DROP AT ",name,x,y)
                  setMenu("")

                  localStorage.setItem("litegrapheditor_clipboard",JSON.stringify(global.modules[m]))
                  global.graph.canvas.last_mouse_position[0] = width/2
                  global.graph.canvas.last_mouse_position[1] = height/2
                  global.graph.canvas.pasteFromClipboard()
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();
                }}>
                  <div style={{...style,bottom:itemspace*count++}}>
                    {m}
                  </div>
              </Dragger>
            )
          }

          //items.push(<div key ={"bar3"} style={{padding:10,position:"absolute",bottom:itemspace*3,width:"100%",borderTop:"1px solid #999999"}}></div>)

          items.push(<div key={"bar3"} style={{padding:4,position:"absolute",bottom:itemspace*2,width:"80%",borderTop:"1px solid #888888"}}></div>)

          */



          items.push(
            <div style={{...positionStyle,bottom:itemspace*1}}>
              <div onMouseUp={()=>{
                  console.log("copying global to canvas")
                global.graph.canvas.copyToClipboard()
                let item = localStorage.getItem("litegrapheditor_clipboard")
                console.log(item)

                let webfile = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>URL</key>
    <string>https://eth.build/`+codec.compress(item)+`</string>
  </dict>
  </plist>
    `

                var file = new Blob([item]);
                var url = URL.createObjectURL( file );
                var element = document.createElement("a");
                element.setAttribute('href', url);
                element.setAttribute('download', "eth.build.module" );
                element.style.display = 'none';
                if(document.body){
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 );
                  setOpenSaveDialog(false)
                }
              }} style={{...style,bottom:itemspace*1}}>
                Save
              </div>
            </div>
          )
          items.push(
            <div style={{...positionStyle,bottom:itemspace*2}}>
              <div onMouseUp={()=>{
                document.getElementById("moduleloader").click()
              }} style={{...style,bottom:0}}>
                Load
              </div>
            </div>
          )
        }


        if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"63% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )

        } else if( global.customNodes[n].name=="Modules"){



          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )

      }else if( global.customNodes[n].name=="LitProtocol"){



        extraTabs.push(
          <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
            <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                {global.customNodes[n].name}


                {items}

            </div>
          </div>
        )

    }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"46% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )


        } else if(global.customNodes[n].name=="Components"){

            extraTabs.push(
              <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
                <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                    {global.customNodes[n].name}


                    {items}

                </div>
              </div>
            )

        }else{
          customNodes.push(
            <Grid key={"girdder"+n} onMouseLeave={mouseLeave}  item xs={1} style={{zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}


                  {items}

              </div>
            </Grid>
          )
        }


      }else{
        
        if(drawing){
          if(global.customNodes[n].name!="Modules" && global.customNodes[n].name!="Special" && global.customNodes[n].name!="Components"){
            customNodes.push(
              <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{
                //console.log("SET COLOR",global.customNodes[n].color)
                setDrawingColor("#"+global.customNodes[n].color)
                global.graph.canvas.drawing = "#"+global.customNodes[n].color
                setDrawing("#"+global.customNodes[n].color)
                global.graph.canvas.setDirty(true);
                global.graph.canvas.graph.change();
                
              }}>
                <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                </div>
              </Grid>
            )

          }

          //setDrawingColor
        }else if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,right:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(-90deg)",transformOrigin:"100px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="LitProtocol"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,left:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"22px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if( global.customNodes[n].name=="Special"){

        }else{
          customNodes.push(
            
            <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY>60){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6,}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}

              </div>
            </Grid>
          )
        }
      }

    //}

  }
}




let clickawayscreen = ""
if(!showVideoLibrary && menu){
  clickawayscreen = (
    <div ref={drop}  style={{position:"absolute",left:0,top:0,zIndex:1,width:"100%",height:"100%"}} onClick={()=>{setMenu("");if(global.graph&&global.graph.canvas.search_box)  global.graph.canvas.search_box.close()}}></div>
  )
}

let tools = ""


if(!showVideoLibrary && global.graph&&global.graph.canvas){
  //console.log("TOOLSm",selectToolActive)
  tools = (
    <div>


      <div style={{margin:5}} onClick={async (e)=>{
          if(global.graph.canvas.search_box){
            global.graph.canvas.search_box.close()
            setMenu("")
          }else{
            global.graph.canvas.last_mouse_position[0] = e.clientX-209
            global.graph.canvas.last_mouse_position[1] = e.clientY
            global.graph.canvas.showSearchBox()
            //setMenu("search")
            setMenu("")
          }
          global.graph.canvas.last_mouse_position[0] = width/2
          global.graph.canvas.last_mouse_position[1] = height/2
        }}>
        <Tooltip title="Add Item [space bar]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            add_circle_outline
          </Icon>
        </Tooltip>
      </div>



      <div style={{margin:5}} onClick={async ()=>{
          if(global.graph.canvas.search_box) global.graph.canvas.search_box.close()
          global.graph.canvas.closeSubgraph()
          global.graph.canvas.ds.reset()
          global.graph.canvas.setDirty(true);
          global.graph.canvas.graph.change();
          setDrawing("")
          global.graph.canvas.drawing = false
          global.graph.canvas.selectToolActive = false
          setSelectToolActive(global.graph.canvas.selectToolActive)
        }}>
        <Tooltip title="Reorient [esc key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            aspect_ratio
          </Icon>
        </Tooltip>
      </div>

      <div style={{margin:5,color:drawing?drawingColor:"#dddddd"}} onClick={toggleDraw}>
        <Tooltip title="Draw" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            create
          </Icon>
        </Tooltip>
      </div>


      <div style={{margin:5,color:selectToolActive?"#03A9F4":"#dddddd"}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectToolActive = !global.graph.canvas.selectToolActive
          setSelectToolActive(global.graph.canvas.selectToolActive)
          setDrawing("")
          global.graph.canvas.drawing = false
        }}>
        <Tooltip title="Select [hold ctrl]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            photo_size_select_small
          </Icon>
        </Tooltip>
      </div>



            <div style={{margin:5}} onClick={async ()=>{
                try{
                  global.graph.canvas.copyToClipboard()

                }catch(e){console.log(e)}
              }}>
              <Tooltip title="Copy [ctrl+c]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  file_copy
                </Icon>
              </Tooltip>
            </div>

            <div style={{margin:5}} onClick={async ()=>{
              global.graph.canvas.pasteFromClipboard()
              global.graph.canvas.setDirty(true);
              global.graph.canvas.graph.change();
              }}>
              <Tooltip title="Paste [ctrl+v]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  dynamic_feed
                </Icon>
              </Tooltip>
            </div>


            <div style={{margin:5,color:moreInfo?"#03A9F4":"#dddddd"}} onClick={async ()=>{
              global.graph.canvas.moreInfo = !global.graph.canvas.moreInfo
              setMoreInfo(global.graph.canvas.moreInfo)
              console.log("global.graph.canvas.moreInfo",global.graph.canvas.moreInfo)
              }}>
              <Tooltip title="Properties" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  more
                </Icon>
              </Tooltip>
            </div>


      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectNodes()
        }}>
        <Tooltip title="Select All [ctrl+a]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            select_all
          </Icon>
        </Tooltip>
      </div>




      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.deleteSelectedNodes()
          //console.log("global.graph.canvas",global.graph.canvas)
          global.LiteGraphJS.LiteGraph.closeAllContextMenus();
          if(drawing){
            //console.log("CLEAR INK FROM",global.graph.canvas)
            global.graph.canvas.ink = []
            global.graph.canvas.setDirty(true);
            global.graph.canvas.graph.change();
          }
        }}>
        <Tooltip title="Delete Selected [delete key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            delete
          </Icon>
        </Tooltip>
      </div>




    </div>

  )
}

let extraMenus = ""

if(!showVideoLibrary){
  extraMenus = (
    <div>
      <div style={{zIndex:8,position:"fixed",right:0,top:"20%",width:50}}>
        <div style={{borderRadius:"8px 0px 0px 8px",textAlign:"left",color:"#dddddd",height:400,right:0,top:0,width:475,backgroundColor:"#333333"}}>
          <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

            {tools}
          </div>
        </div>
      </div>

      <div style={{zIndex:2,marginRight:8,position:"fixed",width:width-16,left:8,top:0}} ref={drop2} >
        <Grid container spacing={3}>
          {customNodes}
        </Grid>
      </div>

      {extraTabs}

      {clickawayscreen}
    </div>
  )
}

let qrReader = ""
if(readQr){
  qrReader = (
    <div style={{zIndex:5,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundColor:"#111111",}} onClick={()=>{setReadQr(false)}}>
      <QrReader
        delay={500}
        onError={(e)=>{
          console.log("ERROR",e)
        }}
        onScan={(result)=>{
          console.log("SCAN",result)
          if(result){
            if(result.indexOf("http")>=0){
              window.location = result
            }else{
              window.location = "https://eth.build/"+result
            }
          }
        }}
        style={{ margin:"auto", maxWidth: "80%", maxHeight: "80%"}}
        resolution={1200}
      />
    </div>
  )
}

return (
  <div className="App" style={{color:"#FFFFFF"}}>
    {qrReader}

    {extraMenus}

    <AboutDialog/>
    <SaveDialog liteGraph={liteGraph} setOpenSaveDialog={setOpenSaveDialog} openSaveDialog={openSaveDialog} dynamicWidth={dynamicWidth} screenshot={currentScreenShot} />
    <LoadDialog liteGraph={liteGraph} setOpenLoadDialog={setOpenLoadDialog} openLoadDialog={openLoadDialog} dynamicWidth={dynamicWidth} live={live} />
    <div style={{zIndex:1,position:"fixed",height:barHeight,left:0,bottom:0,width:"100%"}}>
      <div style={{borderRadius:"8px 8px 0px 0px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,left:0,bottom:0,width:525,backgroundColor:"#DFDFDF"}}>
        <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

          <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
              liteGraphCanvas.switchLiveMode(true);
              setLive(!live)
              liteGraphCanvas.draw();
            }}>
            <Tooltip title={live?"Edit":"View"} style={{marginRight:10,cursor:"pointer"}}>
              <Icon>
                {live?"build":"visibility"}
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
              //console.log(liteGraph.status,playing)//cccccc.status==2
              if(playing){
                liteGraph.start()
                setPlaying(false)
              }else{
                liteGraph.stop()
                setPlaying(true)
              }
            }}>
            <Tooltip title={playing?"Playing":"Fast Forwarding"} style={{marginRight:10,cursor:"pointer"}}>
              <Icon>
                {playing ? "play_circle_outline":"fast_forward"}
              </Icon>
            </Tooltip>
          </span>

          <span onClick={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
            onTouchStart={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
          >
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
          </span>

          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={()=>{
              handleOpenSaveDialog()
            }}>
            <Tooltip title="Save" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                save
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              // document.getElementById("loadjsonfile").click()
              setOpenLoadDialog(true);
            }}>
            <Tooltip title="Load" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                open_in_browser
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setOpenAboutDialog(true)
            }}>
            <Tooltip title="About" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                info
              </Icon>
            </Tooltip>
          </span>

          <span style={{margin:5,paddingLeft:10,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setReadQr(!readQr)
            }}>
            <Tooltip title="Scan" style={{marginLeft:10,cursor:"pointer"}}>
              <svg style={{width:24,height:24,opacity:0.95}} viewBox="0 0 24 24">
                <path fill="#000000" d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
              </svg>
            </Tooltip>
          </span>

          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true)
            }}>
            <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                swap_vert
              </Icon>
            </Tooltip>
          </span>

        </div>
      </div>
    </div>





    {/* <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="loadjsonfile" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result
              //console.log("compressedString",compressedString)
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                //console.log("loc",loc,"endloc",endloc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)
              codec.decompress(compressedString).then(json => {
                console.log("configure graph with:",json)
                if(json){
                  localStorage.setItem("litegraph",JSON.stringify(json));
                  liteGraph.configure( json );
                }
              })
            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div> */}

    <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="moduleloader" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result

              /*
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)*/


                if(compressedString){
                  let json = compressedString
                  //  codec.decompress(compressedString).then(json => {
                      /////////
                      console.log("CLIP:",json)
                      localStorage.setItem("litegrapheditor_clipboard",json)
                      global.graph.canvas.last_mouse_position[0] = width/2
                      global.graph.canvas.last_mouse_position[1] = height/2
                      global.graph.canvas.pasteFromClipboard()
                      global.graph.canvas.setDirty(true);
                      global.graph.canvas.graph.change();
                  //  })

                }

            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div>


    <div id="mainCanvas" style={{overscrollBehavior:"none",position:"relative",overflow:'hidden',background:"#222",width:'100%',height:"100%"}}>
      <canvas id='main' width={Math.max(100,width)} height={Math.max(100,height)} tabIndex={10} style={{background:"#111111",outline: 'none',borderBottom:'1px solid #666666'}}></canvas>
      <div id="reactElements"></div>
    </div>

    <canvas id="chart"  style={{outline: 'none', position:'absolute',left:-10000,top:-10000,zIndex:-1,width:320,height:240}}></canvas>

    <div id="clipboarddiv" style={{position:'absolute',left:-10000,top:-10000,zIndex:-1}}></div>


    <Drawer
      variant="persistent"
      anchor="bottom"
      open={showVideoLibrary}
      >
      <div style={{height:height*0.6,backgroundColor:"#eeeeee"}}>
        <div style={{margin:"auto",textAlign:"center",color:"#222222",height:barHeight+3,left:0,bottom:0,width:"100%",backgroundColor:"#DFDFDF"}}>
          <div style={{cursor:"pointer",letterSpacing:-5,borderBottom:"1px solid #999999",borderLeft:"1px solid #999999",borderRight:"1px solid #999999",fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}
            onTouchStart={
              async ()=>{
                setShowVideoLibrary(false);global.showLibrary=false;
                localStorage.setItem("eth.build.showLibrary",false)
              }
            }
            onClick={async ()=>{
              setShowVideoLibrary(false);global.showLibrary=false;
              localStorage.setItem("eth.build.showLibrary",false)
            }}>
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
            <span style={{margin:5,borderLeft:"1px solid #BBBBBB",height:barHeight}}>
              <Tooltip title="Collapse" style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  swap_vert
                </Icon>
              </Tooltip>
            </span>
          </div>
          <div>
            <StackGrid columnWidth={350}>
              {allCards}
            </StackGrid>
          </div>
        </div>
      </div>
    </Drawer>


    <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        key={'bottomcentersnackbar'}
        open={snackbar && snackbar.msg && snackbar.msg!=""}
        onClose={()=>{setSnackbar({msg:"",color:""})}}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{marginBottom:100}}
        message={<span id="message-id" style={{fontFamily: "monospace",color:snackbar.color?snackbar.color:"#d33535",fontSize:22}}>{snackbar.msg}</span>}
      />
  </div>
);
}

//,borderRadius:"16px 16px 0px 0px"


function useWindowSize() {
  let [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([(window.clientWidth||window.scrollWidth||window.innerWidth),(window.clientHeight||window.scrollHeight||window.innerHeight)-8]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export default App;
