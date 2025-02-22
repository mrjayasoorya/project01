# 1. Create the project directory
# mkdir my-next-app
cd web

# 2. Use create-next-app with the TypeScript template
npx create-next-app --typescript .  # The "." indicates to create the project in the current directory

# 3. (Optional) Install PostgreSQL client and types (if you need it immediately)
npm install pg @types/pg

# 4. (Optional) Install concurrently (for running dev server and other tasks concurrently)
npm install concurrently --save-dev

# 5. Create .env file to store database credentials (if you need it immediately)
touch .env

# Example .env file content (replace with your credentials)
cat << EOF > .env
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
EOF

# 6. (Optional) Create a .gitignore file (if it wasn't created automatically)
cat << EOF > .gitignore
node_modules
.next
EOF

# # 7. Update package.json scripts (example - optional)
# cat << EOF > package.json
# {
#   // ... other properties
#   "scripts": {
#     "dev": "next dev",
#     "build": "next build",
#     "start": "next start",
#     "lint": "next lint",
#     "type-check": "tsc --noEmit", # Check types without emitting JS
#     "db:migrate": "psql -d <your_db_name> -f <your_migration_script.sql>" # Example db migration
#   },
#   // ... other properties
# }
# EOF


# 8. Start the development server
npm run dev