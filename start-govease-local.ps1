$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$frontend = Join-Path $root 'frontend'
$adminFrontend = Join-Path $root 'Admin_Frontend'
$citizenBackend = Join-Path $root 'Backend_Node.js'
$adminBackend = Join-Path $root 'Admin_Backend'
$pythonService = Join-Path $root 'Backend_Python'

Write-Host 'Starting GovEase local services...' -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$frontend'; npm install; npm run dev -- --host 0.0.0.0 --port 5173" -WorkingDirectory $root
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$adminFrontend'; npm install; npm run dev -- --host 0.0.0.0 --port 5174" -WorkingDirectory $root
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$citizenBackend'; npm install; npm run dev" -WorkingDirectory $root
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$adminBackend'; npm install; npm run dev" -WorkingDirectory $root
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$pythonService'; python -m venv venv; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt; python main.py" -WorkingDirectory $root

Write-Host ''
Write-Host 'Citizen Frontend: http://localhost:5173' -ForegroundColor Green
Write-Host 'Admin Frontend: http://localhost:5174' -ForegroundColor Green
Write-Host 'Citizen Backend: http://localhost:3000' -ForegroundColor Green
Write-Host 'Admin Backend: http://localhost:3001' -ForegroundColor Green
Write-Host 'Python AI Service: http://localhost:8000' -ForegroundColor Green
