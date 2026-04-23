import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getDiscordAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      response_type: 'code',
      scope: 'identify email',
    });
    
    const url = `https://discord.com/api/oauth2/authorize?${params.toString()}`; 
    console.log(url)   

    return url
  }

  async handleDiscordCallback(code: string) {
    const token = await this.getToken(code);
    const user = await this.getUser(token.access_token);

    const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

    const payload = {
      sub: user.id,
      username: user.GlobalName || user.username,
      avatar,
    };

    const jwt = this.jwtService.sign(payload);

    return { jwt };
  }

  private async getToken(code: string) {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    });

    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  }

  private async getUser(accessToken: string) {
    const response = await axios.get(
      'https://discord.com/api/users/@me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }
}