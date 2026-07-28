<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

ini_set('session.use_strict_mode', '1');
session_name('MYMINDSESSID');
$scriptPath = '/' . ltrim(str_replace('\\', '/', (string) ($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')), '/');
$sessionPath = preg_replace('#/(?:public/)?api/index\.php$#i', '', $scriptPath);
if (!is_string($sessionPath) || $sessionPath === '') $sessionPath = '/';
session_set_cookie_params([
    'path' => $sessionPath,
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
    $raw = file_get_contents('php://input') ?: '{}';
    if (strtolower((string) ($_SERVER['HTTP_CONTENT_ENCODING'] ?? '')) === 'gzip' && function_exists('gzdecode')) {
        $decodedBody = gzdecode($raw);
        if ($decodedBody !== false) $raw = $decodedBody;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function public_annotations(array $annotations): array
{
    return array_map(static function (array $annotation): array {
        unset($annotation['editTokenHash']);
        $annotation['replies'] = array_map(static function (array $reply): array {
            unset($reply['editTokenHash']);
            return $reply;
        }, is_array($annotation['replies'] ?? null) ? $annotation['replies'] : []);
        return $annotation;
    }, $annotations);
}

function graph_pages(array $graph): array
{
    $pages = is_array($graph['pages'] ?? null) ? array_values(array_filter($graph['pages'], 'is_array')) : [];
    if (!$pages) {
        $pages = [[
            'id' => (string) ($graph['activePageId'] ?? 'page-1'),
            'name' => 'Page 1',
            'nodes' => is_array($graph['nodes'] ?? null) ? $graph['nodes'] : [],
            'edges' => is_array($graph['edges'] ?? null) ? $graph['edges'] : [],
            'drawings' => is_array($graph['drawings'] ?? null) ? $graph['drawings'] : [],
            'annotations' => is_array($graph['annotations'] ?? null) ? $graph['annotations'] : [],
        ]];
    }
    return $pages;
}

function clean_page(array $page, int $index, array $existingAnnotations = [], array $deletedAnnotations = [], array $deletedReplies = []): array
{
    $pageId = substr((string) ($page['id'] ?? ('page-' . ($index + 1))), 0, 96);
    return [
        'id' => $pageId,
        'name' => mb_substr(trim(strip_tags((string) ($page['name'] ?? ('Page ' . ($index + 1))))) ?: ('Page ' . ($index + 1)), 0, 60),
        'nodes' => is_array($page['nodes'] ?? null) ? array_values($page['nodes']) : [],
        'edges' => is_array($page['edges'] ?? null) ? array_values($page['edges']) : [],
        'drawings' => is_array($page['drawings'] ?? null) ? array_values($page['drawings']) : [],
        'annotations' => merge_annotations(is_array($page['annotations'] ?? null) ? $page['annotations'] : [], $existingAnnotations, $deletedAnnotations, $deletedReplies),
    ];
}

function merge_annotations(array $incoming, array $existing, array $deletedAnnotations, array $deletedReplies): array
{
    $existingIds = array_fill_keys(array_filter(array_map(static fn ($item) => is_array($item) ? (string) ($item['id'] ?? '') : '', $existing)), true);
    $existingById = [];
    foreach ($existing as $item) if (is_array($item) && !empty($item['id'])) $existingById[(string) $item['id']] = $item;
    $usedNumbers = array_fill_keys(array_map(static fn ($item) => (int) ($item['number'] ?? 0), $existing), true);
    $maxNumber = $usedNumbers ? max(array_keys($usedNumbers)) : 0;
    foreach ($incoming as &$annotation) {
        if (!is_array($annotation)) continue;
        $annotationId = (string) ($annotation['id'] ?? '');
        $number = (int) ($annotation['number'] ?? 0);
        if (!isset($existingIds[$annotationId]) && ($number < 1 || isset($usedNumbers[$number]))) $annotation['number'] = ++$maxNumber;
        $usedNumbers[(int) ($annotation['number'] ?? 0)] = true;
        if (!isset($existingById[$annotationId])) continue;
        $existingAnnotation = $existingById[$annotationId];
        if (!empty($existingAnnotation['editTokenHash'])) $annotation['editTokenHash'] = $existingAnnotation['editTokenHash'];
        $existingReplies = is_array($existingAnnotation['replies'] ?? null) ? $existingAnnotation['replies'] : [];
        $incomingReplies = is_array($annotation['replies'] ?? null) ? $annotation['replies'] : [];
        $existingRepliesById = [];
        foreach ($existingReplies as $reply) if (is_array($reply) && !empty($reply['id'])) $existingRepliesById[(string) $reply['id']] = $reply;
        $incomingReplyIds = [];
        foreach ($incomingReplies as &$reply) {
            if (!is_array($reply)) continue;
            $replyId = (string) ($reply['id'] ?? '');
            if ($replyId !== '') $incomingReplyIds[$replyId] = true;
            if ($replyId !== '' && !empty($existingRepliesById[$replyId]['editTokenHash'])) $reply['editTokenHash'] = $existingRepliesById[$replyId]['editTokenHash'];
        }
        unset($reply);
        foreach ($existingReplies as $reply) {
            $replyId = is_array($reply) ? (string) ($reply['id'] ?? '') : '';
            if ($replyId !== '' && !isset($incomingReplyIds[$replyId]) && !isset($deletedReplies[$replyId])) $incomingReplies[] = $reply;
        }
        $annotation['replies'] = $incomingReplies;
    }
    unset($annotation);
    $knownIds = array_fill_keys(array_filter(array_map(static fn ($item) => is_array($item) ? (string) ($item['id'] ?? '') : '', $incoming)), true);
    foreach ($existing as $annotation) {
        $annotationId = is_array($annotation) ? (string) ($annotation['id'] ?? '') : '';
        if ($annotationId !== '' && !isset($knownIds[$annotationId]) && !isset($deletedAnnotations[$annotationId])) $incoming[] = $annotation;
    }
    return $incoming;
}

function document_from_row(array $row): array
{
    $graph = json_decode((string) $row['graph_json'], true);
    if (!is_array($graph)) {
        $graph = ['nodes' => [], 'edges' => []];
    }

    $pages = graph_pages($graph);
    foreach ($pages as &$page) $page['annotations'] = public_annotations(is_array($page['annotations'] ?? null) ? $page['annotations'] : []);
    unset($page);
    $activePageId = (string) ($graph['activePageId'] ?? ($pages[0]['id'] ?? 'page-1'));
    $activePage = $pages[0];
    foreach ($pages as $page) if ((string) ($page['id'] ?? '') === $activePageId) { $activePage = $page; break; }
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'slug' => $row['slug'],
        'shared' => (bool) $row['is_shared'],
        'guestEditable' => !empty($graph['guestEditable']),
        'folderId' => !empty($graph['folderId']) ? (string) $graph['folderId'] : null,
        'updatedAt' => $row['updated_at'],
        'revision' => (int) ($row['revision'] ?? 0),
        'activePageId' => $activePageId,
        'pages' => $pages,
        'nodes' => is_array($activePage['nodes'] ?? null) ? $activePage['nodes'] : [],
        'edges' => is_array($activePage['edges'] ?? null) ? $activePage['edges'] : [],
        'drawings' => is_array($activePage['drawings'] ?? null) ? $activePage['drawings'] : [],
        'annotations' => is_array($activePage['annotations'] ?? null) ? $activePage['annotations'] : [],
    ];
}

function ensure_sync_row(PDO $pdo, string $documentId): void
{
    $statement = $pdo->prepare('INSERT IGNORE INTO mind_document_sync (document_id, revision) VALUES (?, 0)');
    $statement->execute([$documentId]);
}

function locked_revision(PDO $pdo, string $documentId): int
{
    ensure_sync_row($pdo, $documentId);
    $statement = $pdo->prepare('SELECT revision FROM mind_document_sync WHERE document_id = ? FOR UPDATE');
    $statement->execute([$documentId]);
    return (int) ($statement->fetchColumn() ?: 0);
}

function bump_revision(PDO $pdo, string $documentId): int
{
    ensure_sync_row($pdo, $documentId);
    $statement = $pdo->prepare('UPDATE mind_document_sync SET revision = revision + 1, updated_at = CURRENT_TIMESTAMP WHERE document_id = ?');
    $statement->execute([$documentId]);
    $statement = $pdo->prepare('SELECT revision FROM mind_document_sync WHERE document_id = ?');
    $statement->execute([$documentId]);
    return (int) ($statement->fetchColumn() ?: 0);
}

function revision_conflict(array $payload, int $currentRevision): bool
{
    return array_key_exists('baseRevision', $payload) && (int) $payload['baseRevision'] !== $currentRevision;
}

function document_select_columns(): string
{
    return 'd.id, d.title, d.slug, d.is_shared, d.graph_json, d.updated_at, COALESCE(s.revision, 0) AS revision';
}

function public_http_target(string $value): ?array
{
    if (!filter_var($value, FILTER_VALIDATE_URL)) return null;
    $parts = parse_url($value);
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    $host = strtolower((string) ($parts['host'] ?? ''));
    if (!in_array($scheme, ['http', 'https'], true) || $host === '' || isset($parts['user']) || isset($parts['pass'])) return null;
    $addresses = filter_var($host, FILTER_VALIDATE_IP) ? [$host] : (gethostbynamel($host) ?: []);
    foreach ($addresses as $address) {
        if (filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return ['url' => $value, 'host' => $host, 'ip' => $address, 'port' => (int) ($parts['port'] ?? ($scheme === 'https' ? 443 : 80))];
        }
    }
    return null;
}

function absolute_asset_url(string $base, string $asset): ?string
{
    $asset = trim(html_entity_decode($asset, ENT_QUOTES | ENT_HTML5));
    if ($asset === '' || str_starts_with(strtolower($asset), 'data:')) return null;
    if (preg_match('#^https?://#i', $asset)) return public_http_target($asset) ? $asset : null;
    $parts = parse_url($base);
    if (!$parts || empty($parts['scheme']) || empty($parts['host'])) return null;
    $origin = $parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '');
    if (str_starts_with($asset, '//')) return absolute_asset_url($base, $parts['scheme'] . ':' . $asset);
    if (str_starts_with($asset, '/')) return $origin . $asset;
    $path = (string) ($parts['path'] ?? '/');
    return $origin . rtrim(str_replace('\\', '/', dirname($path)), '/') . '/' . $asset;
}

function xpath_value(DOMXPath $xpath, array $queries): string
{
    foreach ($queries as $query) {
        $node = $xpath->query($query)?->item(0);
        $value = trim((string) ($node?->nodeValue ?? ''));
        if ($value !== '') return $value;
    }
    return '';
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    reply(['ok' => true]);
}

$action = $_GET['action'] ?? 'list';

if ($action === 'logout' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $sessionPath,
            'httponly' => true,
            'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
            'samesite' => 'Strict',
        ]);
    }
    session_destroy();
    reply(['ok' => true]);
}

if ($action === 'youtube-thumbnail' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $videoId = trim((string) ($_GET['id'] ?? ''));
    if (!preg_match('/^[A-Za-z0-9_-]{6,20}$/', $videoId)) reply(['error' => 'Invalid YouTube video id'], 422);
    if (!function_exists('curl_init')) reply(['error' => 'Thumbnail proxy unavailable'], 501);
    foreach (['maxresdefault.jpg', 'hqdefault.jpg', 'mqdefault.jpg'] as $variant) {
        $handle = curl_init('https://i.ytimg.com/vi/' . rawurlencode($videoId) . '/' . $variant);
        curl_setopt_array($handle, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_USERAGENT => 'MyMind Thumbnail Proxy/1.0',
        ]);
        $image = curl_exec($handle);
        $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        $contentType = strtolower((string) curl_getinfo($handle, CURLINFO_CONTENT_TYPE));
        curl_close($handle);
        if ($status === 200 && is_string($image) && $image !== '' && str_starts_with($contentType, 'image/') && strlen($image) <= 5 * 1024 * 1024) {
            header('Content-Type: ' . $contentType);
            header('Cache-Control: public, max-age=86400, stale-while-revalidate=604800');
            echo $image;
            exit;
        }
    }
    reply(['error' => 'YouTube thumbnail unavailable'], 502);
}

if ($action === 'link-preview' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $payload = body();
    $target = public_http_target(trim((string) ($payload['url'] ?? '')));
    if (!$target) reply(['error' => 'Invalid or private URL'], 422);
    if (!function_exists('curl_init') || !class_exists('DOMDocument')) reply(['error' => 'Link previews are unavailable'], 501);

    $html = '';
    $handle = curl_init($target['url']);
    curl_setopt_array($handle, [
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_USERAGENT => 'MyMind Link Preview/1.0',
        CURLOPT_HTTPHEADER => ['Accept: text/html,application/xhtml+xml'],
        CURLOPT_RESOLVE => [$target['host'] . ':' . $target['port'] . ':' . $target['ip']],
        CURLOPT_WRITEFUNCTION => static function ($curl, string $chunk) use (&$html): int {
            $remaining = 524288 - strlen($html);
            if ($remaining <= 0) return 0;
            $html .= substr($chunk, 0, $remaining);
            return strlen($chunk) <= $remaining ? strlen($chunk) : 0;
        },
    ]);
    curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    $contentType = strtolower((string) curl_getinfo($handle, CURLINFO_CONTENT_TYPE));
    curl_close($handle);
    if ($status < 200 || $status >= 300 || $html === '' || ($contentType !== '' && !str_contains($contentType, 'html'))) reply(['error' => 'Preview unavailable'], 422);

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_NONET | LIBXML_NOWARNING | LIBXML_NOERROR);
    $xpath = new DOMXPath($dom);
    $title = xpath_value($xpath, ['//meta[@property="og:title"]/@content', '//meta[@name="twitter:title"]/@content', '//title']);
    $description = xpath_value($xpath, ['//meta[@property="og:description"]/@content', '//meta[@name="description"]/@content', '//meta[@name="twitter:description"]/@content']);
    $image = absolute_asset_url($target['url'], xpath_value($xpath, ['//meta[@property="og:image"]/@content', '//meta[@name="twitter:image"]/@content']));
    $icon = absolute_asset_url($target['url'], xpath_value($xpath, ['//link[contains(translate(@rel,"ICON","icon"),"icon")]/@href']));
    libxml_clear_errors();
    reply([
        'title' => mb_substr(strip_tags($title), 0, 180),
        'description' => mb_substr(strip_tags($description), 0, 280),
        'image' => $image,
        'icon' => $icon,
    ]);
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    reply(['error' => 'Database is not configured. Copy config.example.php to config.php.'], 503);
}

try {
    $config = require $configPath;
    $requestHost = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
    $useLocalDatabase = in_array($requestHost, ['localhost', '127.0.0.1', '::1'], true)
        && isset($config['local_dsn'], $config['local_username'], $config['local_password']);
    $pdo = new PDO(
        $useLocalDatabase ? $config['local_dsn'] : $config['dsn'],
        $useLocalDatabase ? $config['local_username'] : $config['username'],
        $useLocalDatabase ? $config['local_password'] : $config['password'],
        [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
    $pdo->exec('CREATE TABLE IF NOT EXISTS mind_folders (id VARCHAR(96) PRIMARY KEY, name VARCHAR(120) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    $pdo->exec('CREATE TABLE IF NOT EXISTS mind_document_sync (document_id VARCHAR(96) PRIMARY KEY, revision BIGINT UNSIGNED NOT NULL DEFAULT 0, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    $pdo->exec("CREATE TABLE IF NOT EXISTS mind_presence (document_id VARCHAR(96) NOT NULL, client_id VARCHAR(96) NOT NULL, display_name VARCHAR(80) NOT NULL, participant_role ENUM('owner','editor','viewer') NOT NULL DEFAULT 'viewer', last_seen TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (document_id, client_id), INDEX idx_mind_presence_seen (last_seen)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

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
        $statement = $pdo->prepare('SELECT ' . document_select_columns() . ' FROM mind_documents d LEFT JOIN mind_document_sync s ON s.document_id = d.id WHERE d.slug = ? AND d.is_shared = 1 LIMIT 1');
        $statement->execute([$slug]);
        $row = $statement->fetch();
        $row ? reply(['document' => document_from_row($row)]) : reply(['error' => 'Canvas not found'], 404);
    }

    if ($action === 'document' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $authenticated = !empty($_SESSION['mymind_authenticated']);
        if ($authenticated) {
            $id = substr(trim((string) ($_GET['id'] ?? '')), 0, 96);
            $statement = $pdo->prepare('SELECT ' . document_select_columns() . ' FROM mind_documents d LEFT JOIN mind_document_sync s ON s.document_id = d.id WHERE d.id = ? LIMIT 1');
            $statement->execute([$id]);
        } else {
            $slug = substr(trim((string) ($_GET['slug'] ?? '')), 0, 96);
            $statement = $pdo->prepare('SELECT ' . document_select_columns() . ' FROM mind_documents d LEFT JOIN mind_document_sync s ON s.document_id = d.id WHERE d.slug = ? AND d.is_shared = 1 LIMIT 1');
            $statement->execute([$slug]);
        }
        $row = $statement->fetch();
        $row ? reply(['document' => document_from_row($row)]) : reply(['error' => 'Canvas not found'], 404);
    }

    if ($action === 'presence' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $clientId = substr(preg_replace('/[^a-zA-Z0-9_-]/', '', (string) ($payload['clientId'] ?? '')), 0, 96);
        if ($clientId === '') reply(['error' => 'Invalid presence client'], 422);
        $authenticated = !empty($_SESSION['mymind_authenticated']);
        if ($authenticated && !empty($payload['documentId'])) {
            $statement = $pdo->prepare('SELECT id FROM mind_documents WHERE id = ? LIMIT 1');
            $statement->execute([substr((string) $payload['documentId'], 0, 96)]);
            $documentId = (string) ($statement->fetchColumn() ?: '');
            $role = 'owner';
            $displayName = 'Christine';
        } else {
            $statement = $pdo->prepare('SELECT id, graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1');
            $statement->execute([substr((string) ($payload['slug'] ?? ''), 0, 96)]);
            $row = $statement->fetch();
            $documentId = (string) ($row['id'] ?? '');
            $graph = $row ? json_decode((string) $row['graph_json'], true) : null;
            $role = is_array($graph) && !empty($graph['guestEditable']) ? 'editor' : 'viewer';
            $displayName = $role === 'editor' ? 'Guest editor' : 'Guest viewer';
        }
        if ($documentId === '') reply(['error' => 'Canvas not found'], 404);
        $pdo->prepare('DELETE FROM mind_presence WHERE last_seen < (CURRENT_TIMESTAMP - INTERVAL 2 MINUTE)')->execute();
        $statement = $pdo->prepare('INSERT INTO mind_presence (document_id, client_id, display_name, participant_role, last_seen) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE display_name = VALUES(display_name), participant_role = VALUES(participant_role), last_seen = CURRENT_TIMESTAMP');
        $statement->execute([$documentId, $clientId, $displayName, $role]);
        $statement = $pdo->prepare('SELECT client_id, display_name, participant_role FROM mind_presence WHERE document_id = ? AND last_seen >= (CURRENT_TIMESTAMP - INTERVAL 30 SECOND) ORDER BY participant_role, display_name');
        $statement->execute([$documentId]);
        reply(['participants' => array_map(static fn (array $participant): array => [
            'clientId' => $participant['client_id'],
            'name' => $participant['display_name'],
            'role' => $participant['participant_role'],
        ], $statement->fetchAll())]);
    }

    if ($action === 'page-save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 25 * 1024 * 1024) reply(['error' => 'Canvas update is too large'], 413);
        $payload = body();
        $incoming = is_array($payload['document'] ?? null) ? $payload['document'] : [];
        $incomingPage = is_array($incoming['page'] ?? null) ? $incoming['page'] : [];
        $pageMeta = is_array($incoming['pages'] ?? null) ? array_values(array_filter($incoming['pages'], 'is_array')) : [];
        if (!$incoming || !$incomingPage || empty($incomingPage['id']) || count($pageMeta) > 100) reply(['error' => 'Invalid page update'], 422);
        $authenticated = !empty($_SESSION['mymind_authenticated']);

        $pdo->beginTransaction();
        if ($authenticated) {
            $statement = $pdo->prepare('SELECT id, title, slug, is_shared, graph_json FROM mind_documents WHERE id = ? LIMIT 1 FOR UPDATE');
            $statement->execute([substr((string) ($incoming['id'] ?? ''), 0, 96)]);
        } else {
            $statement = $pdo->prepare('SELECT id, title, slug, is_shared, graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1 FOR UPDATE');
            $statement->execute([substr((string) ($payload['slug'] ?? ''), 0, 96)]);
        }
        $row = $statement->fetch();
        if (!$row) { $pdo->rollBack(); reply(['error' => 'Canvas not found'], 404); }
        $graph = json_decode((string) $row['graph_json'], true);
        if (!is_array($graph)) $graph = [];
        if (!$authenticated && empty($graph['guestEditable'])) { $pdo->rollBack(); reply(['error' => 'Guest editing is disabled'], 403); }

        $currentRevision = locked_revision($pdo, (string) $row['id']);
        if (revision_conflict($payload, $currentRevision)) {
            $pdo->rollBack();
            reply(['error' => 'Canvas changed in another session', 'currentRevision' => $currentRevision], 409);
        }

        $existingPages = graph_pages($graph);
        $existingById = [];
        foreach ($existingPages as $page) if (!empty($page['id'])) $existingById[(string) $page['id']] = $page;
        $incomingPageId = substr((string) $incomingPage['id'], 0, 96);
        $deletedAnnotationIds = array_fill_keys(array_map('strval', is_array($incoming['deletedAnnotationIds'] ?? null) ? $incoming['deletedAnnotationIds'] : []), true);
        $deletedReplyIds = array_fill_keys(array_map('strval', is_array($incoming['deletedReplyIds'] ?? null) ? $incoming['deletedReplyIds'] : []), true);
        $pages = [];
        foreach ($pageMeta as $index => $meta) {
            $pageId = substr((string) ($meta['id'] ?? ''), 0, 96);
            if ($pageId === '') continue;
            if ($pageId === $incomingPageId) {
                $incomingPage['name'] = (string) ($meta['name'] ?? ($incomingPage['name'] ?? 'Page ' . ($index + 1)));
                $pages[] = clean_page($incomingPage, $index, is_array($existingById[$pageId]['annotations'] ?? null) ? $existingById[$pageId]['annotations'] : [], $deletedAnnotationIds, $deletedReplyIds);
            } elseif (isset($existingById[$pageId])) {
                $page = $existingById[$pageId];
                $page['name'] = (string) ($meta['name'] ?? ($page['name'] ?? 'Page ' . ($index + 1)));
                $pages[] = clean_page($page, $index, is_array($page['annotations'] ?? null) ? $page['annotations'] : []);
            } else {
                $pages[] = clean_page(['id' => $pageId, 'name' => (string) ($meta['name'] ?? 'Page ' . ($index + 1))], $index);
            }
        }
        if (!array_filter($pages, static fn (array $page): bool => (string) $page['id'] === $incomingPageId)) {
            $pages[] = clean_page($incomingPage, count($pages), is_array($existingById[$incomingPageId]['annotations'] ?? null) ? $existingById[$incomingPageId]['annotations'] : [], $deletedAnnotationIds, $deletedReplyIds);
        }
        if (!$pages) { $pdo->rollBack(); reply(['error' => 'Canvas needs at least one page'], 422); }

        $totalItems = 0;
        $totalPoints = 0;
        foreach ($pages as $page) {
            $totalItems += count($page['nodes']) + count($page['edges']) + count($page['drawings']);
            foreach ($page['drawings'] as $drawing) $totalPoints += is_array($drawing['points'] ?? null) ? count($drawing['points']) : 0;
        }
        if ($totalItems > 100000 || $totalPoints > 2000000) { $pdo->rollBack(); reply(['error' => 'Canvas exceeds safe limits'], 422); }

        $activePageId = substr((string) ($incoming['activePageId'] ?? $incomingPageId), 0, 96);
        $activePage = $pages[0];
        foreach ($pages as $page) if ((string) $page['id'] === $activePageId) { $activePage = $page; break; }
        $graph['activePageId'] = (string) $activePage['id'];
        $graph['pages'] = $pages;
        $graph['nodes'] = $activePage['nodes'];
        $graph['edges'] = $activePage['edges'];
        $graph['drawings'] = $activePage['drawings'];
        $graph['annotations'] = $activePage['annotations'];
        if ($authenticated) {
            $graph['folderId'] = !empty($incoming['folderId']) ? substr((string) $incoming['folderId'], 0, 96) : null;
            $graph['guestEditable'] = !empty($incoming['guestEditable']);
            $title = mb_substr(trim(strip_tags((string) ($incoming['title'] ?? $row['title']))) ?: 'Untitled canvas', 0, 255);
            $slug = substr(trim((string) ($incoming['slug'] ?? $row['slug'])), 0, 96);
            $shared = !empty($incoming['shared']) ? 1 : 0;
        } else {
            $title = mb_substr(trim(strip_tags((string) ($incoming['title'] ?? $row['title']))) ?: (string) $row['title'], 0, 255);
            $slug = (string) $row['slug'];
            $shared = 1;
        }
        $statement = $pdo->prepare('UPDATE mind_documents SET title = ?, slug = ?, is_shared = ?, graph_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $statement->execute([$title, $slug, $shared, json_encode($graph, JSON_UNESCAPED_SLASHES), $row['id']]);
        $revision = bump_revision($pdo, (string) $row['id']);
        $pdo->commit();
        reply(['ok' => true, 'revision' => $revision]);
    }

    if ($action === 'guest-save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 25 * 1024 * 1024) reply(['error' => 'Canvas update is too large'], 413);
        $payload = body();
        $slug = substr(trim((string) ($payload['slug'] ?? '')), 0, 96);
        $incoming = is_array($payload['document'] ?? null) ? $payload['document'] : [];
        if ($slug === '' || !$incoming) reply(['error' => 'Invalid canvas update'], 422);
        $pdo->beginTransaction();
        $statement = $pdo->prepare('SELECT id, graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1 FOR UPDATE');
        $statement->execute([$slug]);
        $row = $statement->fetch();
        if (!$row) { $pdo->rollBack(); reply(['error' => 'Canvas not found'], 404); }
        $graph = json_decode((string) $row['graph_json'], true);
        if (!is_array($graph) || empty($graph['guestEditable'])) { $pdo->rollBack(); reply(['error' => 'Guest editing is disabled'], 403); }
        $currentRevision = locked_revision($pdo, (string) $row['id']);
        if (revision_conflict($payload, $currentRevision)) {
            $pdo->rollBack();
            reply(['error' => 'Canvas changed in another session', 'currentRevision' => $currentRevision], 409);
        }

        $pages = is_array($incoming['pages'] ?? null) && $incoming['pages'] ? array_values(array_filter($incoming['pages'], 'is_array')) : [[
            'id' => (string) ($incoming['activePageId'] ?? 'page-1'),
            'name' => 'Page 1',
            'nodes' => is_array($incoming['nodes'] ?? null) ? $incoming['nodes'] : [],
            'edges' => is_array($incoming['edges'] ?? null) ? $incoming['edges'] : [],
            'drawings' => is_array($incoming['drawings'] ?? null) ? $incoming['drawings'] : [],
            'annotations' => is_array($incoming['annotations'] ?? null) ? $incoming['annotations'] : [],
        ]];
        if (count($pages) > 100) { $pdo->rollBack(); reply(['error' => 'Too many pages'], 422); }
        $existingPages = graph_pages($graph);
        $existingById = [];
        foreach ($existingPages as $page) if (!empty($page['id'])) $existingById[(string) $page['id']] = $page;
        $totalItems = 0;
        $totalPoints = 0;
        foreach ($pages as $index => &$page) {
            $pageId = substr((string) ($page['id'] ?? ('page-' . ($index + 1))), 0, 96);
            $page['id'] = $pageId;
            $page['name'] = mb_substr(trim(strip_tags((string) ($page['name'] ?? ('Page ' . ($index + 1))))) ?: ('Page ' . ($index + 1)), 0, 60);
            $page['nodes'] = is_array($page['nodes'] ?? null) ? array_values($page['nodes']) : [];
            $page['edges'] = is_array($page['edges'] ?? null) ? array_values($page['edges']) : [];
            $page['drawings'] = is_array($page['drawings'] ?? null) ? array_values($page['drawings']) : [];
            $page['annotations'] = merge_annotations(is_array($page['annotations'] ?? null) ? $page['annotations'] : [], is_array($existingById[$pageId]['annotations'] ?? null) ? $existingById[$pageId]['annotations'] : [], [], []);
            $totalItems += count($page['nodes']) + count($page['edges']) + count($page['drawings']);
            foreach ($page['drawings'] as $drawing) $totalPoints += is_array($drawing['points'] ?? null) ? count($drawing['points']) : 0;
        }
        unset($page);
        if ($totalItems > 100000 || $totalPoints > 2000000) { $pdo->rollBack(); reply(['error' => 'Canvas exceeds safe guest-edit limits'], 422); }
        $activePageId = substr((string) ($incoming['activePageId'] ?? $pages[0]['id']), 0, 96);
        $activePage = $pages[0];
        foreach ($pages as $page) if ((string) $page['id'] === $activePageId) { $activePage = $page; break; }
        $graph['activePageId'] = $activePageId;
        $graph['pages'] = $pages;
        $graph['nodes'] = $activePage['nodes'];
        $graph['edges'] = $activePage['edges'];
        $graph['drawings'] = $activePage['drawings'];
        $graph['annotations'] = $activePage['annotations'];
        $title = mb_substr(trim(strip_tags((string) ($incoming['title'] ?? 'Untitled canvas'))) ?: 'Untitled canvas', 0, 255);
        $update = $pdo->prepare('UPDATE mind_documents SET title = ?, graph_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $update->execute([$title, json_encode($graph, JSON_UNESCAPED_SLASHES), $row['id']]);
        $revision = bump_revision($pdo, (string) $row['id']);
        $pdo->commit();
        reply(['ok' => true, 'revision' => $revision]);
    }

    if ($action === 'comment' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $slug = substr(trim((string) ($payload['slug'] ?? '')), 0, 96);
        $pageId = substr(trim((string) ($payload['pageId'] ?? 'page-1')), 0, 96);
        $incoming = is_array($payload['annotation'] ?? null) ? $payload['annotation'] : [];
        $comment = trim(strip_tags((string) ($incoming['comment'] ?? '')));
        $author = trim(strip_tags((string) ($incoming['author'] ?? 'Guest'))) ?: 'Guest';
        if ($slug === '' || $comment === '' || mb_strlen($comment) > 1000 || !is_numeric($incoming['x'] ?? null) || !is_numeric($incoming['y'] ?? null)) {
            reply(['error' => 'Invalid annotation'], 422);
        }
        $now = time();
        $recentComments = array_values(array_filter((array) ($_SESSION['mymind_comment_times'] ?? []), static fn ($time) => is_int($time) && $time > $now - 60));
        if (count($recentComments) >= 10) reply(['error' => 'Please wait before adding another comment'], 429);

        $statement = $pdo->prepare('SELECT id, graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1 FOR UPDATE');
        $pdo->beginTransaction();
        $statement->execute([$slug]);
        $row = $statement->fetch();
        if (!$row) { $pdo->rollBack(); reply(['error' => 'Canvas not found'], 404); }
        $graph = json_decode((string) $row['graph_json'], true);
        if (!is_array($graph)) $graph = ['nodes' => [], 'edges' => [], 'drawings' => [], 'annotations' => []];
        $pages = graph_pages($graph);
        $pageIndex = null;
        foreach ($pages as $index => $page) if ((string) ($page['id'] ?? '') === $pageId) { $pageIndex = $index; break; }
        if ($pageIndex === null) { $pdo->rollBack(); reply(['error' => 'Page not found'], 404); }
        $annotations = is_array($pages[$pageIndex]['annotations'] ?? null) ? $pages[$pageIndex]['annotations'] : [];
        $number = array_reduce($annotations, static fn (int $max, array $item): int => max($max, (int) ($item['number'] ?? 0)), 0) + 1;
        $editToken = bin2hex(random_bytes(24));
        $annotation = [
            'id' => 'annotation-' . bin2hex(random_bytes(8)),
            'number' => $number,
            'x' => max(-100000, min(100000, (float) $incoming['x'])),
            'y' => max(-100000, min(100000, (float) $incoming['y'])),
            'comment' => mb_substr($comment, 0, 1000),
            'author' => mb_substr($author, 0, 80),
            'createdAt' => gmdate(DATE_ATOM),
            'replies' => [],
            'editTokenHash' => password_hash($editToken, PASSWORD_DEFAULT),
        ];
        $pages[$pageIndex]['annotations'] = [...$annotations, $annotation];
        $graph['pages'] = $pages;
        if ((string) ($graph['activePageId'] ?? $pageId) === $pageId) $graph['annotations'] = $pages[$pageIndex]['annotations'];
        $update = $pdo->prepare('UPDATE mind_documents SET graph_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $update->execute([json_encode($graph, JSON_UNESCAPED_SLASHES), $row['id']]);
        $revision = bump_revision($pdo, (string) $row['id']);
        $pdo->commit();
        $recentComments[] = $now;
        $_SESSION['mymind_comment_times'] = $recentComments;
        reply(['annotation' => public_annotations([$annotation])[0], 'editToken' => $editToken, 'revision' => $revision]);
    }

    if ($action === 'annotation' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $slug = substr(trim((string) ($payload['slug'] ?? '')), 0, 96);
        $pageId = substr(trim((string) ($payload['pageId'] ?? 'page-1')), 0, 96);
        $annotationId = trim((string) ($payload['annotationId'] ?? ''));
        $operation = (string) ($payload['operation'] ?? '');
        $allowed = ['update', 'delete', 'move', 'reply', 'reply-update', 'reply-delete'];
        if ($slug === '' || $annotationId === '' || !in_array($operation, $allowed, true)) reply(['error' => 'Invalid annotation request'], 422);

        $pdo->beginTransaction();
        $statement = $pdo->prepare('SELECT id, graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1 FOR UPDATE');
        $statement->execute([$slug]);
        $row = $statement->fetch();
        if (!$row) { $pdo->rollBack(); reply(['error' => 'Canvas not found'], 404); }
        $graph = json_decode((string) $row['graph_json'], true);
        if (!is_array($graph)) $graph = [];
        $pages = graph_pages($graph);
        $pageIndex = null;
        foreach ($pages as $index => $page) if ((string) ($page['id'] ?? '') === $pageId) { $pageIndex = $index; break; }
        if ($pageIndex === null) { $pdo->rollBack(); reply(['error' => 'Page not found'], 404); }
        $annotations = is_array($pages[$pageIndex]['annotations'] ?? null) ? $pages[$pageIndex]['annotations'] : [];
        $annotationIndex = null;
        foreach ($annotations as $index => $item) if ((string) ($item['id'] ?? '') === $annotationId) { $annotationIndex = $index; break; }
        if ($annotationIndex === null) { $pdo->rollBack(); reply(['error' => 'Annotation not found'], 404); }
        $annotation =& $annotations[$annotationIndex];
        $authenticated = !empty($_SESSION['mymind_authenticated']);
        $token = (string) ($payload['token'] ?? '');
        $canEditAnnotation = $authenticated || ($token !== '' && !empty($annotation['editTokenHash']) && password_verify($token, (string) $annotation['editTokenHash']));
        $replyItem = null;
        $replyToken = null;

        if ($operation === 'reply') {
            $comment = trim(strip_tags((string) ($payload['comment'] ?? '')));
            $author = trim(strip_tags((string) ($payload['author'] ?? 'Guest'))) ?: 'Guest';
            if ($comment === '' || mb_strlen($comment) > 1000) { $pdo->rollBack(); reply(['error' => 'Invalid reply'], 422); }
            $now = time();
            $recent = array_values(array_filter((array) ($_SESSION['mymind_comment_times'] ?? []), static fn ($time) => is_int($time) && $time > $now - 60));
            if (count($recent) >= 10) { $pdo->rollBack(); reply(['error' => 'Please wait before replying'], 429); }
            $replyToken = bin2hex(random_bytes(24));
            $replyItem = ['id' => 'reply-' . bin2hex(random_bytes(8)), 'comment' => mb_substr($comment, 0, 1000), 'author' => mb_substr($author, 0, 80), 'createdAt' => gmdate(DATE_ATOM), 'editTokenHash' => password_hash($replyToken, PASSWORD_DEFAULT)];
            $annotation['replies'] = [...(is_array($annotation['replies'] ?? null) ? $annotation['replies'] : []), $replyItem];
            $recent[] = $now;
            $_SESSION['mymind_comment_times'] = $recent;
        } elseif (str_starts_with($operation, 'reply-')) {
            $replyId = trim((string) ($payload['replyId'] ?? ''));
            $replies = is_array($annotation['replies'] ?? null) ? $annotation['replies'] : [];
            $replyIndex = null;
            foreach ($replies as $index => $item) if ((string) ($item['id'] ?? '') === $replyId) { $replyIndex = $index; break; }
            if ($replyIndex === null) { $pdo->rollBack(); reply(['error' => 'Reply not found'], 404); }
            $replyEditToken = (string) ($payload['token'] ?? '');
            $canEditReply = $authenticated || ($replyEditToken !== '' && !empty($replies[$replyIndex]['editTokenHash']) && password_verify($replyEditToken, (string) $replies[$replyIndex]['editTokenHash']));
            if (!$canEditReply) { $pdo->rollBack(); reply(['error' => 'You cannot edit this reply'], 403); }
            if ($operation === 'reply-delete') array_splice($replies, $replyIndex, 1);
            else {
                $comment = trim(strip_tags((string) ($payload['comment'] ?? '')));
                if ($comment === '' || mb_strlen($comment) > 1000) { $pdo->rollBack(); reply(['error' => 'Invalid reply'], 422); }
                $replies[$replyIndex]['comment'] = mb_substr($comment, 0, 1000);
                $replies[$replyIndex]['editedAt'] = gmdate(DATE_ATOM);
            }
            $annotation['replies'] = $replies;
        } else {
            if (!$canEditAnnotation) { $pdo->rollBack(); reply(['error' => 'You cannot edit this annotation'], 403); }
            if ($operation === 'delete') array_splice($annotations, $annotationIndex, 1);
            elseif ($operation === 'move') {
                if (!is_numeric($payload['x'] ?? null) || !is_numeric($payload['y'] ?? null)) { $pdo->rollBack(); reply(['error' => 'Invalid position'], 422); }
                $annotation['x'] = max(-100000, min(100000, (float) $payload['x']));
                $annotation['y'] = max(-100000, min(100000, (float) $payload['y']));
            } else {
                $comment = trim(strip_tags((string) ($payload['comment'] ?? '')));
                if ($comment === '' || mb_strlen($comment) > 1000) { $pdo->rollBack(); reply(['error' => 'Invalid comment'], 422); }
                $annotation['comment'] = mb_substr($comment, 0, 1000);
                $annotation['editedAt'] = gmdate(DATE_ATOM);
            }
        }

        $pages[$pageIndex]['annotations'] = $annotations;
        $graph['pages'] = $pages;
        if ((string) ($graph['activePageId'] ?? $pageId) === $pageId) $graph['annotations'] = $annotations;
        $update = $pdo->prepare('UPDATE mind_documents SET graph_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $update->execute([json_encode($graph, JSON_UNESCAPED_SLASHES), $row['id']]);
        $revision = bump_revision($pdo, (string) $row['id']);
        $pdo->commit();
        $response = ['annotations' => public_annotations($annotations), 'revision' => $revision];
        if ($replyItem) $response += ['reply' => public_annotations([['replies' => [$replyItem]]])[0]['replies'][0], 'editToken' => $replyToken];
        reply($response);
    }

    if ($action === 'media-upload' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if (empty($_SESSION['mymind_authenticated'])) {
            $guestSlug = substr(trim((string) ($_POST['slug'] ?? '')), 0, 96);
            $statement = $pdo->prepare('SELECT graph_json FROM mind_documents WHERE slug = ? AND is_shared = 1 LIMIT 1');
            $statement->execute([$guestSlug]);
            $guestRow = $statement->fetch();
            $guestGraph = $guestRow ? json_decode((string) $guestRow['graph_json'], true) : null;
            if ($guestSlug === '' || !is_array($guestGraph) || empty($guestGraph['guestEditable'])) reply(['error' => 'Authentication required'], 401);
        }
        $file = $_FILES['file'] ?? null;
        if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !is_uploaded_file((string) ($file['tmp_name'] ?? ''))) {
            reply(['error' => 'Image upload failed'], 422);
        }
        if ((int) ($file['size'] ?? 0) < 1 || (int) $file['size'] > 25 * 1024 * 1024) reply(['error' => 'Image must be smaller than 25 MB'], 413);
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file((string) $file['tmp_name']);
        $extensions = ['image/gif' => 'gif', 'image/png' => 'png', 'image/jpeg' => 'jpg', 'image/webp' => 'webp'];
        if (!isset($extensions[$mime])) reply(['error' => 'Unsupported image type'], 415);
        $uploadDirectory = dirname(__DIR__) . '/uploads';
        if (!is_dir($uploadDirectory) && !mkdir($uploadDirectory, 0755, true) && !is_dir($uploadDirectory)) reply(['error' => 'Upload directory unavailable'], 500);
        $filename = bin2hex(random_bytes(18)) . '.' . $extensions[$mime];
        if (!move_uploaded_file((string) $file['tmp_name'], $uploadDirectory . '/' . $filename)) reply(['error' => 'Could not store image'], 500);
        reply(['url' => ($sessionPath === '/' ? '' : $sessionPath) . '/uploads/' . $filename, 'mimeType' => $mime]);
    }

    if (empty($_SESSION['mymind_authenticated'])) {
        reply(['error' => 'Authentication required'], 401);
    }

    if ($action === 'list' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $rows = $pdo->query('SELECT ' . document_select_columns() . ' FROM mind_documents d LEFT JOIN mind_document_sync s ON s.document_id = d.id ORDER BY d.updated_at DESC')->fetchAll();
        $folders = $pdo->query('SELECT id, name FROM mind_folders ORDER BY name')->fetchAll();
        reply(['documents' => array_map('document_from_row', $rows), 'folders' => $folders]);
    }

    if ($action === 'folder-save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $folder = body()['folder'] ?? null;
        if (!is_array($folder) || empty($folder['id']) || trim((string) ($folder['name'] ?? '')) === '') reply(['error' => 'Invalid folder'], 422);
        $statement = $pdo->prepare('INSERT INTO mind_folders (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), updated_at = CURRENT_TIMESTAMP');
        $statement->execute([substr((string) $folder['id'], 0, 96), mb_substr(trim(strip_tags((string) $folder['name'])), 0, 120)]);
        reply(['ok' => true]);
    }

    if ($action === 'folder-delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = substr(trim((string) (body()['id'] ?? '')), 0, 96);
        if ($id === '') reply(['error' => 'Missing folder id'], 422);
        $pdo->prepare('DELETE FROM mind_folders WHERE id = ?')->execute([$id]);
        reply(['ok' => true]);
    }

    if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $document = $payload['document'] ?? null;
        if (!is_array($document) || empty($document['id']) || empty($document['title']) || empty($document['slug'])) {
            reply(['error' => 'Invalid document'], 422);
        }

        $deletedAnnotationIds = array_fill_keys(array_map('strval', is_array($document['deletedAnnotationIds'] ?? null) ? $document['deletedAnnotationIds'] : []), true);
        $deletedReplyIds = array_fill_keys(array_map('strval', is_array($document['deletedReplyIds'] ?? null) ? $document['deletedReplyIds'] : []), true);
        $activePageId = substr((string) ($document['activePageId'] ?? 'page-1'), 0, 96);
        $pages = is_array($document['pages'] ?? null) && $document['pages'] ? array_values(array_filter($document['pages'], 'is_array')) : [[
            'id' => $activePageId,
            'name' => 'Page 1',
            'nodes' => is_array($document['nodes'] ?? null) ? $document['nodes'] : [],
            'edges' => is_array($document['edges'] ?? null) ? $document['edges'] : [],
            'drawings' => is_array($document['drawings'] ?? null) ? $document['drawings'] : [],
            'annotations' => is_array($document['annotations'] ?? null) ? $document['annotations'] : [],
        ]];
        $existingStatement = $pdo->prepare('SELECT graph_json FROM mind_documents WHERE id = ? LIMIT 1');
        $existingStatement->execute([(string) $document['id']]);
        $existingRow = $existingStatement->fetch();
        $existingPagesById = [];
        if ($existingRow) {
            $existingGraph = json_decode((string) $existingRow['graph_json'], true);
            if (is_array($existingGraph)) foreach (graph_pages($existingGraph) as $page) if (!empty($page['id'])) $existingPagesById[(string) $page['id']] = $page;
        }

        foreach ($pages as $index => &$page) {
            $pageId = substr((string) ($page['id'] ?? ('page-' . ($index + 1))), 0, 96);
            $page['id'] = $pageId;
            $page['name'] = mb_substr(trim(strip_tags((string) ($page['name'] ?? ('Page ' . ($index + 1))))) ?: ('Page ' . ($index + 1)), 0, 60);
            $page['nodes'] = is_array($page['nodes'] ?? null) ? $page['nodes'] : [];
            $page['edges'] = is_array($page['edges'] ?? null) ? $page['edges'] : [];
            $page['drawings'] = is_array($page['drawings'] ?? null) ? $page['drawings'] : [];
            $page['annotations'] = merge_annotations(is_array($page['annotations'] ?? null) ? $page['annotations'] : [], is_array($existingPagesById[$pageId]['annotations'] ?? null) ? $existingPagesById[$pageId]['annotations'] : [], $deletedAnnotationIds, $deletedReplyIds);
        }
        unset($page);
        if (!array_filter($pages, static fn ($page) => (string) ($page['id'] ?? '') === $activePageId)) $activePageId = (string) $pages[0]['id'];
        $activePage = $pages[0];
        foreach ($pages as $page) if ((string) ($page['id'] ?? '') === $activePageId) { $activePage = $page; break; }

        $graph = json_encode([
            'folderId' => !empty($document['folderId']) ? substr((string) $document['folderId'], 0, 96) : null,
            'guestEditable' => !empty($document['guestEditable']),
            'activePageId' => $activePageId,
            'pages' => $pages,
            'nodes' => $activePage['nodes'],
            'edges' => $activePage['edges'],
            'drawings' => $activePage['drawings'],
            'annotations' => $activePage['annotations'],
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
        $revision = bump_revision($pdo, substr((string) $document['id'], 0, 96));
        reply(['ok' => true, 'revision' => $revision]);
    }

    if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $payload = body();
        $id = trim((string) ($payload['id'] ?? ''));
        if ($id === '') reply(['error' => 'Missing id'], 422);
        $statement = $pdo->prepare('DELETE FROM mind_documents WHERE id = ?');
        $statement->execute([$id]);
        $pdo->prepare('DELETE FROM mind_document_sync WHERE document_id = ?')->execute([$id]);
        $pdo->prepare('DELETE FROM mind_presence WHERE document_id = ?')->execute([$id]);
        reply(['ok' => true]);
    }

    reply(['error' => 'Unsupported action'], 404);
} catch (Throwable $error) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) $pdo->rollBack();
    error_log('MyMind API error: ' . $error->getMessage());
    reply(['error' => 'Database request failed'], 500);
}
