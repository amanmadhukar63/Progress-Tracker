

export const createGoalTable = `
  CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'ACTIVE' 
      CHECK( status IN ('ACTIVE', 'PAUSED', 'COMPLETED')),
    start_date DATE DEFAULT NOW(),
    end_date DATE,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;