import{j as e,H as d,L as r,r as x,b as c}from"./app-Bc5zk5HS.js";import{M as m,B as i}from"./MainLayout-CLDiFmOU.js";import{A as h}from"./arrow-left-BTd6f5hT.js";import{c as p}from"./createLucideIcon-BynEmhEK.js";/* empty css            */const g=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],f=p("trash-2",g);function _({savedKits:t}){return e.jsxs(m,{children:[e.jsx(d,{title:"My Saved Kits"}),e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-16",children:[e.jsxs("div",{className:"flex items-start justify-between mb-16",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(i,{className:"h-7 w-7 text-gray-800"}),e.jsx("h1",{className:"text-4xl font-bold tracking-tight",children:"My Saved Kits"})]}),e.jsx("p",{className:"max-w-2xl text-lg text-slate-600",children:"Your collection of saved starter kits for quick access."})]}),e.jsxs(r,{href:"/starter-kit",className:"inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors",children:[e.jsx(h,{className:"h-4 w-4"}),"Browse Kits"]})]}),t.length===0?e.jsx(u,{}):e.jsx("div",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3",children:t.map(s=>e.jsx(y,{kit:s},s.id))})]})]})}function u(){return e.jsxs("div",{className:"flex flex-col items-center justify-center py-24 text-center",children:[e.jsx("div",{className:"mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300",children:e.jsx(i,{className:"h-8 w-8 text-gray-400"})}),e.jsx("h3",{className:"mb-2 text-lg font-semibold text-gray-800",children:"No saved kits yet"}),e.jsx("p",{className:"mb-8 max-w-sm text-sm text-gray-500",children:"Browse our starter kits and save the ones you like for quick access later."}),e.jsxs(r,{href:"/starter-kit",className:`
                    inline-flex items-center justify-center gap-2
                    border border-gray-800
                    bg-gray-800
                    text-white
                    font-medium
                    px-6 py-3
                    rounded-lg
                    shadow-[3px_3px_0px] shadow-gray-500
                    transition-all duration-200
                    hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                    active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-500
                `,children:[e.jsx("span",{children:"🚀"}),"Explore Starter Kits"]})]})}function y({kit:t}){const[s,a]=x.useState(!1),l=n=>{n.preventDefault(),n.stopPropagation(),a(!0),c.post(`/starter-kit/${t.slug}/save`,{},{preserveScroll:!0,onFinish:()=>a(!1)})},o={beginner:"bg-green-100 text-green-700",intermediate:"bg-yellow-100 text-yellow-700",advanced:"bg-red-100 text-red-700"};return e.jsxs("div",{className:`
                group relative flex flex-col gap-3
                rounded-xl
                border border-gray-800
                bg-white
                p-6
                shadow-[3px_3px_0px] shadow-gray-800
                transition-all duration-200
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
            `,children:[e.jsx("button",{onClick:l,disabled:s,className:"absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50",title:"Remove from saved",children:e.jsx(f,{className:"h-4 w-4"})}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:t.name}),t.difficulty&&e.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full font-medium ${o[t.difficulty]}`,children:t.difficulty})]}),e.jsx("p",{className:"text-sm text-slate-600 leading-relaxed flex-1",children:t.short_description||t.description}),t.version&&e.jsx("div",{className:"text-xs text-gray-400",children:t.version.number}),e.jsx(r,{href:`/starter-kit/${t.slug}`,className:`
                    mt-2 inline-flex items-center justify-center
                    border border-gray-800
                    bg-gray-800
                    text-white
                    text-sm font-medium
                    px-4 py-2
                    rounded-lg
                    transition-colors
                    hover:bg-gray-900
                `,children:"View Details"})]})}export{_ as default};
