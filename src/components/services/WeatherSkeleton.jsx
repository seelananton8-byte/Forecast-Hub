import Skeleton from "react-loading-skeleton"

function WeatherSkeleton() {
  return (
    <div className="weather-skeleton">
      <Skeleton circle height={80} width={80} />
      <Skeleton height={40} width={120} />
      <Skeleton height={20} width={160} />
      <Skeleton height={18} width={200} />
      <Skeleton height={18} width={200} />
    </div>
  )
}

export default WeatherSkeleton
