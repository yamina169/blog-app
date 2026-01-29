import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { SocialController } from './social/social.controller';
import { ProfilController } from './profil/profil.controller';
import { ProfilService } from './profil/profil.service';
import { SocialService } from './social/social.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProfilModule } from './profil/profil.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [AuthModule, ProfilModule, SocialModule],
  controllers: [AppController, AuthController, SocialController, ProfilController],
  providers: [AppService, ProfilService, SocialService, AuthService],
})
export class AppModule {}
