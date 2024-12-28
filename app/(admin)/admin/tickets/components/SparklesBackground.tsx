import { SparklesCore } from '@/app/components/ui/sparkles'

type SparklesBackgroundProps = {
  mounted: boolean
}

export const SparklesBackground = ({ mounted }: SparklesBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {mounted && (
        <SparklesCore 
          className="w-full h-full"
          background="transparent"
          particleColor="#8b5cf6"
          particleDensity={100}
          speed={0.5}
          minSize={0.6}
          maxSize={1.4}
        />
      )}
    </div>
  )
} 