"use client";

import { useEffect, useRef } from "react";

interface CurvedPath {
    points: { x: number; y: number }[];
    controlPoints: { cx1: number; cy1: number; cx2: number; cy2: number }[];
    opacity: number;
    speed: number;
    offset: number;
    width: number;
}

export default function CurvedPathBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animRef = useRef<number>(0);
    const pathsRef = useRef<CurvedPath[]>([]);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const PATH_COUNT = 4;
        const MOUSE_INFLUENCE = 220;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPaths();
        };

        const initPaths = () => {
            const W = canvas.width;
            const H = canvas.height;

            pathsRef.current = Array.from({ length: PATH_COUNT }, (_, i) => {
                const segCount = 4;
                const points = Array.from({ length: segCount + 1 }, (_, j) => ({
                    x: (W / segCount) * j,
                    y: H * 0.15 + (H * 0.7 * i) / (PATH_COUNT - 1),
                }));

                const controlPoints = Array.from(
                    { length: segCount },
                    (_, j) => ({
                        cx1: points[j].x + W / segCount / 3,
                        cy1: points[j].y + (Math.random() - 0.5) * H * 0.25,
                        cx2: points[j + 1].x - W / segCount / 3,
                        cy2: points[j + 1].y + (Math.random() - 0.5) * H * 0.25,
                    }),
                );

                return {
                    points,
                    controlPoints,
                    opacity: 0.06 + Math.random() * 0.06,
                    speed: 0.0003 + Math.random() * 0.0002,
                    offset: Math.random() * Math.PI * 2,
                    width: 0.8 + Math.random() * 0.8,
                };
            });
        };

        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        // Helper: interpolate a point on a cubic bezier
        const bezierPoint = (
            t: number,
            p0: number,
            cp1: number,
            cp2: number,
            p1: number,
        ) => {
            const u = 1 - t;
            return (
                u * u * u * p0 +
                3 * u * u * t * cp1 +
                3 * u * t * t * cp2 +
                t * t * t * p1
            );
        };

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            timeRef.current += 1;
            const t = timeRef.current;
            const mouse = mouseRef.current;

            for (const path of pathsRef.current) {
                ctx.beginPath();

                // Build path with mouse-influenced control points
                path.points.forEach((pt, i) => {
                    if (i === 0) {
                        ctx.moveTo(pt.x, pt.y);
                        return;
                    }

                    const cp = path.controlPoints[i - 1];
                    const prevPt = path.points[i - 1];

                    // Animate control points with gentle sine wave
                    const wave1 =
                        Math.sin(t * path.speed * 60 + path.offset + i * 0.8) *
                        H *
                        0.04;
                    const wave2 =
                        Math.cos(t * path.speed * 60 + path.offset + i * 1.2) *
                        H *
                        0.04;

                    let cx1 = cp.cx1;
                    let cy1 = cp.cy1 + wave1;
                    let cx2 = cp.cx2;
                    let cy2 = cp.cy2 + wave2;

                    // Mouse influence: push control points away from cursor
                    if (mouse.x !== -9999) {
                        // Check influence on segment midpoint
                        const midX = bezierPoint(0.5, prevPt.x, cx1, cx2, pt.x);
                        const midY = bezierPoint(0.5, prevPt.y, cy1, cy2, pt.y);

                        const dx = midX - mouse.x;
                        const dy = midY - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < MOUSE_INFLUENCE) {
                            const force =
                                Math.pow(1 - dist / MOUSE_INFLUENCE, 2) * 80;
                            const nx = dx / dist;
                            const ny = dy / dist;
                            cy1 += ny * force;
                            cy2 += ny * force;
                            cx1 += nx * force * 0.3;
                            cx2 += nx * force * 0.3;
                        }
                    }

                    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, pt.x, pt.y);
                });

                ctx.strokeStyle = `rgba(71, 71, 71, ${path.opacity})`;
                ctx.lineWidth = path.width;
                ctx.stroke();
            }

            // Subtle cursor glow
            if (mouse.x !== -9999) {
                const grad = ctx.createRadialGradient(
                    mouse.x,
                    mouse.y,
                    0,
                    mouse.x,
                    mouse.y,
                    MOUSE_INFLUENCE * 0.6,
                );
                grad.addColorStop(0, "rgba(180, 180, 180, 0.04)");
                grad.addColorStop(1, "rgba(180, 180, 180, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(
                    mouse.x,
                    mouse.y,
                    MOUSE_INFLUENCE * 0.6,
                    0,
                    Math.PI * 2,
                );
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    );
}
