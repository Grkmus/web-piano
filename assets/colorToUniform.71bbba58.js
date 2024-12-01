var vt=Object.defineProperty,bt=Object.defineProperties;var Pt=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var Y=(o,t,e)=>t in o?vt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,p=(o,t)=>{for(var e in t||(t={}))Z.call(t,e)&&Y(o,e,t[e]);if(C)for(var e of C(t))J.call(t,e)&&Y(o,e,t[e]);return o},T=(o,t)=>bt(o,Pt(t));var Q=(o,t)=>{var e={};for(var r in o)Z.call(o,r)&&t.indexOf(r)<0&&(e[r]=o[r]);if(o!=null&&C)for(var r of C(o))t.indexOf(r)<0&&J.call(o,r)&&(e[r]=o[r]);return e};import{D as yt,z as tt,a as _t,B as A,A as Gt,c as Mt,x as et,w as St}from"./index.bb750986.js";const w=Object.create(null),rt=Object.create(null);function q(o,t){let e=rt[o];return e===void 0&&(w[t]===void 0&&(w[t]=1),rt[o]=e=w[t]++),e}let G;function Ct(){return(!G||(G==null?void 0:G.isContextLost()))&&(G=yt.get().createCanvas().getContext("webgl",{})),G}let $;function Tt(){if(!$){$="mediump";const o=Ct();o&&o.getShaderPrecisionFormat&&($=o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision?"highp":"mediump")}return $}function $t(o,t,e){return t?o:e?(o=o.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${o}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${o}
        `}function Ut(o,t,e){const r=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(o.substring(0,9)!=="precision"){let n=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return n==="highp"&&r!=="highp"&&(n="mediump"),`precision ${n} float;
${o}`}else if(r!=="highp"&&o.substring(0,15)==="precision highp")return o.replace("precision highp","precision mediump");return o}function At(o,t){return t?`#version 300 es
${o}`:o}const wt={},Et={};function Ft(o,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const r=e?wt:Et;return r[t]?(r[t]++,t+=`-${r[t]}`):r[t]=1,o.indexOf("#define SHADER_NAME")!==-1?o:`${`#define SHADER_NAME ${t}`}
${o}`}function zt(o,t){return t?o.replace("#version 300 es",""):o}const E={stripVersion:zt,ensurePrecision:Ut,addProgramDefines:$t,setProgramName:Ft,insertVersion:At},F=Object.create(null),lt=class V{constructor(t){t=p(p({},V.defaultOptions),t);const e=t.fragment.indexOf("#version 300 es")!==-1,r={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Tt()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let n=t.fragment,i=t.vertex;Object.keys(E).forEach(a=>{const s=r[a];n=E[a](n,s,!0),i=E[a](i,s,!1)}),this.fragment=n,this.vertex=i,this._key=q(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return F[e]||(F[e]=new V(t)),F[e]}};lt.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let ft=lt;const ot={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function Ot(o){var t;return(t=ot[o])!=null?t:ot.float32}const Bt={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Rt({source:o,entryPoint:t}){var n;const e={},r=o.indexOf(`fn ${t}`);if(r!==-1){const i=o.indexOf("->",r);if(i!==-1){const a=o.substring(r,i),s=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let u;for(;(u=s.exec(a))!==null;){const l=(n=Bt[u[3]])!=null?n:"float32";e[u[2]]={location:parseInt(u[1],10),format:l,stride:Ot(l).stride,offset:0,instance:!1,start:0}}}}return e}function z(o){var f,m,v;const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,n=/var(<[^>]+>)? (\w+)/,i=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,s=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,l=(f=o.match(t))==null?void 0:f.map(d=>({group:parseInt(d.match(e)[1],10),binding:parseInt(d.match(r)[1],10),name:d.match(n)[2],isUniform:d.match(n)[1]==="<uniform>",type:d.match(i)[1]}));if(!l)return{groups:[],structs:[]};const c=(v=(m=o.match(a))==null?void 0:m.map(d=>{const g=d.match(u)[1],b=d.match(s).reduce((P,y)=>{const[h,_]=y.split(":");return P[h.trim()]=_.trim(),P},{});return b?{name:g,members:b}:null}).filter(({name:d})=>l.some(g=>g.type===d)))!=null?v:[];return{groups:l,structs:c}}var M=(o=>(o[o.VERTEX=1]="VERTEX",o[o.FRAGMENT=2]="FRAGMENT",o[o.COMPUTE=4]="COMPUTE",o))(M||{});function jt({groups:o}){const t=[];for(let e=0;e<o.length;e++){const r=o[e];t[r.group]||(t[r.group]=[]),r.isUniform?t[r.group].push({binding:r.binding,visibility:M.VERTEX|M.FRAGMENT,buffer:{type:"uniform"}}):r.type==="sampler"?t[r.group].push({binding:r.binding,visibility:M.FRAGMENT,sampler:{type:"filtering"}}):r.type==="texture_2d"&&t[r.group].push({binding:r.binding,visibility:M.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function It({groups:o}){const t=[];for(let e=0;e<o.length;e++){const r=o[e];t[r.group]||(t[r.group]={}),t[r.group][r.name]=r.binding}return t}function Dt(o,t){const e=new Set,r=new Set,n=[...o.structs,...t.structs].filter(a=>e.has(a.name)?!1:(e.add(a.name),!0)),i=[...o.groups,...t.groups].filter(a=>{const s=`${a.name}-${a.binding}`;return r.has(s)?!1:(r.add(s),!0)});return{structs:n,groups:i}}const O=Object.create(null);class U{constructor(t){var s,u;this._layoutKey=0;const{fragment:e,vertex:r,layout:n,gpuLayout:i,name:a}=t;if(this.name=a,this.fragment=e,this.vertex=r,e.source===r.source){const l=z(e.source);this.structsAndGroups=l}else{const l=z(r.source),c=z(e.source);this.structsAndGroups=Dt(l,c)}this.layout=n!=null?n:It(this.structsAndGroups),this.gpuLayout=i!=null?i:jt(this.structsAndGroups),this.autoAssignGlobalUniforms=((s=this.layout[0])==null?void 0:s.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,r=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=q(r,"program")}get attributeData(){var t;return(t=this._attributeData)!=null||(this._attributeData=Rt(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return O[e]||(O[e]=new U(t)),O[e]}}function kt(o,t){switch(o){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const dt=class mt{constructor(t,e){var n,i;this._touched=0,this.uid=tt("uniform"),this._resourceType="uniformGroup",this._resourceId=tt("resource"),this.isUniformGroup=!0,this._dirtyId=0,e=p(p({},mt.defaultOptions),e),this.uniformStructures=t;const r={};for(const a in t){const s=t[a];s.name=a,s.size=(n=s.size)!=null?n:1,(i=s.value)!=null||(s.value=kt(s.type,s.size)),r[a]=s.value}this.uniforms=r,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=q(Object.keys(r).map(a=>`${a}-${t[a].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};dt.defaultOptions={ubo:!1,isStatic:!1};let Nt=dt;var K=(o=>(o[o.WEBGL=1]="WEBGL",o[o.WEBGPU=2]="WEBGPU",o[o.BOTH=3]="BOTH",o))(K||{});class ht extends _t{constructor(t){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:r,groups:n,resources:i,compatibleRenderers:a,groupMap:s}=t;this.gpuProgram=e,this.glProgram=r,a===void 0&&(a=0,e&&(a|=K.WEBGPU),r&&(a|=K.WEBGL)),this.compatibleRenderers=a;const u={};if(!i&&!n&&(i={}),i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&n&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&s)for(const l in s)for(const c in s[l]){const f=s[l][c];u[f]={group:l,binding:c,name:f}}else if(e&&n&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(c=>{s[c.group]=s[c.group]||{},s[c.group][c.binding]=c.name,u[c.name]=c})}else if(i){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(c=>{s[c.group]=s[c.group]||{},s[c.group][c.binding]=c.name,u[c.name]=c})}else{s={},n={99:new A},this._ownedBindGroups.push(n[99]);let l=0;for(const c in i)u[c]={group:99,binding:l,name:c},s[99]=s[99]||{},s[99][l]=c,l++}n={};for(const l in i){const c=l;let f=i[l];!f.source&&!f._resourceType&&(f=new Nt(f));const m=u[c];m&&(n[m.group]||(n[m.group]=new A,this._ownedBindGroups.push(n[m.group])),n[m.group].setResource(f,m.binding))}}this.groups=n,this._uniformBindMap=s,this.resources=this._buildResourceAccessor(n,u)}addResource(t,e,r){var n,i;(n=this._uniformBindMap)[e]||(n[e]={}),(i=this._uniformBindMap[e])[r]||(i[r]=t),this.groups[e]||(this.groups[e]=new A,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const r={};for(const n in e){const i=e[n];Object.defineProperty(r,i.name,{get(){return t[i.group].getResource(i.binding)},set(a){t[i.group].setResource(a,i.binding)}})}return r}destroy(t=!1){var e,r;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(r=this.glProgram)==null||r.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(n=>{n.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const s=t,{gpu:e,gl:r}=s,n=Q(s,["gpu","gl"]);let i,a;return e&&(i=U.from(e)),r&&(a=ft.from(r)),new ht(p({gpuProgram:i,glProgram:a},n))}}const Ht={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},B=0,R=1,j=2,I=3,D=4,k=5,X=class pt{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<B)}set blend(t){!!(this.data&1<<B)!==t&&(this.data^=1<<B)}get offsets(){return!!(this.data&1<<R)}set offsets(t){!!(this.data&1<<R)!==t&&(this.data^=1<<R)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<j)}set culling(t){!!(this.data&1<<j)!==t&&(this.data^=1<<j)}get depthTest(){return!!(this.data&1<<I)}set depthTest(t){!!(this.data&1<<I)!==t&&(this.data^=1<<I)}get depthMask(){return!!(this.data&1<<k)}set depthMask(t){!!(this.data&1<<k)!==t&&(this.data^=1<<k)}get clockwiseFrontFace(){return!!(this.data&1<<D)}set clockwiseFrontFace(t){!!(this.data&1<<D)!==t&&(this.data^=1<<D)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=Ht[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new pt;return t.depthTest=!1,t.blend=!0,t}};X.default2d=X.for2d();let fe=X,Lt=0;class Wt{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,r){const n=new Gt(T(p({},this.textureOptions),{width:t,height:e,resolution:1,antialias:r,autoGarbageCollect:!0}));return new Mt({source:n,label:`texturePool_${Lt++}`})}getOptimalTexture(t,e,r=1,n){let i=Math.ceil(t*r-1e-6),a=Math.ceil(e*r-1e-6);i=et(i),a=et(a);const s=(i<<17)+(a<<1)+(n?1:0);this._texturePool[s]||(this._texturePool[s]=[]);let u=this._texturePool[s].pop();return u||(u=this.createTexture(i,a,n)),u.source._resolution=r,u.source.width=i/r,u.source.height=a/r,u.source.pixelWidth=i,u.source.pixelHeight=a,u.frame.x=0,u.frame.y=0,u.frame.width=t,u.frame.height=e,u.updateUvs(),this._poolKeyHash[u.uid]=s,u}getSameSizeTexture(t,e=!1){const r=t.source;return this.getOptimalTexture(t.width,t.height,r._resolution,e)}returnTexture(t){const e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const r=this._texturePool[e];if(r)for(let n=0;n<r.length;n++)r[n].destroy(!0)}this._texturePool={}}}const de=new Wt;function nt(o,t,e){if(o)for(const r in o){const n=r.toLocaleLowerCase(),i=t[n];if(i){let a=o[r];r==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&i.push(`//----${e}----//`),i.push(a)}else St(`${r} placement hook does not exist in shader`)}}const Vt=/\{\{(.*?)\}\}/g;function st(o){var r,n;const t={};return((n=(r=o.match(Vt))==null?void 0:r.map(i=>i.replace(/[{()}]/g,"")))!=null?n:[]).forEach(i=>{t[i]=[]}),t}function it(o,t){let e;const r=/@in\s+([^;]+);/g;for(;(e=r.exec(o))!==null;)t.push(e[1])}function at(o,t,e=!1){const r=[];it(t,r),o.forEach(s=>{s.header&&it(s.header,r)});const n=r;e&&n.sort();const i=n.map((s,u)=>`       @location(${u}) ${s},`).join(`
`);let a=t.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${i}
`),a}function ut(o,t){let e;const r=/@out\s+([^;]+);/g;for(;(e=r.exec(o))!==null;)t.push(e[1])}function Kt(o){const e=/\b(\w+)\s*:/g.exec(o);return e?e[1]:""}function Xt(o){const t=/@.*?\s+/g;return o.replace(t,"")}function qt(o,t){const e=[];ut(t,e),o.forEach(u=>{u.header&&ut(u.header,e)});let r=0;const n=e.sort().map(u=>u.indexOf("builtin")>-1?u:`@location(${r++}) ${u}`).join(`,
`),i=e.sort().map(u=>`       var ${Xt(u)};`).join(`
`),a=`return VSOutput(
                ${e.sort().map(u=>` ${Kt(u)}`).join(`,
`)});`;let s=t.replace(/@out\s+[^;]+;\s*/g,"");return s=s.replace("{{struct}}",`
${n}
`),s=s.replace("{{start}}",`
${i}
`),s=s.replace("{{return}}",`
${a}
`),s}function ct(o,t){let e=o;for(const r in t){const n=t[r];n.join(`
`).length?e=e.replace(`{{${r}}}`,`//-----${r} START-----//
${n.join(`
`)}
//----${r} FINISH----//`):e=e.replace(`{{${r}}}`,"")}return e}const x=Object.create(null),N=new Map;let Yt=0;function Zt({template:o,bits:t}){const e=gt(o,t);if(x[e])return x[e];const{vertex:r,fragment:n}=Qt(o,t);return x[e]=xt(r,n,t),x[e]}function Jt({template:o,bits:t}){const e=gt(o,t);return x[e]||(x[e]=xt(o.vertex,o.fragment,t)),x[e]}function Qt(o,t){const e=t.map(a=>a.vertex).filter(a=>!!a),r=t.map(a=>a.fragment).filter(a=>!!a);let n=at(e,o.vertex,!0);n=qt(e,n);const i=at(r,o.fragment,!0);return{vertex:n,fragment:i}}function gt(o,t){return t.map(e=>(N.has(e)||N.set(e,Yt++),N.get(e))).sort((e,r)=>e-r).join("-")+o.vertex+o.fragment}function xt(o,t,e){const r=st(o),n=st(t);return e.forEach(i=>{nt(i.vertex,r,i.name),nt(i.fragment,n,i.name)}),{vertex:ct(o,r),fragment:ct(t,n)}}const te=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,ee=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,re=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,oe=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,ne={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},se={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function me({bits:o,name:t}){const e=Zt({template:{fragment:ee,vertex:te},bits:[ne,...o]});return U.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function he({bits:o,name:t}){return new ft(p({name:t},Jt({template:{vertex:re,fragment:oe},bits:[se,...o]})))}const pe={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},ge={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},H={};function ie(o){const t=[];if(o===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let r=0;r<o;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join(`
`)}function ae(o){const t=[];if(o===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<o;e++)e===o-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function xe(o){return H[o]||(H[o]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${ie(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${ae(16)}
            `}}),H[o]}const L={};function ue(o){const t=[];for(let e=0;e<o;e++)e>0&&t.push("else"),e<o-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function ve(o){return L[o]||(L[o]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${o}];
              
            `,main:`
    
                ${ue(16)}
            `}}),L[o]}const be={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},Pe={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},W={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},ye=T(p({},W),{vertex:T(p({},W.vertex),{header:W.vertex.header.replace("group(1)","group(2)")})}),_e={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class Ge{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(t,e,r,n){const i=this.renderable,a=this.texture,s=i.groupTransform,u=s.a,l=s.b,c=s.c,f=s.d,m=s.tx,v=s.ty,d=this.bounds,g=d.maxX,b=d.minX,P=d.maxY,y=d.minY,h=a.uvs,_=i.groupColorAlpha,S=n<<16|this.roundPixels&65535;t[r+0]=u*b+c*y+m,t[r+1]=f*y+l*b+v,t[r+2]=h.x0,t[r+3]=h.y0,e[r+4]=_,e[r+5]=S,t[r+6]=u*g+c*y+m,t[r+7]=f*y+l*g+v,t[r+8]=h.x1,t[r+9]=h.y1,e[r+10]=_,e[r+11]=S,t[r+12]=u*g+c*P+m,t[r+13]=f*P+l*g+v,t[r+14]=h.x2,t[r+15]=h.y2,e[r+16]=_,e[r+17]=S,t[r+18]=u*b+c*P+m,t[r+19]=f*P+l*b+v,t[r+20]=h.x3,t[r+21]=h.y3,e[r+22]=_,e[r+23]=S}packIndex(t,e,r){t[e]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}function Me(o,t,e){const r=(o>>24&255)/255;t[e++]=(o&255)/255*r,t[e++]=(o>>8&255)/255*r,t[e++]=(o>>16&255)/255*r,t[e++]=r}export{Ge as B,U as G,K as R,fe as S,de as T,Nt as U,ht as a,me as b,Me as c,he as d,_e as e,Pe as f,pe as g,xe as h,ge as i,ve as j,q as k,W as l,ye as m,ft as n,Ot as o,be as r};
