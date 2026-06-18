package com.admr.admrconect.service;

import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario salvar(Usuario usuario) {
        if (repository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("E-mail ja cadastrado: " + usuario.getEmail());
        }
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return repository.save(usuario);
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado: id=" + id));
    }

    public Usuario atualizar(Long id, Usuario dadosNovos) {
        Usuario existente = buscar(id);
        existente.setNome(dadosNovos.getNome());
        existente.setEmail(dadosNovos.getEmail());
        existente.setTipoUsuario(dadosNovos.getTipoUsuario());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
