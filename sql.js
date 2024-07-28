let db;

const loadDatabase = async () => {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
    
    const data = await fetch('database.db').then(res => res.arrayBuffer());
    db = new SQL.Database(new Uint8Array(data));
    console.log('Database loaded');
};

const saveDatabase = async () => {
    const data = db.export();
    const buffer = new Uint8Array(data);
    
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'database.db';
    link.click();
    console.log('Database saved');
};

const performQuery = async (query, params) => {
    if (!db) {
        await loadDatabase();
    }
    
    const stmt = db.prepare(query);
    
    if (params) {
        stmt.bind(params);
    }

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
        db.run('BEGIN TRANSACTION');
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        db.run('COMMIT');
        console.log('User inserted successfully');
        await saveDatabase();
        return 'Registration successful!';
    } catch (error) {
        console.error('Error:', error);
        db.run('ROLLBACK');
        return 'Registration failed.';
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
            console.log('Login successful');
            return 'Login successful!';
        } else {
            console.log('Invalid username or password');
            return 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Login failed.';
    }
};