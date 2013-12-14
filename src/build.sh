output='../build/angular-knife.js'
outputMin='../build/angular-knife-min.js'

cat preWrapper.js > $output

for item in filters/* services/*
do
  echo $item
  cat $item >> $output
  echo '\n' >> $output
done

cat postWrapper.js >> $output

# uglify
uglifyjs -v $output > $outputMin

echo "completed"