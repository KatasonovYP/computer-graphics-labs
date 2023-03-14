import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import eslint from 'vite-plugin-eslint';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// https://vitejs.dev/config/
	return defineConfig({
		resolve: {
			alias: {
				'@app': path.resolve(__dirname, './src/app'),
				'@processes': path.resolve(__dirname, './src/processes'),
				'@pages': path.resolve(__dirname, './src/pages'),
				'@widgets': path.resolve(__dirname, './src/widgets'),
				'@features': path.resolve(__dirname, './src/features'),
				'@entities': path.resolve(__dirname, './src/entities'),
				'@shared': path.resolve(__dirname, './src/shared'),
			},
		},
		plugins: [react(), eslint()],
	});
};
