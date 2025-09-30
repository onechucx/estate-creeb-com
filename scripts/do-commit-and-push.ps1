param(
    [string]$Message = 'chore: pin svelte/@sveltejs/kit; add preview helper'
)

Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

git add package.json scripts/preview-smoke.ps1
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m $Message
    git push origin svelte
    Write-Output "Committed and pushed: $Message"
} else {
    Write-Output 'No staged changes to commit'
}
