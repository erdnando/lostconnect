# Script de Testing para API de Posts
# LostConnect - Sprint 2.1

Write-Host "`n=== INICIANDO TESTS DE API - SPRINT 2.1 ===`n" -ForegroundColor Cyan

# Variables
$baseUrl = "http://localhost:3000"
$testsPassed = 0
$testsFailed = 0

# Función para hacer requests
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Url,
        [hashtable]$Headers = @{},
        [string]$Body = $null,
        [int]$ExpectedStatus = 200
    )
    
    Write-Host "Test: $Name" -ForegroundColor Yellow
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            Headers = $Headers
            UseBasicParsing = $true
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop
        
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Host "   PASS - Status: $($response.StatusCode)" -ForegroundColor Green
            $script:testsPassed++
            
            # Mostrar respuesta si es JSON
            try {
                $json = $response.Content | ConvertFrom-Json
                Write-Host "   Response: $($json | ConvertTo-Json -Depth 2 -Compress)" -ForegroundColor Gray
            } catch {}
            
            return $response
        } else {
            Write-Host "   FAIL - Expected $ExpectedStatus but got $($response.StatusCode)" -ForegroundColor Red
            $script:testsFailed++
            return $null
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "   PASS - Status: $statusCode (Expected error)" -ForegroundColor Green
            $script:testsPassed++
        } else {
            Write-Host "   FAIL - Error: $($_.Exception.Message)" -ForegroundColor Red
            if ($statusCode) {
                Write-Host "   Status Code: $statusCode" -ForegroundColor Red
            }
            $script:testsFailed++
        }
        return $null
    }
    
    Write-Host ""
}

Write-Host "`n=== TEST 1: HEALTH CHECK ===`n" -ForegroundColor Magenta

Test-Endpoint `
    -Name "GET /api/health - Verificar estado del sistema" `
    -Method "GET" `
    -Url "$baseUrl/api/health" `
    -ExpectedStatus 200

Write-Host "`n=== TEST 2: FEED DE POSTS ===`n" -ForegroundColor Magenta

Test-Endpoint `
    -Name "GET /api/posts - Obtener feed (deberia estar vacio inicialmente)" `
    -Method "GET" `
    -Url "$baseUrl/api/posts" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /api/posts?limit=5 - Feed con limite" `
    -Method "GET" `
    -Url "$baseUrl/api/posts?limit=5" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /api/posts?type=lost - Feed filtrado por tipo" `
    -Method "GET" `
    -Url "$baseUrl/api/posts?type=lost" `
    -ExpectedStatus 200

Write-Host "`n=== TEST 3: AUTENTICACION ===`n" -ForegroundColor Magenta

$postData = @{
    type = "lost"
    title = "Test post"
    description = "Esta es una descripcion de prueba con mas de 20 caracteres"
    category = "other"
    images = @(
        @{
            url = "https://example.com/image.jpg"
            publicId = "test/image"
        }
    )
} | ConvertTo-Json

Test-Endpoint `
    -Name "POST /api/posts - Sin autenticacion (deberia fallar 401)" `
    -Method "POST" `
    -Url "$baseUrl/api/posts" `
    -Body $postData `
    -ExpectedStatus 401

$uploadData = "{`"image`":`"test`"}"
Test-Endpoint `
    -Name "POST /api/upload - Sin autenticacion (deberia fallar 401)" `
    -Method "POST" `
    -Url "$baseUrl/api/upload" `
    -Body $uploadData `
    -ExpectedStatus 401

Write-Host "`n=== TEST 4: GET POST POR ID ===`n" -ForegroundColor Magenta

Test-Endpoint `
    -Name "GET /api/posts/[id] - ID invalido (deberia fallar 400)" `
    -Method "GET" `
    -Url "$baseUrl/api/posts/abc123" `
    -ExpectedStatus 400

Test-Endpoint `
    -Name "GET /api/posts/[id] - ID con formato valido pero no existe (deberia fallar 400 o 404)" `
    -Method "GET" `
    -Url "$baseUrl/api/posts/000000000000000000000000" `
    -ExpectedStatus 400

Write-Host "`n================================================" -ForegroundColor Gray
Write-Host "=== RESUMEN DE TESTS ===" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Gray

$total = $testsPassed + $testsFailed
Write-Host "Total de tests: $total" -ForegroundColor White
Write-Host "Pasados: $testsPassed" -ForegroundColor Green
Write-Host "Fallados: $testsFailed" -ForegroundColor Red

if ($testsFailed -eq 0) {
    Write-Host "`nTODOS LOS TESTS PASARON!" -ForegroundColor Green
    Write-Host "`nEl backend esta funcionando correctamente" -ForegroundColor Green
    Write-Host "Proximo paso: Crear posts usando tu cuenta autenticada" -ForegroundColor Yellow
} else {
    Write-Host "`nAlgunos tests fallaron. Revisa los errores arriba." -ForegroundColor Yellow
}

Write-Host "`n================================================`n" -ForegroundColor Gray

Write-Host "PARA TESTS CON AUTENTICACION:" -ForegroundColor Cyan
Write-Host "1. Abre el navegador en: http://localhost:3000" -ForegroundColor White
Write-Host "2. Haz login con tu cuenta de Google" -ForegroundColor White
Write-Host "3. Usa el navegador para crear posts (proximo sprint)" -ForegroundColor White
Write-Host "   O usa Postman/Thunder Client con las cookies de sesion`n" -ForegroundColor White
