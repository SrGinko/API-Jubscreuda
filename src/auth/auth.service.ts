import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private jwtService: JwtService) { }

  getDiscordAuthUrl(options?: {
    state?: string;
    redirectTo?: string;
    platform?: string;
  }) {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      response_type: 'code',
      scope: 'identify email',
    });

    const state = this.resolveOAuthState(options);

    if (state) {
      params.set('state', state);
    }

    return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
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

  getSuccessRedirectUrl(jwt: string, state?: string) {
    const decoded = this.decodeState(state);
    const redirectTo = decoded?.redirectTo || process.env.APP_AUTH_REDIRECT_URI;

    if (!redirectTo) {
      throw new BadRequestException('Nenhum redirect de autenticacao foi configurado.');
    }

    return this.appendQueryParam(redirectTo, 'token', jwt);
  }

  private async getToken(code: string) {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    });

    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const discordError = error.response?.data?.error;
        const discordDescription = error.response?.data?.error_description;

        this.logger.warn(
          `Discord OAuth token exchange failed: ${discordError ?? 'unknown_error'} - ${discordDescription ?? 'No description'}`,
        );

        if (discordError === 'invalid_grant') {
          throw new BadRequestException(
            'Codigo OAuth do Discord invalido, expirado ou ja utilizado.',
          );
        }
      }

      throw error;
    }
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

  private encodeState(payload: { redirectTo: string }) {
    return Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
  }

  private resolveOAuthState(options?: {
    state?: string;
    redirectTo?: string;
    platform?: string;
  }) {
    if (options?.state) {
      return options.state;
    }

    const redirectTo = this.resolveRedirectTarget(options?.redirectTo, options?.platform);

    if (!redirectTo) {
      return undefined;
    }

    return this.encodeState({ redirectTo });
  }

  private resolveRedirectTarget(redirectTo?: string, platform?: string) {
    if (redirectTo?.trim()) {
      return redirectTo.trim();
    }

    if (platform === 'expo-go') {
      return process.env.EXPO_GO_AUTH_REDIRECT_URI || process.env.APP_AUTH_REDIRECT_URI;
    }

    return process.env.APP_AUTH_REDIRECT_URI;
  }

  private decodeState(state?: string) {
    if (!state) {
      return null;
    }

    try {
      const decoded = Buffer.from(state, 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);

      if (typeof parsed?.redirectTo !== 'string' || !parsed.redirectTo.trim()) {
        return null;
      }

      return { redirectTo: parsed.redirectTo };
    } catch {
      return null;
    }
  }

  private appendQueryParam(url: string, key: string, value: string) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set(key, value);
      return parsedUrl.toString();
    } catch {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
  }
}
