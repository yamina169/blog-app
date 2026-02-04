import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './user/user.entity';
import { ArticleEntity } from './article/article.entity';
import { CommentEntity } from './comment/comment.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ✅ Liste explicitement toutes les entités
  entities: [__dirname + '/**/*.entity.js'], // <-- pour Docker / prod
  migrations: [__dirname + '/migrations/*.js'], // uniquement les JS compilés
  synchronize: true, // ok pour dev, à retirer en prod
});
