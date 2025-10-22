'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function WordmarkFooter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    return (
        <section className="w-full px-6">
            <div
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full mx-auto overflow-hidden md:px-12 lg:px-16 pt-24 md:pt-32"
                style={{
                    // @ts-expect-error - CSS custom properties are not in CSSProperties type
                    '--mouse-x': `${mousePosition.x}px`,
                    '--mouse-y': `${mousePosition.y}px`,
                }}
            >
                {/* Background */}
                <div className="absolute inset-0 bg-background" />

                {/* Wordmark - revealed by spotlight */}
                <div className="relative w-full aspect-[1150/344] p-8 md:p-12 lg:p-16">
                    <div
                        className="absolute inset-0 p-8 md:p-12 lg:p-16"
                        style={{
                            maskImage: isHovered
                                ? `radial-gradient(1500px circle at var(--mouse-x) var(--mouse-y), black, transparent 40%)`
                                : 'none',
                            WebkitMaskImage: isHovered
                                ? `radial-gradient(1500px circle at var(--mouse-x) var(--mouse-y), black, transparent 40%)`
                                : 'none',
                            transition: 'mask-image 0.3s, -webkit-mask-image 0.3s',
                        }}
                    >
                        <div className="relative w-full h-full" style={{ isolation: 'isolate' }}>
                            {/* Base wordmark */}
                            <Image
                                src="/wordmark.svg"
                                alt="Kortix"
                                fill
                                className="object-contain dark:invert"
                                priority
                                style={{ mixBlendMode: 'normal' }}
                            />
                            {/* Grain texture overlay - clipped to wordmark shape */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: 'url(/grain-texture.png)',
                                    backgroundSize: '100px 100px',
                                    backgroundRepeat: 'repeat',
                                    mixBlendMode: 'multiply',
                                    opacity: 0.6,
                                    maskImage: 'url(/wordmark.svg)',
                                    WebkitMaskImage: 'url(/wordmark.svg)',
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskPosition: 'center',
                                }}
                            />
                        </div>
                    </div>

                    {/* Hidden wordmark for layout (maintains aspect ratio) */}
                    <div className="relative w-full h-full opacity-0">
                        <Image
                            src="/wordmark.svg"
                            alt="Kortix"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
