import ContentLoader from 'react-content-loader';

type SkeletonLoaderProps = {
	count?: number;
	width?: number;
	height?: number;
};

const SkeletonLoader = ({ count = 1, width = 400, height = 160 }: SkeletonLoaderProps) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<ContentLoader
					key={index}
					speed={2}
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="0" y="0" rx="5" ry="5" width="100%" height={height} />
				</ContentLoader>
			))}
		</>
	);
};

export default SkeletonLoader;
