
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 77;
const FRAME_BASE_URL = '/supplements/Suppl_frame_';

export const SupplementScroll: React.FC<{ onShopNowClick?: () => void }> = ({ onShopNowClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        let loadedCount = 0;
        const tempImages: HTMLImageElement[] = [];

        const preloadImages = async () => {
            const promises = Array.from({ length: TOTAL_FRAMES }).map((_, i) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = `${FRAME_BASE_URL}${i}.jpg`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = resolve;
                    tempImages[i] = img;
                });
            });

            await Promise.all(promises);
            setImages(tempImages);
            setTimeout(() => setIsLoading(false), 500);
        };

        preloadImages();
    }, []);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const render = (index: number) => {
            const frame = Math.floor(index);
            const img = images[frame];
            if (!img) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            context.scale(window.devicePixelRatio, window.devicePixelRatio);
            render(frameIndex.get());
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        let animationFrameId: number;
        const update = () => {
            render(frameIndex.get());
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[600vh]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
                <NarrativeOverlay progress={smoothProgress} onShopNowClick={onShopNowClick} />
            </div>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        <div className="relative w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_white]"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>
                        <p className="mt-6 text-white font-heading tracking-[0.3em] text-[10px] uppercase font-medium">
                            Loading Experience {loadingProgress}%
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NarrativeOverlay: React.FC<{ progress: any; onShopNowClick?: () => void }> = ({ progress, onShopNowClick }) => {
    const text1Opacity = useTransform(progress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
    const text1Y = useTransform(progress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

    const text2Opacity = useTransform(progress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
    const text2X = useTransform(progress, [0.2, 0.25, 0.4, 0.45], [-30, 0, 0, -30]);

    const text3Opacity = useTransform(progress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
    const text3X = useTransform(progress, [0.45, 0.5, 0.65, 0.7], [30, 0, 0, 30]);

    const text4Opacity = useTransform(progress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 1]);
    const text4Y = useTransform(progress, [0.75, 0.8, 0.95, 1], [30, 0, 0, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <motion.div
                style={{ opacity: text1Opacity, y: text1Y }}
                className="absolute inset-0 flex items-center justify-center p-6"
            >
                <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-white text-center leading-tight drop-shadow-2xl">
                    WatchForward <br /> <span className="text-secondary">Supplements</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text2Opacity, x: text2X }}
                className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-xl p-6"
            >
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                    Collagen: <br />
                    <span className="text-secondary/80">Building block for any type of Conditioning</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text3Opacity, x: text3X }}
                className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 max-w-xl text-right p-6"
            >
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                    Vitamin C: <br />
                    <span className="text-secondary/80">Vital for Collagen Synthesis</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text4Opacity, y: text4Y }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-10 p-6"
            >
                <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-white text-center leading-tight">
                    We provide from the <br /> <span className="text-secondary">most trusted source</span>
                </h2>
                <motion.button
                    onClick={onShopNowClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-[#202D7D] rounded-full font-bold text-xl shadow-2xl pointer-events-auto transition-shadow hover:shadow-white/20"
                >
                    Shop Now
                </motion.button>
            </motion.div>
        </div>
    );
};
