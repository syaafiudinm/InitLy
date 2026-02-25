import{r as p,c as O,j as e,L as d,b as U}from"./app-CzwP0Vy-.js";import{c as q}from"./createLucideIcon-Coc-d5tt.js";const X=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]],H=q("bookmark",X);function Y(){const[x,o]=p.useState(!1),{auth:h}=O().props,u=()=>{window.confirm("Are you sure you want to logout?")&&U.post("/logout")};return e.jsx("header",{className:"sticky top-0 z-50 border-b border-slate-200 bg-gray-50",children:e.jsxs("nav",{className:"mx-auto max-w-6xl px-6",children:[e.jsxs("div",{className:"flex h-16 items-center justify-between",children:[e.jsx(d,{href:"/",className:"text-lg font-bold tracking-tight",children:"InitLy"}),e.jsxs("div",{className:"hidden items-center gap-3 md:flex",children:[e.jsx(d,{href:"/",className:`
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
                            `,children:"Starter Kits"}),h.user?e.jsxs(e.Fragment,{children:[e.jsxs(d,{href:"/saved-kits",className:`
                                        inline-flex items-center gap-1.5
                                        text-sm font-medium text-slate-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    `,children:[e.jsx(H,{className:"h-3.5 w-3.5"}),"Saved"]}),e.jsx("div",{className:"h-4 w-px bg-slate-300"}),e.jsxs("span",{className:"text-sm text-gray-700",children:[h.user.name," 👋"]}),e.jsx("button",{onClick:u,className:`
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
                                    `,children:"Register"})]})]}),e.jsx("button",{onClick:()=>o(!x),className:`
                            inline-flex items-center justify-center
                            rounded-md p-2
                            text-slate-600
                            border border-transparent
                            transition-all duration-200
                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            md:hidden
                        `,children:x?"✕":"☰"})]}),x&&e.jsx("div",{className:"pb-4 md:hidden",children:e.jsxs("div",{className:"flex flex-col gap-2 border-t border-slate-200 pt-4",children:[e.jsx(d,{href:"/",className:`
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                `,onClick:()=>o(!1),children:"Home"}),e.jsx(d,{href:"/starter-kit",className:`
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                `,onClick:()=>o(!1),children:"Starter Kits"}),h.user?e.jsxs(e.Fragment,{children:[e.jsxs(d,{href:"/saved-kits",className:`
                                            inline-flex items-center gap-1.5
                                            text-sm font-medium text-slate-600
                                            px-3 py-2 rounded-md
                                            border border-transparent
                                            transition-all duration-200
                                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        `,onClick:()=>o(!1),children:[e.jsx(H,{className:"h-3.5 w-3.5"}),"Saved Kits"]}),e.jsx("div",{className:"border-t border-slate-200 pt-3 mt-1",children:e.jsxs("div",{className:"flex items-center justify-between px-3",children:[e.jsxs("span",{className:"text-sm text-gray-700",children:[h.user.name," 👋"]}),e.jsx("button",{onClick:()=>{o(!1),u()},className:`
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
                                        `,onClick:()=>o(!1),children:"Login"}),e.jsx(d,{href:"/register",className:`
                                            text-sm font-medium text-center
                                            text-white bg-gray-800
                                            px-4 py-2 rounded-md
                                            border border-gray-800
                                            shadow-[2px_2px_0px] shadow-gray-500
                                            transition-all duration-200
                                            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                            active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-500
                                        `,onClick:()=>o(!1),children:"Register"})]})]})})]})})}function G(){return e.jsx("footer",{className:"border-t border-slate-200 bg-gray-50",children:e.jsx("div",{className:"mx-auto max-w-6xl px-6",children:e.jsx("div",{className:"py-6 text-center",children:e.jsx("p",{className:"text-sm text-slate-500",children:"Copyright © 2026 InitLy"})})})})}function V(){const x=p.useRef(null),o=p.useRef({x:-9999,y:-9999}),h=p.useRef(0),u=p.useRef([]),M=p.useRef(0);return p.useEffect(()=>{const l=x.current;if(!l)return;const s=l.getContext("2d");if(!s)return;const R=4,f=220,b=()=>{l.width=window.innerWidth,l.height=window.innerHeight,I()},I=()=>{const n=l.width,i=l.height;u.current=Array.from({length:R},(y,a)=>{const t=Array.from({length:5},(v,c)=>({x:n/4*c,y:i*.15+i*.7*a/(R-1)})),m=Array.from({length:4},(v,c)=>({cx1:t[c].x+n/4/3,cy1:t[c].y+(Math.random()-.5)*i*.25,cx2:t[c+1].x-n/4/3,cy2:t[c+1].y+(Math.random()-.5)*i*.25}));return{points:t,controlPoints:m,opacity:.06+Math.random()*.06,speed:3e-4+Math.random()*2e-4,offset:Math.random()*Math.PI*2,width:.8+Math.random()*.8}})};b(),window.addEventListener("resize",b);const E=n=>{o.current={x:n.clientX,y:n.clientY}},P=()=>{o.current={x:-9999,y:-9999}};window.addEventListener("mousemove",E),window.addEventListener("mouseleave",P);const S=(n,i,y,a,r)=>{const t=1-n;return t*t*t*i+3*t*t*n*y+3*t*n*n*a+n*n*n*r},z=()=>{const n=l.width,i=l.height;s.clearRect(0,0,n,i),M.current+=1;const y=M.current,a=o.current;for(const r of u.current)s.beginPath(),r.points.forEach((t,m)=>{if(m===0){s.moveTo(t.x,t.y);return}const v=r.controlPoints[m-1],c=r.points[m-1],T=Math.sin(y*r.speed*60+r.offset+m*.8)*i*.04,W=Math.cos(y*r.speed*60+r.offset+m*1.2)*i*.04;let j=v.cx1,N=v.cy1+T,_=v.cx2,k=v.cy2+W;if(a.x!==-9999){const B=S(.5,c.x,j,_,t.x),K=S(.5,c.y,N,k,t.y),C=B-a.x,L=K-a.y,g=Math.sqrt(C*C+L*L);if(g<f){const w=Math.pow(1-g/f,2)*80,A=C/g,F=L/g;N+=F*w,k+=F*w,j+=A*w*.3,_+=A*w*.3}}s.bezierCurveTo(j,N,_,k,t.x,t.y)}),s.strokeStyle=`rgba(71, 71, 71, ${r.opacity})`,s.lineWidth=r.width,s.stroke();if(a.x!==-9999){const r=s.createRadialGradient(a.x,a.y,0,a.x,a.y,f*.6);r.addColorStop(0,"rgba(180, 180, 180, 0.04)"),r.addColorStop(1,"rgba(180, 180, 180, 0)"),s.fillStyle=r,s.beginPath(),s.arc(a.x,a.y,f*.6,0,Math.PI*2),s.fill()}h.current=requestAnimationFrame(z)};return z(),()=>{cancelAnimationFrame(h.current),window.removeEventListener("resize",b),window.removeEventListener("mousemove",E),window.removeEventListener("mouseleave",P)}},[]),e.jsx("canvas",{ref:x,className:"fixed inset-0 -z-10 pointer-events-none"})}function J({children:x}){return e.jsxs("div",{className:"min-h-screen flex flex-col",children:[e.jsx(V,{}),e.jsx(Y,{}),e.jsx("main",{className:"flex-1",children:x}),e.jsx(G,{})]})}export{H as B,J as M};
