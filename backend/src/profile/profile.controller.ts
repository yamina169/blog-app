import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '@/user/decorators/user.decorators';
import { AuthGuard } from '@/user/guards/auth.guard';
import { IProfileResponse } from './types/profileResponse.interfaces';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get a user profile by username' })
  @ApiParam({ name: 'username', required: true, example: 'johndoe' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<IProfileResponse> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      profileUsername,
    );
    return this.profileService.generateProfileResponse(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user by username' })
  @ApiParam({ name: 'username', required: true, example: 'johndoe' })
  @ApiResponse({ status: 200, description: 'User followed successfully' })
  async followProfile(
    @User('id') currentUserId: number,
    @Param('username') followingUsername: string,
  ): Promise<IProfileResponse> {
    const newFollow = await this.profileService.followProfile(
      currentUserId,
      followingUsername,
    );
    return this.profileService.generateProfileResponse(newFollow);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user by username' })
  @ApiParam({ name: 'username', required: true, example: 'johndoe' })
  @ApiResponse({ status: 200, description: 'User unfollowed successfully' })
  async unfollowProfile(
    @User('id') currentUserId: number,
    @Param('username') followingUsername: string,
  ): Promise<IProfileResponse> {
    const unfollowProfile = await this.profileService.unfoldowProfile(
      currentUserId,
      followingUsername,
    );
    return this.profileService.generateProfileResponse(unfollowProfile);
  }
}
