find content -name "*.md" -exec sh -c 'marked --gfm --tables {} -o views/$(basename -s .md {}).ejs' \;
