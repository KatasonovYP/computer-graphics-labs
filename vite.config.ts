import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// https://vitejs.dev/config/
	return defineConfig({
		resolve: {},
		plugins: [react(), tsconfigPaths(), eslint()],
	});
};
