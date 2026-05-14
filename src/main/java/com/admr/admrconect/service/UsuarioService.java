package com.admr.admrconect.service;

import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service = marca esta classe como servico (regras de negocio)
@Service
public class UsuarioService {

    // @Autowired = Spring injeta o repositorio automaticamente
    @Autowired
    private UsuarioRepository repository;

    // Salva um novo usuario no banco
    public Usuario salvar(Usuario usuario) {
        if (repository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("E-mail ja cadastrado: " + usuario.getEmail());
        }
        return repository.save(usuario);
    }

    // Retorna todos os usuarios
    public List<Usuario> listar() {
        return repository.findAll();
    }

    // Busca um usuario pelo ID
    public Usuario buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado: id=" + id));
    }

    // Atualiza os dados de um usuario
    public Usuario atualizar(Long id, Usuario dadosNovos) {
        Usuario existente = buscar(id);
        existente.setNome(dadosNovos.getNome());
        existente.setEmail(dadosNovos.getEmail());
        existente.setTipoUsuario(dadosNovos.getTipoUsuario());
        return repository.save(existente);
    }

    // Remove um usuario pelo ID
    public void deletar(Long id) {
        buscar(id); // garante que existe antes de deletar
        repository.deleteById(id);
    }
}
