import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			// {
			//   protocol: "https",
			//   hostname: "images.unsplash.com",
			//   port: "",
			//   pathname: "/**"
			// },
			{
				protocol: 'https',
				hostname: '*',
				pathname: '/**',
			},
		],
	},
	experimental: {
		ppr: 'incremental',
		after: true,
		// serverActions: {
		// 	allowedOrigins: [
		// 		'http://localhost:3000',
		// 		'https://localhost:3000',
		// 		'my-proxy.com',
		// 		'*.my-proxy.com',
		// 	],
		// },
	},
	devIndicators: {
		appIsrStatus: true,
		buildActivity: true,
		buildActivityPosition: 'bottom-right',
	},
};

export default nextConfig;
