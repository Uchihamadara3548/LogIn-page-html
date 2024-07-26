// Global variable to hold the loaded database
let db;

// Function to load the SQLite database and create tables if they do not exist
const loadDatabase = async () => {
    try {
        // Initialize SQL.js with the correct file location
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });

         // Load the existing database file
    const response = await fetch('database.db');
    const data = await response.arrayBuffer();
    db = new SQL.Database(new Uint8Array(data));
        
        // Create a new database instance
        db = new SQL.Database();
        
        // Create the users table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
            );
        `);
        
        console.log('Database loaded and table created successfully');
    } catch (error) {
        console.error('Error loading database:', error);
        throw error; // Propagate the error for handling elsewhere if needed
    }
};

// Function to perform a SQL query with optional parameters
const performQuery = async (query, params) => {
    try {
        // Ensure the database is loaded
        if (!db) {
            await loadDatabase();
        }
        
        // Prepare the SQL statement
        const stmt = db.prepare(query);

        // Bind parameters if provided
        if (params) {
            stmt.bind(params);
        }

        // Execute the statement and gather results
        const results = [];
        while (stmt.step()) {
            results.push(stmt.getAsObject());
        }

        // Free the statement after use
        stmt.free();

        return results;
    } catch (error) {
        console.error('Error performing query:', error);
        throw error; // Propagate the error for handling elsewhere if needed
    }
};

// Function to insert a new user into the database
const insertUser = async (username, password) => {
    console.log('Inserting user:', username, password);
    try {
        // Ensure the database is loaded
        if (!db) {
            await loadDatabase();
        }
       
        // Begin transaction for inserting user
        db.run('BEGIN TRANSACTION');
        
        // Insert user into the database
        // Use placeholder '?' for the values
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        
        // Commit transaction if successful
        db.run('COMMIT');
        
        console.log('User inserted successfully');
        return 'Registration successful!';
    } catch (error) {
        console.error('Error inserting user:', error);
        
        return 'Registration failed.';
    }
};

// Function to log in a user by checking username and password
const loginUser = async (username, password) => {
    console.log('Logging in user:', username);
    try {
        // Ensure the database is loaded
        if (!db) {
            await loadDatabase();
        }

        // Perform the query to find the user
        const results = await performQuery('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (results.length > 0) {
            console.log('Login successful');
            return 'Login successful!';
        } else {
            console.log('Login failed: invalid username or password');
            return 'Login failed: invalid username or password.';
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Propagate the error for handling elsewhere if needed
    }
};

// Load the database when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDatabase().catch(error => {
        console.error('Error loading database on DOMContentLoaded:', error);
    });
})