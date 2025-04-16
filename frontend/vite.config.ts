import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import proxyOptions from './proxyOptions';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react()],
	server: {
		port: 8080,
		host: '0.0.0.0',
		proxy: proxyOptions
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: '../hazlernode/public/frontend',
		emptyOutDir: true,
		target: 'es2015',
	},
});
