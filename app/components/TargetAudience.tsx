import React from 'react';

interface TargetAudienceProps {
  title: string;
  audiences: {
    text: string;
    highlight: string;
  }[];
}

export default function TargetAudience({ title, audiences }: TargetAudienceProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-20">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {audiences.map((audience, index) => (
              <p key={index} className="text-gray-600 mb-3 last:mb-0">
                {audience.text.split(audience.highlight).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-semibold text-purple-600">
                        {audience.highlight}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 