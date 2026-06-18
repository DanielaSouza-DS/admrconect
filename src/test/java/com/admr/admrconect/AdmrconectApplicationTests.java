package com.admr.admrconect;

import com.admr.admrconect.enums.Perfil;
import com.admr.admrconect.model.Produto;
import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.UsuarioRepository;
import com.admr.admrconect.service.ProdutoService;
import com.admr.admrconect.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AdmrconectApplicationTests {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    void limparBanco() {
        usuarioRepository.deleteAll();
    }


    @Test
    void deveSalvarUsuarioComSucesso() {
        Usuario u = new Usuario();
        u.setNome("Joao Silva");
        u.setEmail("joao@admr.com");
        u.setSenha("123456");
        u.setTipoUsuario(Perfil.VENDEDOR);

        Usuario salvo = usuarioService.salvar(u);

        assertNotNull(salvo.getId());
        assertEquals("Joao Silva", salvo.getNome());
        assertEquals(Perfil.VENDEDOR, salvo.getTipoUsuario());
        assertTrue(salvo.isAtivo());
    }

    @Test
    void naoDeveSalvarUsuarioComEmailDuplicado() {Usuario u1 = new Usuario();
        u1.setNome("Ana Costa");
        u1.setEmail("ana@admr.com");
        u1.setSenha("123");
        u1.setTipoUsuario(Perfil.GERENTE);
        usuarioService.salvar(u1);

        Usuario u2 = new Usuario();
        u2.setNome("Ana Outra");
        u2.setEmail("ana@admr.com");
        u2.setSenha("456");
        u2.setTipoUsuario(Perfil.VENDEDOR);

        assertThrows(RuntimeException.class, () -> usuarioService.salvar(u2));
    }

    @Test
    void deveListarUsuarios() {
        Usuario u1 = new Usuario();
        u1.setNome("Carlos"); u1.setEmail("carlos@admr.com");
        u1.setSenha("123"); u1.setTipoUsuario(Perfil.ESTOQUISTA);

        Usuario u2 = new Usuario();
        u2.setNome("Maria"); u2.setEmail("maria@admr.com");
        u2.setSenha("456"); u2.setTipoUsuario(Perfil.VENDEDOR);

        usuarioService.salvar(u1);
        usuarioService.salvar(u2);

        var lista = usuarioService.listar();

        assertEquals(2, lista.size());
    }

    @Test
    void deveBuscarUsuarioPorId() {
        Usuario u = new Usuario();
        u.setNome("Pedro"); u.setEmail("pedro@admr.com");
        u.setSenha("123"); u.setTipoUsuario(Perfil.VENDEDOR);
        Usuario salvo = usuarioService.salvar(u);

        Usuario encontrado = usuarioService.buscar(salvo.getId());

        assertEquals("Pedro", encontrado.getNome());
    }

    @Test
    void deveDeletarUsuario() {
        Usuario u = new Usuario();
        u.setNome("Lucas"); u.setEmail("lucas@admr.com");
        u.setSenha("123"); u.setTipoUsuario(Perfil.VENDEDOR);
        Usuario salvo = usuarioService.salvar(u);

        usuarioService.deletar(salvo.getId());

        assertThrows(RuntimeException.class, () -> usuarioService.buscar(salvo.getId()));
    }


    @Test
    void deveSalvarProdutoComSucesso() {
        Produto p = new Produto();
        p.setNome("Pneu Continental HSR2");
        p.setCodigo("CONT-HSR2");
        p.setDescricao("Pneu para caminhao pesado");
        p.setPrecoUnitario(850.00);
        p.setQuantidade(45);

        Produto salvo = produtoService.salvar(p);

        assertNotNull(salvo.getId());
        assertEquals("CONT-HSR2", salvo.getCodigo());
        assertFalse(salvo.isEstoqueBaixo()); // 45 > 30 (minimo padrao)
    }

    @Test
    void deveDetectarEstoqueBaixo() {
        Produto p = new Produto();
        p.setNome("Pneu Continental HDR2");
        p.setCodigo("CONT-HDR2");
        p.setPrecoUnitario(920.00);
        p.setQuantidade(10);

        Produto salvo = produtoService.salvar(p);

        assertTrue(salvo.isEstoqueBaixo());
    }

    @Test
    void contextLoads() {
        assertNotNull(usuarioService);
        assertNotNull(produtoService);
    }
}
