import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext', // 최신 브라우저를 대상으로 빌드하여 빠른 로딩 시간 확보
    minify: 'esbuild', // 기본적으로 esbuild를 사용하여 빠른 번들링 및 최소화
  },
});
