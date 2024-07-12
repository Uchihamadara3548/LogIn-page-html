<?php
try {
    $db = new SQLite3('mydatabase.db');
    $sql = file_get_contents('database.sql');
    $db->exec($sql);
    echo "Database created successfully!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>