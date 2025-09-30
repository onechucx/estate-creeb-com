$ErrorActionPreference = 'Stop'
Write-Output "Stopping any running node processes..."
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { Try { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue } Catch { } }

Write-Output "Running npm run build..."
# Run build and capture output
npm run build 2>&1 | Tee-Object -FilePath build.log
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. See build.log"
    Exit 1
}

Write-Output "Preparing dist from .svelte-kit/output/client..."
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
New-Item -ItemType Directory dist | Out-Null
robocopy .svelte-kit\output\client dist /E | Out-Null

Write-Output "Starting vite preview on 127.0.0.1:4173..."
$proc = Start-Process -FilePath 'npx.cmd' -ArgumentList 'vite','preview','--port','4173','--host','127.0.0.1' -PassThru
Start-Sleep -Seconds 2

# Wait up to 15s for port to be listening
$max = 15; $i = 0; $listening = $false
while ($i -lt $max) {
    $ns = cmd.exe /c "netstat -ano | findstr :4173"
    if ($ns) { $listening = $true; break }
    Start-Sleep -Seconds 1
    $i++
}

Write-Output "Preview PID: $($proc.Id)"
Write-Output "Listening: $listening"
if ($listening) {
    Start-Process "http://127.0.0.1:4173"
    Write-Output "Opened browser to http://127.0.0.1:4173"
} else {
    Write-Error "Preview did not start listening on :4173 within timeout. See build.log and check preview process PID $($proc.Id)"
}

Exit 0
