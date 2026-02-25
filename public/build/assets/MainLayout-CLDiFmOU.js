import{j as e,b as K,r as h,c as U,L as d}from"./app-Bc5zk5HS.js";import{c as q}from"./createLucideIcon-BynEmhEK.js";const X=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],H=q("bookmark",X);function Y({open:i,onClose:a}){return i?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e.jsxs("div",{className:`
                    relative w-full max-w-sm
                    rounded-md bg-gray-50 p-6
                    border border-gray-800
                    shadow-[4px_4px_0px] shadow-gray-800
                `,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-800 border-b border-gray-400",children:"Logout Confirmation"}),e.jsx("p",{className:"mt-2 text-sm text-gray-600",children:"Are you sure you want to logout?"}),e.jsxs("div",{className:"mt-6 flex justify-end gap-3",children:[e.jsx("button",{onClick:a,className:`
                            text-sm font-medium text-slate-600
                            px-4 py-1.5 rounded-md
                            border border-transparent
                            transition-all duration-200
                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        `,children:"Cancel"}),e.jsx("button",{onClick:()=>K.post("/logout"),className:`
                            text-sm font-medium text-red-600
                            px-4 py-1.5 rounded-md
                            border border-transparent
                            transition-all duration-200
                            hover:border-red-600 hover:shadow-[2px_2px_0px] hover:shadow-red-600
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        `,children:"Logout"})]})]})]}):null}function G(){const[i,a]=h.useState(!1),[f,u]=h.useState(!1),{auth:m}=U().props;return e.jsxs("header",{className:"sticky top-0 z-50 border-b border-slate-200 bg-gray-50",children:[e.jsxs("nav",{className:"mx-auto max-w-6xl px-6",children:[e.jsxs("div",{className:"flex h-16 items-center justify-between",children:[e.jsx(d,{href:"/",className:"text-lg font-bold tracking-tight",children:"InitLy"}),e.jsxs("div",{className:"hidden items-center gap-3 md:flex",children:[e.jsx(d,{href:"/",className:`
                                text-sm font-medium text-slate-600
                                px-3 py-1.5 rounded-md
                                border border-transparent
                                transition-all duration-200
                                hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            `,children:"Home"}),e.jsx(d,{href:"/starter-kit",className:`
                                text-sm font-medium text-slate-600
                                px-3 py-1.5 rounded-md
                                border border-transparent
                                transition-all duration-200
                                hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            `,children:"Starter Kits"}),m.user?e.jsxs(e.Fragment,{children:[e.jsxs(d,{href:"/saved-kits",className:`
                                        inline-flex items-center gap-1.5
                                        text-sm font-medium text-slate-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    `,children:[e.jsx(H,{className:"h-3.5 w-3.5"}),"Saved"]}),e.jsx("div",{className:"h-4 w-px bg-slate-300"}),e.jsxs("span",{className:"text-sm text-gray-700",children:[m.user.name," 👋"]}),e.jsx("button",{onClick:()=>u(!0),className:`
                                    text-sm font-medium text-red-600
                                    px-3 py-1.5 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-red-600 hover:shadow-[2px_2px_0px] hover:shadow-red-600
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                  `,children:"Logout"})]}):e.jsxs(e.Fragment,{children:[e.jsx(d,{href:"/login",className:`
                                        text-sm font-medium text-slate-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    `,children:"Login"}),e.jsx(d,{href:"/register",className:`
                                        text-sm font-medium
                                        text-white bg-gray-800
                                        px-4 py-1.5 rounded-md
                                        border border-gray-800
                                        shadow-[2px_2px_0px] shadow-gray-500
                                        transition-all duration-200
                                        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                        active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-500
                                    `,children:"Register"})]})]}),e.jsx("button",{onClick:()=>a(!i),className:`
                            inline-flex items-center justify-center
                            rounded-md p-2
                            text-slate-600
                            border border-transparent
                            transition-all duration-200
                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            md:hidden
                        `,children:i?"✕":"☰"})]}),i&&e.jsx("div",{className:"pb-4 md:hidden",children:e.jsxs("div",{className:"flex flex-col gap-2 border-t border-slate-200 pt-4",children:[e.jsx(d,{href:"/",className:`
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                `,onClick:()=>a(!1),children:"Home"}),e.jsx(d,{href:"/starter-kit",className:`
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                `,onClick:()=>a(!1),children:"Starter Kits"}),m.user?e.jsxs(e.Fragment,{children:[e.jsxs(d,{href:"/saved-kits",className:`
                                            inline-flex items-center gap-1.5
                                            text-sm font-medium text-slate-600
                                            px-3 py-2 rounded-md
                                            border border-transparent
                                            transition-all duration-200
                                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        `,onClick:()=>a(!1),children:[e.jsx(H,{className:"h-3.5 w-3.5"}),"Saved Kits"]}),e.jsx("div",{className:"border-t border-slate-200 pt-3 mt-1",children:e.jsxs("div",{className:"flex items-center justify-between px-3",children:[e.jsxs("span",{className:"text-sm text-gray-700",children:[m.user.name," 👋"]}),e.jsx("button",{onClick:()=>{a(!1),u(!0)},className:`
                                                text-sm font-medium text-red-600
                                                px-3 py-1.5 rounded-md
                                                border border-transparent
                                                transition-all duration-200
                                                hover:border-red-600 hover:shadow-[2px_2px_0px] hover:shadow-red-600
                                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                              `,children:"Logout"})]})})]}):e.jsxs("div",{className:"border-t border-slate-200 pt-3 mt-1 flex flex-col gap-2",children:[e.jsx(d,{href:"/login",className:`
                                            text-sm font-medium text-slate-600
                                            px-3 py-2 rounded-md
                                            border border-transparent
                                            transition-all duration-200
                                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        `,onClick:()=>a(!1),children:"Login"}),e.jsx(d,{href:"/register",className:`
                                            text-sm font-medium text-center
                                            text-white bg-gray-800
                                            px-4 py-2 rounded-md
                                            border border-gray-800
                                            shadow-[2px_2px_0px] shadow-gray-500
                                            transition-all duration-200
                                            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                            active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-500
                                        `,onClick:()=>a(!1),children:"Register"})]})]})})]}),e.jsx(Y,{open:f,onClose:()=>u(!1)})]})}function V(){return e.jsx("footer",{className:"border-t border-slate-200 bg-gray-50",children:e.jsx("div",{className:"mx-auto max-w-6xl px-6",children:e.jsx("div",{className:"py-6 text-center",children:e.jsx("p",{className:"text-sm text-slate-500",children:"Copyright © 2026 InitLy"})})})})}function $(){const i=h.useRef(null),a=h.useRef({x:-9999,y:-9999}),f=h.useRef(0),u=h.useRef([]),m=h.useRef(0);return h.useEffect(()=>{const l=i.current;if(!l)return;const o=l.getContext("2d");if(!o)return;const R=4,g=220,j=()=>{l.width=window.innerWidth,l.height=window.innerHeight,I()},I=()=>{const n=l.width,x=l.height;u.current=Array.from({length:R},(y,s)=>{const t=Array.from({length:5},(v,c)=>({x:n/4*c,y:x*.15+x*.7*s/(R-1)})),p=Array.from({length:4},(v,c)=>({cx1:t[c].x+n/4/3,cy1:t[c].y+(Math.random()-.5)*x*.25,cx2:t[c+1].x-n/4/3,cy2:t[c+1].y+(Math.random()-.5)*x*.25}));return{points:t,controlPoints:p,opacity:.06+Math.random()*.06,speed:3e-4+Math.random()*2e-4,offset:Math.random()*Math.PI*2,width:.8+Math.random()*.8}})};j(),window.addEventListener("resize",j);const E=n=>{a.current={x:n.clientX,y:n.clientY}},P=()=>{a.current={x:-9999,y:-9999}};window.addEventListener("mousemove",E),window.addEventListener("mouseleave",P);const S=(n,x,y,s,r)=>{const t=1-n;return t*t*t*x+3*t*t*n*y+3*t*n*n*s+n*n*n*r},z=()=>{const n=l.width,x=l.height;o.clearRect(0,0,n,x),m.current+=1;const y=m.current,s=a.current;for(const r of u.current)o.beginPath(),r.points.forEach((t,p)=>{if(p===0){o.moveTo(t.x,t.y);return}const v=r.controlPoints[p-1],c=r.points[p-1],O=Math.sin(y*r.speed*60+r.offset+p*.8)*x*.04,T=Math.cos(y*r.speed*60+r.offset+p*1.2)*x*.04;let N=v.cx1,_=v.cy1+O,C=v.cx2,k=v.cy2+T;if(s.x!==-9999){const W=S(.5,c.x,N,C,t.x),B=S(.5,c.y,_,k,t.y),L=W-s.x,M=B-s.y,b=Math.sqrt(L*L+M*M);if(b<g){const w=Math.pow(1-b/g,2)*80,A=L/b,F=M/b;_+=F*w,k+=F*w,N+=A*w*.3,C+=A*w*.3}}o.bezierCurveTo(N,_,C,k,t.x,t.y)}),o.strokeStyle=`rgba(71, 71, 71, ${r.opacity})`,o.lineWidth=r.width,o.stroke();if(s.x!==-9999){const r=o.createRadialGradient(s.x,s.y,0,s.x,s.y,g*.6);r.addColorStop(0,"rgba(180, 180, 180, 0.04)"),r.addColorStop(1,"rgba(180, 180, 180, 0)"),o.fillStyle=r,o.beginPath(),o.arc(s.x,s.y,g*.6,0,Math.PI*2),o.fill()}f.current=requestAnimationFrame(z)};return z(),()=>{cancelAnimationFrame(f.current),window.removeEventListener("resize",j),window.removeEventListener("mousemove",E),window.removeEventListener("mouseleave",P)}},[]),e.jsx("canvas",{ref:i,className:"fixed inset-0 -z-10 pointer-events-none"})}function Q({children:i}){return e.jsxs("div",{className:"min-h-screen flex flex-col",children:[e.jsx($,{}),e.jsx(G,{}),e.jsx("main",{className:"flex-1",children:i}),e.jsx(V,{})]})}export{H as B,Q as M};
