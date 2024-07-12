// Global variable to hold the loaded database
let db;

// Function to load the SQLite database
const loadDatabase = async () => {
    try {
        // Initialize SQL.js with the correct file location
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });
        
        // Fetch the database file and convert it to an array buffer
        const response = await fetch('database.db');
        const buffer = await response.arrayBuffer();
        
        // Create a new database instance from the fetched data
        db = new SQL.Database(new Uint8Array(buffer));
        
        console.log('Database loaded successfully');
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
        await db.run('BEGIN TRANSACTION');
        
        // Insert user into the database
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        
        // Commit transaction if successful
        await db.run('COMMIT');
        
        console.log('User inserted successfully');
        return 'Registration successful!';
    } catch (error) {
        console.error('Error inserting user:', error);
        
        // Rollback transaction on error
        await db.run('ROLLBACK');
        
        return 'Registration failed.';
    }
};

// Load the database when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDatabase().catch(error => {
        console.error('Error loading database on DOMContentLoaded:', error);
    });
});