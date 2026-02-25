import{c,j as e,H as p,L as r,r as h,b as i}from"./app-hp7FicB6.js";import{M as m,B as o}from"./MainLayout-Krz-mYdC.js";/* empty css            */import"./createLucideIcon-By0rTRad.js";function j({starterKits:s}){const{auth:t}=c().props;return e.jsxs(m,{children:[e.jsx(p,{title:"Starter Kits"}),e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-16",children:[e.jsxs("div",{className:"mb-16 flex items-start justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"mb-4 text-4xl font-bold tracking-tight",children:"Getting Started"}),e.jsx("p",{className:"max-w-2xl text-lg text-slate-600",children:"A collection of clean, development-ready starter kits for modern full-stack web development."})]}),t.user&&e.jsxs(r,{href:"/saved-kits",className:`
                                inline-flex items-center gap-2
                                border border-gray-800
                                bg-white
                                text-gray-800
                                text-sm font-medium
                                px-4 py-2.5
                                rounded-lg
                                shadow-[2px_2px_0px] shadow-gray-800
                                transition-all duration-200
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-800
                            `,children:[e.jsx(o,{className:"h-4 w-4"}),"My Saved Kits"]})]}),e.jsx("h2",{className:"mb-8 text-2xl font-semibold",children:"Starter Kits"}),e.jsx("div",{className:"mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:s.data.map(a=>e.jsx(g,{kit:a,isLoggedIn:!!t.user},a.slug))})]})]})}function g({kit:s,isLoggedIn:t}){const[a,n]=h.useState(!1),d=l=>{if(l.preventDefault(),l.stopPropagation(),!t){i.visit("/login");return}n(!0),i.post(`/starter-kit/${s.slug}/save`,{},{preserveScroll:!0,onFinish:()=>n(!1)})},x={beginner:"bg-green-100 text-green-700",intermediate:"bg-yellow-100 text-yellow-700",advanced:"bg-red-100 text-red-700"};return e.jsxs("div",{className:`
                group relative flex flex-col gap-3
                rounded-xl
                border border-gray-800
                bg-white
                p-6
                shadow-[3px_3px_0px] shadow-gray-800
                transition-all duration-200
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-800
            `,children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(r,{href:`/starter-kit/${s.slug}`,className:"font-semibold text-gray-900 hover:underline",children:s.name}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:d,disabled:a,className:`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${s.is_saved?"text-gray-800":"text-gray-400 hover:text-gray-800 hover:bg-gray-100"}`,title:s.is_saved?"Unsave":"Save",children:e.jsx(o,{className:"h-4 w-4",fill:s.is_saved?"currentColor":"none"})}),e.jsx(r,{href:`/starter-kit/${s.slug}`,children:e.jsx("svg",{className:"w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]})]}),e.jsx(r,{href:`/starter-kit/${s.slug}`,children:e.jsx("p",{className:"text-sm text-slate-600 leading-relaxed",children:s.description})}),e.jsxs("div",{className:"flex items-center gap-2 mt-auto pt-2",children:[s.latest_version&&e.jsxs("span",{className:"text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600",children:["v",s.latest_version.version]}),s.difficulty&&e.jsx("span",{className:`text-xs font-medium px-2 py-0.5 rounded-full ${x[s.difficulty]}`,children:s.difficulty})]})]})}export{j as default};
