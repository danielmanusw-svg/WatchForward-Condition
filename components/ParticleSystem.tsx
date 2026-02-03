import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    colorIndex: number; // Store index to swap colors on theme change
    alpha: number;
    type: 'repel' | 'attract';
    transitionProgress: number;
    driftFactor: number;
    eatenCount: number;
    repelTimer: number; // Timestamp until which it stays repulsive
    isPermanentRepel: boolean;
    isEligible: boolean; // Only 50% can ever be attractors
    mass: number; // For inertia simulation
}

export const ParticleSystem: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
        speed: 0,
        nextCycleTime: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const getColors = () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                return ['hsla(0, 0%, 100%, 1)', 'hsla(180, 100%, 80%, 1)']; // White & Light Aqua
            } else {
                const style = getComputedStyle(document.documentElement);
                const primary = `hsla(${style.getPropertyValue('--primary').trim().replace(/ /g, ', ')}, 1)`;
                const secondary = `hsla(${style.getPropertyValue('--secondary').trim().replace(/ /g, ', ')}, 1)`;
                return [primary, secondary]; // Dark Blue & Light Blue
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push(createBaseParticle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    'repel'
                ));
            }
        };

        const createBaseParticle = (x: number, y: number, type: 'repel' | 'attract'): Particle => {
            const driftFactor = Math.random() < 0.3 ? 0.005 : (Math.random() * 0.4);
            const mass = 0.6 + Math.random() * 1.6; // Heavier particles have more inertia
            return {
                x,
                y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: 2 + mass, // Visual weight linked to physics mass
                colorIndex: Math.random() > 0.5 ? 0 : 1,
                alpha: 0.8,
                type,
                transitionProgress: 1,
                driftFactor,
                eatenCount: 0,
                repelTimer: 0,
                isPermanentRepel: Math.random() < 0.1,
                isEligible: Math.random() < 0.5,
                mass
            };
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const colors = getColors();
            const now = Date.now();

            const dxM = mouseRef.current.x - mouseRef.current.lastX;
            const dyM = mouseRef.current.y - mouseRef.current.lastY;
            mouseRef.current.speed = Math.sqrt(dxM * dxM + dyM * dyM);

            // Every 6 seconds, trigger a new wave of 8 eligible attractors
            if (now > mouseRef.current.nextCycleTime) {
                const eligibleParticles = particles.filter(p => p.type === 'repel' && p.isEligible);
                const shuffled = eligibleParticles.sort(() => 0.5 - Math.random());
                const toAttract = shuffled.slice(0, 8);
                toAttract.forEach(p => {
                    p.type = 'attract';
                });
                mouseRef.current.nextCycleTime = now + 5000;
            }

            particles = particles.filter(p => {
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (p.type === 'repel') {
                    const pushRadius = 150;
                    const hardRadius = 20;
                    if (dist < pushRadius) {
                        const angle = Math.atan2(dy, dx);
                        if (dist < hardRadius) {
                            const offset = (hardRadius - dist) / p.mass;
                            p.x += Math.cos(angle) * offset;
                            p.y += Math.sin(angle) * offset;
                        }
                        const force = ((1 - dist / pushRadius) * 1.5) / p.mass;
                        p.vx += Math.cos(angle) * force;
                        p.vy += Math.sin(angle) * force;
                    }
                } else if (p.type === 'attract') {
                    const angle = Math.atan2(dy, dx);
                    // Force inversely proportional to mass for inertia feel
                    const force = 1.3 / p.mass;
                    p.vx -= Math.cos(angle) * force;
                    p.vy -= Math.sin(angle) * force;

                    // "Eaten and Spit Out" Logic
                    if (dist < 10) {
                        p.type = 'repel';
                        p.x = mouseRef.current.x;
                        p.y = mouseRef.current.y;
                        const spitAngle = Math.random() * Math.PI * 2;
                        // Massive variety in speed based on randomness and mass
                        const spitForce = (1 + Math.pow(Math.random(), 1.6) * 35) / Math.sqrt(p.mass);
                        p.vx = Math.cos(spitAngle) * spitForce;
                        p.vy = Math.sin(spitAngle) * spitForce;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;

                p.vx += (Math.random() - 0.5) * p.driftFactor;
                p.vy += (Math.random() - 0.5) * p.driftFactor;

                const margin = 60;
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = colors[p.colorIndex];
                ctx.globalAlpha = p.alpha;

                // Optimized Particle Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = colors[p.colorIndex];

                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0; // Reset

                return true;
            });

            // Advanced Networking Logic
            const connectionDist = 250;
            const connectionDistSq = connectionDist * connectionDist;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    // Anti-Clustering logic
                    if (distSq < 625) {
                        const dist = Math.sqrt(distSq) || 1;
                        const force = (25 - dist) * 0.04;
                        const angle = Math.atan2(dy, dx);
                        p1.vx += (Math.cos(angle) * force) / p1.mass;
                        p1.vy += (Math.sin(angle) * force) / p1.mass;
                        p2.vx -= (Math.cos(angle) * force) / p2.mass;
                        p2.vy -= (Math.sin(angle) * force) / p2.mass;
                    }

                    if (distSq < connectionDistSq && p1.type === 'repel' && p2.type === 'repel') {
                        const dist = Math.sqrt(distSq);
                        const pullFactor = (1 - dist / connectionDist);

                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);

                        const thickness = pullFactor * 2.5;
                        ctx.lineWidth = thickness;
                        const connectionColor = colors[p1.colorIndex];

                        // Performance Boost: Only apply shadowBlur for close connections
                        if (pullFactor > 0.4) {
                            ctx.shadowBlur = pullFactor * 15;
                            ctx.shadowColor = connectionColor;
                        }

                        ctx.strokeStyle = connectionColor.replace(', 1)', `, ${pullFactor * 0.35})`);
                        ctx.stroke();

                        ctx.shadowBlur = 0; // Reset
                    }
                }
            }

            mouseRef.current.lastX = mouseRef.current.x;
            mouseRef.current.lastY = mouseRef.current.y;
            animationFrameId = requestAnimationFrame(update);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        initParticles(); // Initialize particles after canvas resize
        update();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ filter: 'blur(1px)' }}
        />
    );
};
