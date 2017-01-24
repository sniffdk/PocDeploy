echo Running build-appveyor.cmd now ...

nuget restore

echo Full build of solution takes place
msbuild PocDeploy.sln /logger:"C:\Program Files\AppVeyor\BuildAgent\Appveyor.MSBuildLogger.dll"

echo Hello ? :(

call npm --version
call node --version

echo Plz

call npm install bower -g
call npm install gulp-cli -g

cd PocDeploy

echo Be nice :)

call npm install
call bower install

echo JavaScript files created from TypeScript are turned into build artifacts by Gulp
call gulp build --production

echo Everything that has been built gets packaged
msbuild PocDeploy.csproj /t:Package /p:PackageLocation=PocDeploy.zip