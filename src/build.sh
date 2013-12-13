# build full version
r.js -o build_config.js name=ngKnife out=../build/angular-knife.js optimize=none
# build minified version
r.js -o build_config.js name=ngKnife out=../build/angular-knife-min.js