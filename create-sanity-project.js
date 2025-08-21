#!/usr/bin/env node

// This script will help you create and configure your Sanity project
// You need to run `npx sanity login` first to authenticate

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Creating Sanity project...');
console.log('Please follow these steps:\n');

console.log('1. Go to https://www.sanity.io/manage');
console.log('2. Click "Create new project"');
console.log('3. Name it "Regenmother CMS"');
console.log('4. Copy the project ID\n');

const projectId = process.argv[2];

if (!projectId) {
  console.log('Usage: node create-sanity-project.js <project-id>');
  console.log('Example: node create-sanity-project.js abc123xyz');
  process.exit(1);
}

// Update .env.local
const envPath = path.join(__dirname, 'sanity', '.env.local');
const envContent = `SANITY_STUDIO_PROJECT_ID=${projectId}
SANITY_STUDIO_DATASET=production`;

fs.writeFileSync(envPath, envContent);
console.log('✅ Updated .env.local with project ID');

// Update sanity.config.ts
const configPath = path.join(__dirname, 'sanity', 'sanity.config.ts');
let configContent = fs.readFileSync(configPath, 'utf8');
configContent = configContent.replace(
  "process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'",
  `'${projectId}'`
);
fs.writeFileSync(configPath, configContent);
console.log('✅ Updated sanity.config.ts');

// Update client config
const clientConfigPath = path.join(__dirname, 'sanity-client-config.js');
let clientConfig = fs.readFileSync(clientConfigPath, 'utf8');
clientConfig = clientConfig.replace(
  "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'",
  `'${projectId}'`
);
fs.writeFileSync(clientConfigPath, clientConfig);
console.log('✅ Updated client configuration');

console.log('\n🚀 Setup complete!');
console.log('\nNext steps:');
console.log('1. cd sanity');
console.log('2. npm run dev');
console.log('3. Open http://localhost:3333');
console.log('\nTo deploy your studio:');
console.log('npm run deploy');
console.log('\nYour team can access the studio at:');
console.log(`https://${projectId}.sanity.studio`);