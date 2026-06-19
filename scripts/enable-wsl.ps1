$ErrorActionPreference = "Stop"

$logPath = Join-Path $PSScriptRoot "enable-wsl.log"

& dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart |
  Tee-Object -FilePath $logPath
$wslExitCode = $LASTEXITCODE

& dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart |
  Tee-Object -FilePath $logPath -Append
$vmExitCode = $LASTEXITCODE

if (($wslExitCode -in 0, 3010) -and ($vmExitCode -in 0, 3010)) {
  exit 0
}

exit 1
