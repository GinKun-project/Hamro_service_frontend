# Git commit and push script for frontend
param(
    [string]$message = "Update frontend files"
)

git add .
git commit -m $message
git push origin main

Write-Host "Changes committed and pushed successfully!" -ForegroundColor Green

