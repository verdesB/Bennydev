import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import { ContentSection } from './types'

interface TableSection {
    headers: string[];
    rows: (string | boolean)[][];
}

export interface ContentSection {
  type: 'text' | 'media' | 'list' | 'table' | 'steps';
  content?: string | TableSection | MediaContent | Step[];
  className?: string;
  listType?: 'bullet' | 'number';
  listClassName?: string;
  items?: Array<{
    content: string;
    className?: string;
    icon?: React.ReactNode;
  }>;
} 

interface ContentComponentProps {
    sections: ContentSection[];
}

interface MediaContent {
  type: string;
  src: string;
  alt: string;
  style: {
    containerClassName?: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  };
}

interface Step {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ sections }) => {
    const renderSection = (section: ContentSection) => {
        switch (section.type) {
            case 'text':
                return (
                    <p className={section.className}>
                        {section.content as string}
                    </p>
                );
            case 'list':
                return (
                    <ul className={`${section.listType === 'number' ? 'list-decimal' : 'list-disc'} ${section.listClassName || ''}`}>
                        {section.items?.map((item, index) => (
                            <li key={index} className={item.className}>
                                {item.icon && (
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 overflow-hidden rotate-[-40deg]">
                                        {item.icon}
                                    </div>
                                )}
                                {item.content}
                            </li>
                        ))}
                    </ul>
                );
            case 'table':
                const tableContent = section.content as TableSection;
                return (
                    <div className={`w-full overflow-auto ${section.className} `}>
                        <Table className="border border-[#E7E7E7] rounded-lg">
                            <TableHeader>
                                <TableRow>
                                    {tableContent.headers.map((header, index) => (
                                        <TableHead key={index} className={index === 0 ? 'w-[200px]' : 'min-w-[150px]'}>
                                            {header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableContent.rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                                {typeof cell === 'boolean' ? (cell ? '✓' : '✗') : cell}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            case 'media':
                const mediaContent = section.content as MediaContent;
                if (mediaContent.type === 'image') {
                    return (
                        <div className={mediaContent.style.containerClassName}>
                            <Image
                                src={mediaContent.src}
                                alt={mediaContent.alt}
                                className={mediaContent.style.className}
                                width={500}
                                height={300}
                                style={{
                                    width: mediaContent.style.width,
                                    height: mediaContent.style.height,
                                    objectFit: mediaContent.style.objectFit,
                                }}
                            />
                        </div>
                    );
                }
                return null;
            case 'steps':
                const steps = section.content as Step[];
                return (
                    <div className="relative py-12 px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Ligne de connexion principale */}
                            <div className="absolute left-1/2 top-24 bottom-24 -translate-x-px w-0.5 border-l-2 border-dashed border-violet-300 hidden sm:block" />
                            
                            {steps.map((step, index) => (
                                <div key={index} 
                                     className={`relative flex mb-16 ${
                                         index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                     } flex-col items-center gap-8`}>
                                    
                                    {/* Card */}
                                    <div className={`relative z-10 p-6 rounded-xl shadow-lg ${step.className} w-full sm:w-[300px] bg-white`}>
                                        <div className="mb-4">
                                            {step.icon}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                        
                                        {/* Numéro de l'étape */}
                                        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Ligne horizontale de connexion */}
                                    <div className="hidden sm:block h-0.5 flex-1 relative">
                                        <div className="absolute top-0 w-full border-t-2 border-dashed border-violet-300"
                                             style={{
                                                 left: index % 2 === 0 ? '0' : 'auto',
                                                 right: index % 2 === 0 ? 'auto' : '0',
                                                 width: '50%'
                                             }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {sections.map((section, index) => (
                <div key={index}>{renderSection(section)}</div>
            ))}
        </div>
    );
};

export default ContentComponent; 