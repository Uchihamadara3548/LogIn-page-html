let db;

// Initialize an in-memory database
const loadDatabase = async () => {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
    db = new SQL.Database(); // Empty database in memory
    console.log('Temporary database created in memory.');

    // Create a 'users' table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );
    `);
};

const performQuery = async (query, params = []) => {
    if (!db) {
        await loadDatabase();
    }

    const stmt = db.prepare(query);
    stmt.bind(params);

    const results = [];
    while (stmt.step()) {
        results.push(stmt.getAsObject());
    }

    stmt.free();
    return results;
};

const insertUser = async (username, password) => {
    console.log('Inserting user:', username, password);

    if (!db) {
        await loadDatabase();
    }

    try {
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        console.log('User registered successfully.');
        return 'Registration successful!';
    } catch (error) {
        console.error('Registration Error:', error);
        return 'Registration failed: Username already exists.';
    }
};

const loginUser = async (username, password) => {
    console.log('Logging in user:', username, password);

    if (!db) {
        await loadDatabase();
    }

    try {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const results = await performQuery(query, [username, password]);

        if (results.length > 0) {
            console.log('Login successful.');
            return 'Login successful!';
        } else {
            console.log('Invalid username or password.');
            return 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Login Error:', error);
        return 'Login failed.';
    }
};