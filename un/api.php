<?php
/**
 * Mission Topper - API Proxy
 * Fetches data from external API and formats it for the frontend
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// External API base URLs
const EXTERNAL_API_BASE = 'https://api.thescholarverse.site/unacademy';

// Get the requested resource from URL path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = trim($path, '/');

// Handle different path formats
if (strpos($path, 'api.php') === 0) {
    $path = substr($path, 8); // Remove 'api.php' (8 characters)
}
// Also handle if path starts with api.php/
if (strpos($path, 'api.php/') === 0) {
    $path = substr($path, 8);
}

$path = trim($path, '/');
$segments = array_filter(explode('/', $path));
$segments = array_values($segments); // Reindex array

// Route the request
if (empty($segments)) {
    // If no segments, assume 'batches' endpoint
    $segments = ['batches'];
}

$resource = $segments[0];

// Log incoming requests
error_log('[API] Request: ' . $_SERVER['REQUEST_METHOD'] . ' ' . $_SERVER['REQUEST_URI'] . ' | Segments: ' . json_encode($segments));

try {
    // Debug endpoint
    if ($resource === 'debug') {
        sendSuccess([
            'message' => 'API is working!',
            'segments' => $segments,
            'request_uri' => $_SERVER['REQUEST_URI'],
            'path' => $path,
            'method' => $_SERVER['REQUEST_METHOD'],
            'time' => date('Y-m-d H:i:s')
        ]);
    }

    switch ($resource) {
        case 'batches':
            if (count($segments) === 1) {
                // GET /api.php/batches - List all batches
                handleGetBatches();
            } else {
                // GET /api.php/batches/{batch_id} - Get subjects for a batch
                $batchId = $segments[1];
                handleGetSubjects($batchId);
            }
            break;

        case 'subjects':
            if (count($segments) === 2 && $segments[1]) {
                // GET /api.php/subjects/{subject_id} - Get lectures for a subject
                $subjectId = $segments[1];
                handleGetLectures($subjectId);
            } else {
                sendError('Invalid subject request', 400);
            }
            break;

        default:
            sendError('Unknown resource', 404);
    }
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}

/**
 * Get all batches
 */
function handleGetBatches() {
    $url = EXTERNAL_API_BASE . '/batches';
    error_log('[BATCHES] Fetching from: ' . $url);

    try {
        $response = fetchExternalAPI($url);
        error_log('[BATCHES] Response keys: ' . json_encode(array_keys($response)));

        // Transform response to match frontend expectations
        $batches = [];
        $categories = [];

        if (isset($response['data']['batches']) && is_array($response['data']['batches'])) {
            error_log('[BATCHES] Found ' . count($response['data']['batches']) . ' batches');
            foreach ($response['data']['batches'] as $batch) {
                $batches[] = [
                    'id' => $batch['id'] ?? $batch['uid'] ?? '',
                    'uid' => $batch['uid'] ?? $batch['id'] ?? '',
                    'name' => $batch['name'] ?? '',
                    'category' => $batch['category'] ?? 'General',
                    'image' => $batch['image'] ?? $batch['thumbnail'] ?? '',
                    'subjects_count' => $batch['subjects_count'] ?? count($batch['subjects'] ?? []),
                    'description' => $batch['description'] ?? '',
                    'status' => $batch['status'] ?? 'active'
                ];

                // Collect unique categories
                $cat = $batch['category'] ?? 'General';
                if (!in_array($cat, $categories)) {
                    $categories[] = $cat;
                }
            }
        } else {
            error_log('[BATCHES] ERROR: Invalid response structure. Full response: ' . json_encode($response));
        }

        error_log('[BATCHES] Returning ' . count($batches) . ' batches with ' . count($categories) . ' categories');
        sendSuccess([
            'batches' => $batches,
            'categories' => $categories
        ]);
    } catch (Exception $e) {
        error_log('[BATCHES] Exception: ' . $e->getMessage());
        throw $e;
    }
}

/**
 * Get subjects for a specific batch
 */
function handleGetSubjects($batchId) {
    $url = EXTERNAL_API_BASE . '/batches/' . urlencode($batchId);
    $response = fetchExternalAPI($url);

    $subjects = [];

    if (isset($response['data']['subjects']) && is_array($response['data']['subjects'])) {
        foreach ($response['data']['subjects'] as $subject) {
            $subjects[] = [
                'id' => $subject['id'] ?? $subject['uid'] ?? '',
                'uid' => $subject['uid'] ?? $subject['id'] ?? '',
                'name' => $subject['name'] ?? '',
                'image' => $subject['image'] ?? $subject['thumbnail'] ?? '',
                'description' => $subject['description'] ?? '',
                'chapters_count' => $subject['chapters_count'] ?? 0,
                'lectures_count' => $subject['lectures_count'] ?? count($subject['lectures'] ?? [])
            ];
        }
    }

    sendSuccess([
        'subjects' => $subjects
    ]);
}

/**
 * Get lectures for a specific subject
 */
function handleGetLectures($subjectId) {
    $url = EXTERNAL_API_BASE . '/subjects/' . urlencode($subjectId);
    $response = fetchExternalAPI($url);

    $lectures = [];

    if (isset($response['data']['lectures']) && is_array($response['data']['lectures'])) {
        foreach ($response['data']['lectures'] as $lecture) {
            $lectures[] = [
                'id' => $lecture['id'] ?? $lecture['uid'] ?? '',
                'uid' => $lecture['uid'] ?? $lecture['id'] ?? '',
                'title' => $lecture['title'] ?? '',
                'teacher' => $lecture['teacher'] ?? $lecture['instructor'] ?? '',
                'live_at' => $lecture['live_at'] ?? $lecture['created_at'] ?? '',
                'thumbnail' => $lecture['thumbnail'] ?? $lecture['image'] ?? '',
                'image' => $lecture['image'] ?? $lecture['thumbnail'] ?? '',
                'video_url' => $lecture['video_url'] ?? '',
                'downloadable_video_url' => $lecture['downloadable_video_url'] ?? $lecture['video_url'] ?? '',
                'pdf_url' => $lecture['pdf_url'] ?? $lecture['notes_url'] ?? '',
                'notes_url' => $lecture['notes_url'] ?? $lecture['pdf_url'] ?? '',
                'duration' => $lecture['duration'] ?? 0,
                'description' => $lecture['description'] ?? ''
            ];
        }
    }

    sendSuccess([
        'lectures' => $lectures
    ]);
}

/**
 * Fetch data from external API with error handling
 */
function fetchExternalAPI($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    // Add user agent to avoid being blocked
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    // Add headers
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);

    curl_close($ch);

    if ($error) {
        throw new Exception("cURL Error: $error");
    }

    if ($httpCode !== 200) {
        throw new Exception("HTTP Error: $httpCode from $url");
    }

    $data = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON Decode Error: " . json_last_error_msg());
    }

    return $data;
}

/**
 * Send success response
 */
function sendSuccess($data) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $data
    ]);
    exit();
}

/**
 * Send error response
 */
function sendError($message, $code = 500) {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'error' => $message,
        'code' => $code
    ]);
    exit();
}
?>

