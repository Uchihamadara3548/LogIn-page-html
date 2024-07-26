// Global variable to hold the loaded database
let db;

// Function to load the SQLite database
const loadDatabase = async () => {
    try {
        // Initialize SQL.js with the correct file location
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });

        // Load the existing database file
        const response = await fetch('database.db');

        if (response.ok) {
            // Load the existing database
            const data = await response.arrayBuffer();
            db = new SQL.Database(new Uint8Array(data));
            console.log('Database loaded successfully');
        } else {
            throw new Error('Database file not found');
        }
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
        console.error('Error performing query:', error.message);
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
        db.exec('BEGIN TRANSACTION');

        // Insert user into the database
        db.exec('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        // Commit transaction if successful
        db.exec('COMMIT');

        console.log('User inserted successfully');
        return 'Registration successful!';
    } catch (error) {
        console.error('Error inserting user:', error.message);

        // Rollback transaction on error
        db.exec('ROLLBACK');

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
        console.error('Error logging in user:', error.message);
        throw error; // Propagate the error for handling elsewhere if needed
    }
};

// Load the database when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDatabase().catch(error => {
        console.error('Error loading database on DOMContentLoaded:', error);
    });
});