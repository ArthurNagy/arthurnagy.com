export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 w-48 rounded-full bg-surface-container mb-8" />
      <div className="h-8 w-64 bg-surface-container mb-4" />
      <div className="h-4 w-48 bg-surface-container" />
    </div>
  )
} 