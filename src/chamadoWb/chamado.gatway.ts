import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: '/chamados',
    cors: {
        origin: '*'
    },
})

export class ChamadosGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    afterInit(server: Server) {
        server.use((socket, next) => {
            const apiKey = socket.handshake.auth?.apiKey || socket.handshake.headers['x-api-key']

            if (!apiKey) {
                return next(new Error('API key não informada'))
            }

            if (apiKey !== process.env.VALID_API_KEY) {
                return next(new Error('API key Inválida'))
            }

            return next()
        })
    }

    handleConnection(client: Socket) {
    }

    handleDisconnect(client: Socket) {
    }

    emitCreated(chamado: any) {
        this.server.emit('chamado:criado', chamado)
    }

    emitUpdate(chamado: any) {
        this.server.emit('chamado:atualizado', chamado)
    }

    emitDeleted(chamado: any){
        this.server.emit('chamado:deletado', chamado)
    }
}
