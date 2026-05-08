#!/usr/bin/env bash
# Exit on error
set -o errexit

# --- Frontend Build ---
echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# --- Backend Setup ---
echo "Setting up Backend..."
pip install -r backend/requirements.txt
