CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT contact_messages_name_length CHECK (char_length(name) BETWEEN 2 AND 80),
  CONSTRAINT contact_messages_subject_length CHECK (char_length(subject) BETWEEN 2 AND 120),
  CONSTRAINT contact_messages_message_length CHECK (char_length(message) BETWEEN 20 AND 4000),
  CONSTRAINT contact_messages_status_check CHECK (status IN ('new', 'read', 'archived'))
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_messages_status_created_at_idx
  ON contact_messages (status, created_at DESC);
