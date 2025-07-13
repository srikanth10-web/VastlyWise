#!/bin/bash

echo "🔍 VastlyWise User Registration Monitor"
echo "========================================"
echo ""

# Get initial count
initial_count=$(sqlite3 prisma/dev.db "SELECT COUNT(*) FROM users;")
echo "📊 Current total users: $initial_count"
echo ""

# Show current users
echo "👥 Current users:"
sqlite3 prisma/dev.db "SELECT email, username, firstName, lastName, isAdmin, datetime(createdAt/1000, 'unixepoch') as created_date FROM users ORDER BY createdAt DESC;"
echo ""

echo "🔄 Monitoring for new registrations... (Press Ctrl+C to stop)"
echo ""

# Monitor for changes
while true; do
    current_count=$(sqlite3 prisma/dev.db "SELECT COUNT(*) FROM users;")
    
    if [ "$current_count" -gt "$initial_count" ]; then
        echo "🎉 NEW USER REGISTERED!"
        echo "📊 Total users now: $current_count"
        echo ""
        echo "👤 Newest user:"
        sqlite3 prisma/dev.db "SELECT email, username, firstName, lastName, datetime(createdAt/1000, 'unixepoch') as created_date FROM users ORDER BY createdAt DESC LIMIT 1;"
        echo ""
        initial_count=$current_count
    fi
    
    sleep 5
done 