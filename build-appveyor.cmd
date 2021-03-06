echo Running build-appveyor.cmd now ...

echo nuget
nuget restore

echo build
msbuild %APPVEYOR_PROJECT_NAME%.sln /logger:"C:\Program Files\AppVeyor\BuildAgent\Appveyor.MSBuildLogger.dll"

echo npm installs - global

call node --version
call npm --version
call npm install bower -g
call npm install gulp-cli -g

echo enter project
cd %APPVEYOR_PROJECT_NAME%.Web 

echo npm installs - local
call npm install
call bower install

echo gulp
call gulp build --production

echo package
msbuild %APPVEYOR_PROJECT_NAME%.Web.csproj /t:Package /p:PackageLocation=%APPVEYOR_PROJECT_NAME%.Web.zip /p:AutoParameterizationWebConfigConnectionStrings=false