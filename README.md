title: Diagrama de Classes — ADMR Conect (Spring Boot + H2)
---
classDiagram
    direction TB

    namespace Controller {
        class UsuarioController {
            <<RestController>>
            - service: UsuarioService
            + GET /api/usuarios()
            + POST /api/usuarios()
            + DELETE /api/usuarios/:id()
        }
        class PedidoController {
            <<RestController>>
            - service: PedidoService
            + GET /api/pedidos()
            + POST /api/pedidos()
            + PUT /:id/avancar()
        }
        class ClienteController {
            <<RestController>>
            - service: ClienteService
            + GET /api/clientes()
            + POST /api/clientes()
            + DELETE /:id()
        }
        class LigacaoController {
            <<RestController>>
            - service: LigacaoService
            + GET /api/ligacoes()
            + POST /api/ligacoes()
        }
    }
	
    namespace Service {
        class UsuarioService {
            <<Service>>
            - repo: UsuarioRepository
            + salvar(u) Usuario
            + listar() List
            + buscar(id) Usuario
            + deletar(id) void
        }
        class PedidoService {
            <<Service>>
            - repo: PedidoRepository
            + salvar(p) Pedido
            + listar() List
            + avancarStatus(id)
            + listarPorStatus(s)
        }
        class ClienteService {
            <<Service>>
            - repo: ClienteRepository
            + salvar(c) Cliente
            + listar() List
            + buscarPorNome(n)
            + deletar(id) void
        }
        class LigacaoService {
            <<Service>>
            - repo: LigacaoRepository
            + salvar(l)
            + listar()
        }
    }

    namespace Repository {
        class UsuarioRepository {
            <<Repository>>
            extends JpaRepository~Usuario, Long~
            + findByEmail(email)
            + existsByEmail(email)
        }
        class PedidoRepository {
            <<Repository>>
            extends JpaRepository~Pedido, Long~
            + findByStatus(status)
            + findByVendedor(v)
        }
        class ClienteRepository {
            <<Repository>>
            extends JpaRepository~Cliente, Long~
            + findByVendedor(v)
            + findByNomeContaining(n)
        }
        class LigacaoRepository {
            <<Repository>>
            extends JpaRepository~Ligacao, Long~
            + findByCliente(c)
        }
    }

    namespace Entity {
        class Usuario {
            <<Entity>>
            + id: Long
            + nome: String
            + email: String
            + senha: String
            + tipoUsuario: Perfil
            + ativo: boolean
        }
        class Pedido {
            <<Entity>>
            + id: Long
            + cliente: Cliente
            + vendedor: Usuario
            + status: StatusPedido
            + origemVenda: enum
            + dataPedido: DateTime
        }
        class Cliente {
            <<Entity>>
            + id: Long
            + nome: String
            + telefone: String
            + empresa: String
            + freqRecompraDias: int
            + vendedor: Usuario

    UsuarioController ..> UsuarioService : usa
    PedidoController ..> PedidoService : usa
    ClienteController ..> ClienteService : usa
    LigacaoController ..> LigacaoService : usa

    UsuarioService ..> UsuarioRepository : acessa
    PedidoService ..> PedidoRepository : acessa
    ClienteService ..> ClienteRepository : acessa
    LigacaoService ..> LigacaoRepository : acessa

    UsuarioRepository ..> Usuario : persiste
    PedidoRepository ..> Pedido : persiste
    ClienteRepository ..> Cliente : persiste
    LigacaoRepository ..> Ligacao : persiste

    Usuario ..> H2Database : tabela
    Pedido ..> H2Database : tabela
    Cliente ..> H2Database : tabela
    Ligacao ..> H2Database : tabela
