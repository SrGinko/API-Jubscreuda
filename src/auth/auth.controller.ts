import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('discord')
    redirect(@Res() res: Response) {
        return res.redirect(this.authService.getDiscordAuthUrl());
    }

    @Get('discord/callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        const { jwt } = await this.authService.handleDiscordCallback(code);

        return res.redirect(
            `monteiroapps://auth?token=${jwt}`
        );
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req: Request) {
        return (req as any).user;
    }
}