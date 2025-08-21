import esbuild from 'esbuild';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildBundle() {
  try {
    await esbuild.build({
      entryPoints: [join(__dirname, 'sanity-structured-integration.js')],
      bundle: true,
      outfile: join(__dirname, 'website', 'sanity-bundle.js'),
      format: 'iife',
      globalName: 'SanityIntegration',
      platform: 'browser',
      target: ['es2020'],
      minify: true,
      sourcemap: true,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });
    
    console.log('✅ Sanity bundle built successfully!');
  } catch (error) {
    console.error('Error building bundle:', error);
    process.exit(1);
  }
}

buildBundle();