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
    <section className="max-w-6xl mx-auto px-4 pt-20 sm:px-6 lg:px-0 relative z-20">
      <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl w-full border border-purple-100">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600 transform -rotate-3 hover:rotate-0 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
              {title}
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-purple-400 rounded-full"></span>
            </h2>
            
            <div className="space-y-4">
              {audiences.map((audience, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {audience.text.split(audience.highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="font-semibold text-purple-600 px-1 bg-purple-50 rounded">
                          {audience.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 