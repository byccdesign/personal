CREATE TABLE IF NOT EXISTS mind_documents (
  id VARCHAR(96) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(96) NOT NULL UNIQUE,
  is_shared TINYINT(1) NOT NULL DEFAULT 0,
  graph_json LONGTEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_mind_documents_updated (updated_at),
  INDEX idx_mind_documents_shared_slug (is_shared, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mind_folders (
  id VARCHAR(96) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_mind_folders_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mind_document_sync (
  document_id VARCHAR(96) PRIMARY KEY,
  revision BIGINT UNSIGNED NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mind_presence (
  document_id VARCHAR(96) NOT NULL,
  client_id VARCHAR(96) NOT NULL,
  display_name VARCHAR(80) NOT NULL,
  participant_role ENUM('owner', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
  last_seen TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (document_id, client_id),
  INDEX idx_mind_presence_seen (last_seen)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
