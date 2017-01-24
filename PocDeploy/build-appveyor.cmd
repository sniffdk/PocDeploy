nuget restore

# Full build of solution takes place
msbuild PocDeploy.sln /logger:"C:\Program Files\AppVeyor\BuildAgent\Appveyor.MSBuildLogger.dll"

node --version
npm --version
npm install bower -g
npm install gulp-cli -g
cd PocDeploy
npm install
bower install
gulp build --production

# JavaScript files created from TypeScript are turned into build artifacts by Gulp
gulp build --production

# Everything that has been built gets packaged
msbuild PocDeploy\PocDeploy.csproj /t:Package /p:PackageLocation=PocDeploy.zip