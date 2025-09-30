# Starts the SSR server from .svelte-kit/output/server/index.js, waits for it to accept connections,
# runs scripts/smoke.mjs, then stops the server.
param(
    [int]$Port = 4173,
    [int]$TimeoutSeconds = 20
)

$cwd = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $cwd

$index = Join-Path $cwd '.svelte-kit\output\server\index.js'
if (-not (Test-Path $index)) {
    Write-Error "Server build not found at $index. Run 'npm run build' first."
    exit 2
}

# Start server
$env:PORT = $Port
$proc = Start-Process -FilePath 'node' -ArgumentList $index -WorkingDirectory $cwd -PassThru
Write-Output "Started server PID=$($proc.Id), waiting for port $Port..."

# Wait for port to be accepting connections
$deadline = (Get-Date).AddSeconds($TimeoutSeconds)
$bound = $false
while ((Get-Date) -lt $deadline) {
    try {
        $conn = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($conn) { $bound = $true; break }
    } catch {
        # older Windows may not have Get-NetTCPConnection; try netstat
        $out = & cmd /c "netstat -ano | findstr $Port"
        if ($out) { $bound = $true; break }
    }
    Start-Sleep -Milliseconds 300
}

if (-not $bound) {
    Write-Error "Server did not bind to port $Port within $TimeoutSeconds seconds. Check server logs."
    # Kill the process we started
    try { Stop-Process -Id $proc.Id -Force } catch {}
    exit 3
}

Write-Output "Port $Port is bound. Running smoke script..."

# Run smoke script
$smoke = Join-Path $cwd 'scripts\smoke.mjs'
if (-not (Test-Path $smoke)) { Write-Error "smoke.mjs not found"; Stop-Process -Id $proc.Id -Force; exit 4 }
node $smoke
$exitCode = $LASTEXITCODE

# Stop the server process
try { Stop-Process -Id $proc.Id -Force } catch {}
Write-Output "Server PID=$($proc.Id) stopped. smoke.mjs exit code: $exitCode"
exit $exitCode
