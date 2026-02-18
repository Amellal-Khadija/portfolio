import React, { useEffect, useRef } from 'react';

const Background = ({ theme }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Theme-responsive particle colors
        const latteColors = ['#8839ef', '#1e66f5', '#ea76cb', '#179299', '#fe640b'];
        const mochaColors = ['#cba6f7', '#89b4fa', '#f5c2e7', '#94e2d5', '#fab387'];
        const draculaColors = ['#bd93f9', '#8be9fd', '#ff79c6', '#50fa7b', '#ffb86c'];

        const colors = theme === 'catppuccin-latte' ? latteColors :
            theme === 'catppuccin-mocha' ? mochaColors : draculaColors;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createParticles = () => {
            particlesRef.current = [];
            const count = Math.min(Math.floor(window.innerWidth / 15), 100);
            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: theme === 'catppuccin-latte' ? Math.random() * 0.2 + 0.1 : Math.random() * 0.4 + 0.1,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        };

        createParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.012;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const pulseSize = p.size * (1 + Math.sin(p.pulse) * 0.6);

                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Subtle glow (less intense in light mode)
                ctx.shadowBlur = theme === 'catppuccin-latte' ? 5 : 10;
                ctx.shadowColor = p.color;
            });

            requestAnimationFrame(animate);
        };

        let animationFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrame);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: theme === 'catppuccin-latte' ? 0.3 : 0.5 }}
        />
    );
};

export default Background;
