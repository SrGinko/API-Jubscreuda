import { BadRequestException, Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('discord')
    redirect(
        @Query('state') state: string | undefined,
        @Query('redirectTo') redirectTo: string | undefined,
        @Query('platform') platform: string | undefined,
        @Res() res: Response,
    ) {
        return res.redirect(this.authService.getDiscordAuthUrl({ state, redirectTo, platform }));
    }

    @Get('discord/callback')
    async callback(
        @Query('code') code: string,
        @Query('state') state: string | undefined,
        @Res() res: Response,
    ) {
        if (!code) {
            throw new BadRequestException('Codigo OAuth do Discord nao informado.');
        }

        const { jwt } = await this.authService.handleDiscordCallback(code);

        const redirectUrl = this.authService.getSuccessRedirectUrl(jwt, state);

        console.log('Redirecting to:', redirectUrl);

        return res.redirect(redirectUrl);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req: Request) {
        return (req as any).user;
    }
}
