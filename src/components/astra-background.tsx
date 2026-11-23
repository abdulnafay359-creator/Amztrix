"use client";

import { useEffect, useRef } from "react";

const vertex = `
precision highp float;
attribute vec3 aScene0; attribute vec3 aScene1; attribute vec3 aScene2;
attribute vec3 aScene3; attribute vec3 aScene4; attribute vec3 aScene5;
attribute vec3 aStart; attribute vec3 aColor;
attribute float aSize; attribute float aSeed;
uniform float uTime; uniform float uIntro; uniform float uScene; uniform float uDpr; uniform float uAspect;
uniform vec2 uPointer; uniform float uActive; uniform float uOffset;
varying vec3 vColor; varying float vAlpha; varying float vFlare;
vec3 sceneAt(float n){
  if(n<.5)return aScene0; if(n<1.5)return aScene1; if(n<2.5)return aScene2;
  if(n<3.5)return aScene3; if(n<4.5)return aScene4; return aScene5;
}
void main(){
  vec3 target=aScene0;
  vec3 p=mix(aStart,target,uIntro);
  p.x+=sin(uTime*.08+aSeed*41.0)*.006;
  p.y+=cos(uTime*.065+aSeed*29.0)*.005;
  p.x+=uOffset;
  p.z+=sin(uTime*.33+aSeed*25.0)*.012;
  float kx=min(1.0,1.0/max(uAspect,.001)); float ky=clamp(uAspect,.001,1.0);
  vec2 pd=uPointer/vec2(kx,ky); vec2 d=p.xy-pd; float dist=length(d);
  if(uActive>.5&&dist<.26&&dist>.0001)p.xy+=normalize(d)*pow(1.0-dist/.26,2.0)*.05;
  p.xy+=uPointer*uActive*vec2(.020,.015)*(.30+p.z*.55);
  float perspective=1.0/(1.0+p.z*.30);
  float sceneScale=mix(1.36,1.76,smoothstep(1.05,1.75,uAspect));
  gl_Position=vec4(p.xy*vec2(kx,ky)*perspective*sceneScale,p.z*.08,1.0);
  float twinkle=1.0+.15*sin(uTime*1.6+aSeed*37.0);
  gl_PointSize=clamp(aSize*twinkle*uDpr*perspective*1.5,1.5,34.0);
  float shade=mix(.40,1.0,fract(aSeed*7.31));float flicker=.62+.38*sin(uTime*(.6+aSeed*1.4)+aSeed*31.0);float depthFade=clamp(perspective*.85+.18,.55,1.05);
  vColor=aColor*1.24;vAlpha=shade*flicker*depthFade;vFlare=smoothstep(3.05,4.3,aSize);
}`;

const fragment = `
precision mediump float; varying vec3 vColor; varying float vAlpha; varying float vFlare;
void main(){vec2 q=gl_PointCoord-.5;vec2 aq=abs(q);float d2=dot(q,q)*4.0;float core=exp(-d2*9.0);float mid=exp(-d2*3.4)*.26;float glow=exp(-d2*2.2)*.06;float spikes=(exp(-aq.y*aq.y*130.0)*exp(-aq.x*20.0)+exp(-aq.x*aq.x*130.0)*exp(-aq.y*20.0))*vFlare;float a=core+mid+glow+spikes*.75;if(a<.005)discard;vec3 col=mix(vColor,vec3(1.0,.91,.70),min(1.0,core*.42+spikes*.35));gl_FragColor=vec4(col,a*vAlpha*.48);}`;

export function AstraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas=canvasRef.current;
    if(!canvas)return;
    const gl=canvas.getContext("webgl",{alpha:false,antialias:true,powerPreference:"high-performance"});
    if(!gl)return;
    const compile=(type:number,source:string)=>{const shader=gl.createShader(type)!;gl.shaderSource(shader,source);gl.compileShader(shader);return shader;};
    const program=gl.createProgram()!;
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);gl.useProgram(program);
    const mobile=window.matchMedia("(max-width:760px)").matches,count=mobile?48000:100000;
    const scenes=Array.from({length:6},()=>new Float32Array(count*3));
    const start=new Float32Array(count*3),color=new Float32Array(count*3),size=new Float32Array(count),seed=new Float32Array(count);
    const colors=[[.91,.70,.32],[.25,.58,.39],[.63,.18,.20],[.98,.84,.52],[.48,.68,.39]];
    const TAU=Math.PI*2,rnd=Math.random;
    const bell=()=>(rnd()+rnd()+rnd()-1.5)*.6667;
    for(let i=0;i<count;i++){
      const i3=i*3,s=rnd();seed[i]=s;
      const gt=Math.pow(rnd(),.92),gr=.032+gt*.72,garm=(i%2)*Math.PI+gt*5.2;
      let gx:number,gy:number;
      if(rnd()<.7){const spread=bell()*(.014+gt*.090);gx=Math.cos(garm)*gr-Math.sin(garm)*spread;gy=Math.sin(garm)*gr+Math.cos(garm)*spread;}
      else{const ga=rnd()*TAU,grr=gr*(.25+rnd()*.75);gx=Math.cos(ga)*grr;gy=Math.sin(ga)*grr;}
      scenes[0].set([gx,gy,bell()*(.014+gt*.090)],i3);
      const band=i%6,orbitR=.145+band*.112+bell()*.020,oa=rnd()*TAU,sa=Math.sin(oa),ca=Math.cos(oa),sq=.30+rnd()*.14,zs=.86+rnd()*.16;
      scenes[1].set([ca*orbitR,sa*orbitR*sq+bell()*.008,sa*orbitR*zs],i3);
      const hu=rnd(),hy=(hu-.5)*1.42,hR=.225*(.72+.28*Math.sin(Math.PI*hu)),ha=hu*TAU*2.3;
      let hx:number,hz:number;
      if(rnd()<.15){const f=rnd()*2-1;hx=Math.cos(ha)*hR*f;hz=Math.sin(ha)*hR*f;}
      else{const off=(i%2)*Math.PI,ta=rnd()*TAU,tr=.012+Math.pow(rnd(),.7)*.042;hx=Math.cos(ha+off)*hR+Math.cos(ta)*tr;hz=Math.sin(ha+off)*hR+Math.sin(ta)*tr;}
      const lean=.17,cl=Math.cos(lean),sl=Math.sin(lean);
      scenes[2].set([hx*cl-hy*sl,hx*sl+hy*cl,hz],i3);
      const tu=rnd()*TAU,tv=rnd()*TAU,tube=.138*(.84+rnd()*.16),tR=.44,cx=(tR+tube*Math.cos(tv))*Math.cos(tu),cy0=tube*Math.sin(tv),cz0=(tR+tube*Math.cos(tv))*Math.sin(tu),tilt=1.02,ct=Math.cos(tilt),st=Math.sin(tilt);
      scenes[3].set([cx,cy0*ct-cz0*st,cy0*st+cz0*ct],i3);
      const sk=i+.5,sphi=Math.acos(1-2*sk/count),stheta=Math.PI*(1+Math.sqrt(5))*sk,sR=.66*(1+bell()*.012);
      scenes[4].set([Math.sin(sphi)*Math.cos(stheta)*sR,Math.cos(sphi)*sR,Math.sin(sphi)*Math.sin(stheta)*sR],i3);
      let bx:number,by:number,bz:number;
      if(rnd()<.42){const ring=Math.floor(rnd()*5),br=.12+ring*.14+bell()*.005,ba=rnd()*TAU;bx=Math.cos(ba)*br;by=Math.sin(ba)*br;bz=bell()*.045;}
      else{const ray=Math.floor(rnd()*13),base=ray/13*TAU,br=.06+Math.pow(rnd(),.55)*.62,ba=base+Math.sin(br*7+ray*1.7)*.17*br+bell()*.02;bx=Math.cos(ba)*br;by=Math.sin(ba)*br;bz=bell()*.055;}
      scenes[5].set([bx,by,bz],i3);

      // Full-screen glitter field: every scene shares the same scattered position.
      const scatterX=(rnd()-.5)*2.48,scatterY=(rnd()-.5)*1.34,scatterZ=bell()*.62;
      for(let sceneIndex=0;sceneIndex<6;sceneIndex++)scenes[sceneIndex].set([scatterX,scatterY,scatterZ],i3);
      start.set([scatterX+bell()*.08,scatterY+bell()*.08,scatterZ+bell()*.08],i3);
      const roll=rnd();let colorIndex:number;
      if(gr<.13)colorIndex=rnd()<.78?0:1;else if(roll<.40)colorIndex=0;else if(roll<.67)colorIndex=1;else if(roll<.85)colorIndex=2;else if(roll<.95)colorIndex=3;else colorIndex=4;
      color.set(colors[colorIndex],i3);const sRoll=rnd();size[i]=sRoll<.005?6.5+rnd()*3:sRoll<.045?3.4+rnd()*2.2:sRoll<.22?1.9+rnd()*1.35:.85+rnd()*1.05;
    }
    const bind=(name:string,dimensions:number,data:Float32Array)=>{const loc=gl.getAttribLocation(program,name);if(loc<0)return;const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,dimensions,gl.FLOAT,false,0,0);};
    scenes.forEach((data,index)=>bind(`aScene${index}`,3,data));bind("aStart",3,start);bind("aColor",3,color);bind("aSize",1,size);bind("aSeed",1,seed);
    const uTime=gl.getUniformLocation(program,"uTime"),uIntro=gl.getUniformLocation(program,"uIntro"),uScene=gl.getUniformLocation(program,"uScene"),uDpr=gl.getUniformLocation(program,"uDpr"),uAspect=gl.getUniformLocation(program,"uAspect"),uPointer=gl.getUniformLocation(program,"uPointer"),uActive=gl.getUniformLocation(program,"uActive"),uOffset=gl.getUniformLocation(program,"uOffset");
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.disable(gl.DEPTH_TEST);
    let width=0,height=0,dpr=1,aspect=1,raf=0,px=0,py=0,tx=0,ty=0,active=0,currentScene=0,lastTime=performance.now();
    const startTime=lastTime,reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const resize=()=>{width=window.innerWidth;height=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,2);aspect=width/Math.max(1,height);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);gl.viewport(0,0,canvas.width,canvas.height);};
    const pointer=(event:PointerEvent)=>{tx=event.clientX/width*2-1;ty=1-event.clientY/height*2;active=1;};
    const frame=(now:number)=>{const elapsed=(now-startTime)/1000,dt=Math.min(.06,(now-lastTime)/1000);lastTime=now;const ease=reduce?1:1-Math.exp(-dt*4.5);px+=(tx-px)*ease;py+=(ty-py)*ease;const story=document.querySelector<HTMLElement>("[data-astra-story]");let desiredScene=0;if(story){const startAt=story.offsetTop,endAt=startAt+story.offsetHeight-height;const progress=Math.max(0,Math.min(5,(window.scrollY-startAt)/Math.max(1,endAt-startAt)*5)),base=Math.floor(progress),frac=progress-base;desiredScene=base+frac*frac*(3-2*frac);}const sceneEase=reduce?1:1-Math.exp(-Math.min(.25,dt)*2);currentScene+=(desiredScene-currentScene)*sceneEase;if(Math.abs(desiredScene-currentScene)<.015)currentScene=desiredScene;const intro=reduce?1:Math.min(1,Math.max(0,(elapsed-.15)/2.6)),eased=intro*intro*(3-2*intro);gl.clearColor(.016,.027,.018,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform1f(uTime,elapsed);gl.uniform1f(uIntro,eased);gl.uniform1f(uScene,currentScene);gl.uniform1f(uDpr,dpr);gl.uniform1f(uAspect,aspect);gl.uniform2f(uPointer,px,py);gl.uniform1f(uActive,active);gl.uniform1f(uOffset,0);gl.drawArrays(gl.POINTS,0,count);if(!reduce)raf=requestAnimationFrame(frame);};
    resize();window.addEventListener("resize",resize);window.addEventListener("pointermove",pointer,{passive:true});raf=requestAnimationFrame(frame);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("pointermove",pointer);};
  },[]);
  return <div className="astra-webgl-background" aria-hidden="true"><canvas ref={canvasRef}/><div className="astra-vignette"/><div className="astra-grain"/></div>;
}
