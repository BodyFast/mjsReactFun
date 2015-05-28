build:
	- rm -r dist/
	mkdir dist
	jspm bundle-sfx lib/main -o dist/main.js
	./node_modules/.bin/uglifyjs dist/main.js -o dist/main.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert main.min.js -o dist/index.html