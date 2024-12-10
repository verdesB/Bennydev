'use client';

import { Quote, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useCallback } from 'react';

type Testimonial = {
    name: string;
    role: string;
    content: React.ReactNode;
};

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const scrollContainerRef = useRef<HTMLUListElement>(null);

    const scroll = useCallback((direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === 'left' ? -450 : 450;
        scrollContainerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="relative group min-h-[500px] py-4" role="region" aria-label="Témoignages clients">
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" aria-hidden="true" />
            
            <ul ref={scrollContainerRef}
                className="relative flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-14 px-4 h-full items-center py-16"
                role="list"
            >
                {testimonials.map((testimonial, index) => (
                    <li
                        key={`testimonial-${index}`}
                        className="flex-none w-[320px] md:w-[450px] lg:w-[600px] snap-center first:ml-16 last:mr-16"
                        role="listitem"
                    >
                        <article className="bg-white rounded-xl p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-300">
                            <Quote className="w-8 h-8 text-purple-100" aria-hidden="true" />

                            <div className="mb-6">
                                <blockquote className="text-gray-600">
                                    {testimonial.content}
                                </blockquote>
                            </div>

                            <footer className="pt-4 border-t border-gray-50">
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-purple-50" aria-hidden="true">
                                        <User className="text-purple-400 w-5 h-5" />
                                    </div>
                                    <div>
                                        <cite className="font-medium text-gray-900 text-sm not-italic">
                                            {testimonial.name}
                                        </cite>
                                        <p className="text-purple-500 text-xs mt-0.5">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </footer>
                        </article>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center gap-4 mt-8" role="group" aria-label="Contrôles du carrousel">
                <button
                    onClick={() => scroll('left')}
                    className="bg-white hover:bg-white rounded-full p-3 shadow-md transition-all duration-300 hover:scale-105"
                    aria-label="Témoignage précédent"
                >
                    <ChevronLeft className="w-5 h-5 text-purple-500" aria-hidden="true" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="bg-white hover:bg-white rounded-full p-3 shadow-md transition-all duration-300 hover:scale-105"
                    aria-label="Témoignage suivant"
                >
                    <ChevronRight className="w-5 h-5 text-purple-500" aria-hidden="true" />
                </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className="w-1.5 h-1.5 rounded-full bg-purple-100 transition-colors duration-300 hover:bg-purple-300"
                        aria-label={`Témoignage ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}