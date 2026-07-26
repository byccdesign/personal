<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Strict',
]);
session_start();

function reply(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function body(): array
{
    $decoded = json_decode(file_get_contents('php://input') ?: '{}', true);
    return is_array($decoded) ? $decoded : [];
}

function document_from_row(array $row): array
{
    $graph = json_decode((string) $row['graph_json'], true);
    if (!is_array($graph)) {
        $graph = ['nodes' => [], 'edges' => []];
    }

    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'slug' => $row['slug'],
        'shared' => (bool) $row['is_shared'],
        'updatedAt' => $row['updated_at'],
        'nodes' => is_array($graph['nodes'] ?? null) ? $graph['nodes'] : [],
        'edges' => is_array($graph['edges'] ?? null) ? $graph['edges'] : [],
        'drawings' => is_array($graph['drawings'] ?? null) ? $graph['drawings'] : [],
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    reply(['ok' => true]);
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    reply(['error' => 'Database is not configured. Copy config.example.php to config.php.'], 503);
}

try {
    $config = require $configPath;
    $pdo = new PDO($config['dsn'], $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $action = $_GET['action'] ?? 'list';

    if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $valid = isset($config['app_password_hash']) && password_verify((string) ($payload['password'] ?? ''), (string) $config['app_password_hash']);
        if (!$valid) reply(['error' => 'Invalid password'], 401);
        session_regenerate_id(true);
        $_SESSION['mymind_authenticated'] = true;
        reply(['ok' => true]);
    }

    if ($action === 'shared' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $slug = trim((string) ($_GET['slug'] ?? ''));
        $statement = $pdo->prepare('SELECT id, title, slug, is_shared, graph_json, updated_at FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1');
        $statement->execute([$slug]);
        $row = $statement->fetch();
        $row ? reply(['document' => document_from_row($row)]) : reply(['error' => 'Canvas not found'], 404);
    }

    if (empty($_SESSION['mymind_authenticated'])) {
        reply(['error' => 'Authentication required'], 401);
    }

    if ($action === 'list' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $rows = $pdo->query('SELECT id, title, slug, is_shared, graph_json, updated_at FROM mind_documents ORDER BY updated_at DESC')->fetchAll();
        reply(['documents' => array_map('document_from_row', $rows)]);
    }

    if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $document = $payload['document'] ?? null;
        if (!is_array($document) || empty($document['id']) || empty($document['title']) || empty($document['slug'])) {
            reply(['error' => 'Invalid document'], 422);
        }

        $graph = json_encode([
            'nodes' => is_array($document['nodes'] ?? null) ? $document['nodes'] : [],
            'edges' => is_array($document['edges'] ?? null) ? $document['edges'] : [],
            'drawings' => is_array($document['drawings'] ?? null) ? $document['drawings'] : [],
        ], JSON_UNESCAPED_SLASHES);

        $statement = $pdo->prepare(
            'INSERT INTO mind_documents (id, title, slug, is_shared, graph_json)
             VALUES (:id, :title, :slug, :shared, :graph)
             ON DUPLICATE KEY UPDATE title = VALUES(title), slug = VALUES(slug), is_shared = VALUES(is_shared), graph_json = VALUES(graph_json), updated_at = CURRENT_TIMESTAMP'
        );
        $statement->execute([
            ':id' => substr((string) $document['id'], 0, 96),
            ':title' => substr(trim((string) $document['title']), 0, 255),
            ':slug' => substr(trim((string) $document['slug']), 0, 96),
            ':shared' => !empty($document['shared']) ? 1 : 0,
            ':graph' => $graph,
        ]);
        reply(['ok' => true]);
    }

    if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $id = trim((string) ($payload['id'] ?? ''));
        if ($id === '') reply(['error' => 'Missing id'], 422);
        $statement = $pdo->prepare('DELETE FROM mind_documents WHERE id = ?');
        $statement->execute([$id]);
        reply(['ok' => true]);
    }

    reply(['error' => 'Unsupported action'], 404);
} catch (Throwable $error) {
    error_log('MyMind API error: ' . $error->getMessage());
    reply(['error' => 'Database request failed'], 500);
}
