echo "Installing dependencies..."
npm install

export NODE_OPTIONS="--max-old-space-size=8192"

echo "Starting build process..."
npm run build
