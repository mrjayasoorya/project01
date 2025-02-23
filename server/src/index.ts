require('dotenv').config();
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { sequelize } from '@utils/database';
import { logger } from '@utils/logger';
import authRoutes from '@routes/authRoutes';
import jwtVerifyRoute from './routes/jwtVerifyRoute';
import { errorHandler } from '@middlewares/errorHandler';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from '@graphql/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

// import 'dotenv/config';
import { JwtPayload } from 'jsonwebtoken';

const app: Application = express()
const PORT = process.env.PORT || 3001;

declare module 'express-serve-static-core' {
    interface Request {
      user?: string | JwtPayload;
    }
  }

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', jwtVerifyRoute);

// GraphQL setup
const server = new ApolloServer({ typeDefs, resolvers,
    introspection: true, // Allow introspection in production
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({}),
      ],
 });

// Start server and apply middleware
(async () => {
  await server.start();

  // Workaround: Explicitly type `app` to satisfy ApolloServer
  server.applyMiddleware({ app: app as any }); // Temporary workaround with `any`

  // Database Connection and Server Start
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();

// Error Handling Middleware
app.use(errorHandler);