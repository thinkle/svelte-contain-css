#!/bin/bash

# Define the directory to search in
SEARCH_DIR="./src/"

# Find all occurrences of CSS variables (lines containing '--'), then extract and sort them uniquely
grep -rho --include=\*.css --include=\*.svelte --include=\*.scss "var(--[^)]*)" "$SEARCH_DIR" | awk -F'[(:)]' '{print $2}' | sort -u > css_variables.txt

echo "CSS Variables extracted to css_variables.txt"
