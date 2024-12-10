interface HighlightProps {
    children: React.ReactNode;
    color?: 'purple' | 'pink' | 'yellow';
}

export default function Highlight({ children, color = 'yellow' }: HighlightProps) {
    const colorClasses = {
        purple: 'bg-purple-100/50 text-purple-900',
        pink: 'bg-pink-100/50 text-pink-900',
        yellow: 'bg-yellow-100/50 text-yellow-900'
    };

    return (
        <span className={`px-1 py-0.5 rounded-md inline-block ${colorClasses[color]}`}>
            {children}
        </span>
    );
} 