#!/usr/bin/env bash
set -e

# Change this to a directory outside your project
VENV_DIR="$HOME/.venvs/llm-service"

if [ -d "$VENV_DIR" ]; then
  echo "Virtual environment already exists at $VENV_DIR"
else
  echo "Creating virtual environment..."
  python3 -m venv $VENV_DIR
fi

echo "Activating virtual environment..."
source "$VENV_DIR/bin/activate"

echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies from requirements.txt
if [ -f "requirements.txt" ]; then
  echo "Installing dependencies from requirements.txt..."
  pip install -r requirements.txt
else
  echo "No requirements.txt found. Skipping dependency installation."
fi

echo "Virtual environment ready."