# #!/bin/bash

# # Create the src directory and its subdirectories
# mkdir -p src/controllers
# mkdir -p src/graphql
# mkdir -p src/middlewares
# mkdir -p src/models
# mkdir -p src/routes
# mkdir -p src/utils

# # Create the files within the subdirectories
# touch src/controllers/authController.ts
# touch src/graphql/schema.ts
# touch src/middlewares/errorHandler.ts
# touch src/models/userModel.ts
# touch src/routes/authRoutes.ts
# touch src/utils/database.ts
# touch src/utils/logger.ts
# touch src/index.ts
# touch src/server.ts

# # Create the migrations and logs directories
# mkdir migrations
# mkdir logs

# # Create the log file
# touch logs/combined.log

# echo "Folder and file structure created successfully."
mv config src/
mv models src/
mv migrations src/
mv seeders src/
