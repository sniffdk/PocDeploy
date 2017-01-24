ECHO Running build-appveyor.cmd now ...

nuget restore

# Full build of solution takes place
msbuild PocDeploy.sln /logger:"C:\Program Files\AppVeyor\BuildAgent\Appveyor.MSBuildLogger.dll"

ECHO Hello ? :(

npm --version
node --version

ECHO Plz

npm install bower -g
npm install gulp-cli -g

cd PocDeploy

ECHO Be nice :)

npm install
bower install

gulp build --production

# JavaScript files created from TypeScript are turned into build artifacts by Gulp
gulp build --production

# Everything that has been built gets packaged
msbuild PocDeploy\PocDeploy.csproj /t:Package /p:PackageLocation=PocDeploy.zip