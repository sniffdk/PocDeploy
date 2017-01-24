ECHO Running build-appveyor.cmd now ...

nuget restore

# Full build of solution takes place
msbuild PocDeploy.sln /logger:"C:\Program Files\AppVeyor\BuildAgent\Appveyor.MSBuildLogger.dll"

ECHO Hello ? :(

CALL npm --version
CALL node --version

ECHO Plz

CALL npm install bower -g
CALL npm install gulp-cli -g

cd PocDeploy

ECHO Be nice :)

ECHO npm install
ECHO bower install

# JavaScript files created from TypeScript are turned into build artifacts by Gulp
ECHO gulp build --production

# Everything that has been built gets packaged
msbuild PocDeploy.csproj /t:Package /p:PackageLocation=PocDeploy.zip