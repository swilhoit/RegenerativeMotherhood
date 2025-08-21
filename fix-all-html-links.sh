#!/bin/bash

echo "Fixing all .html links in the project..."

# Fix links in root directory HTML files
for file in *.html; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Replace specific page links
        sed -i '' 's/href="index\.html"/href="\/"/g' "$file"
        sed -i '' 's/href="work-with-me\.html"/href="\/work-with-me"/g' "$file"
        sed -i '' 's/href="3-call-sleep-support\.html"/href="\/3-call-sleep-support"/g' "$file"
        sed -i '' 's/href="comprehensive-sleep-support\.html"/href="\/comprehensive-sleep-support"/g' "$file"
        sed -i '' 's/href="sleep-guidance-call\.html"/href="\/sleep-guidance-call"/g' "$file"
        
        # Fix any remaining .html links (for any we might have missed)
        sed -i '' 's/href="\([^":/]*\)\.html"/href="\/\1"/g' "$file"
    fi
done

# Fix links in website directory HTML files
cd website
for file in *.html; do
    if [ -f "$file" ]; then
        echo "Updating website/$file..."
        
        # Replace specific page links - note these don't need leading slash in website folder
        sed -i '' 's/href="index\.html"/href="\/"/g' "$file"
        sed -i '' 's/href="work-with-me\.html"/href="\/work-with-me"/g' "$file"
        sed -i '' 's/href="3-call-sleep-support\.html"/href="\/3-call-sleep-support"/g' "$file"
        sed -i '' 's/href="comprehensive-sleep-support\.html"/href="\/comprehensive-sleep-support"/g' "$file"
        sed -i '' 's/href="sleep-guidance-call\.html"/href="\/sleep-guidance-call"/g' "$file"
        
        # Fix any remaining .html links
        sed -i '' 's/href="\([^":/]*\)\.html"/href="\/\1"/g' "$file"
    fi
done

echo "All .html links have been fixed!"