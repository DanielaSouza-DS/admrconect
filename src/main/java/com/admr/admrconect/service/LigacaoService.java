package com.admr.admrconect.service;

import com.admr.admrconect.model.Cliente;
import com.admr.admrconect.model.Ligacao;
import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.ClienteRepository;
import com.admr.admrconect.repository.LigacaoRepository;
import com.admr.admrconect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LigacaoService {

    @Autowired
    private LigacaoRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Ligacao salvar(Ligacao ligacao) {
        Cliente cliente = clienteRepository.findById(ligacao.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente nao encontrado"));
        Usuario vendedor = usuarioRepository.findById(ligacao.getVendedor().getId())
                .orElseThrow(() -> new RuntimeException("Vendedor nao encontrado"));

        ligacao.setCliente(cliente);
        ligacao.setVendedor(vendedor);

        return repository.save(ligacao);
    }

    public List<Ligacao> listar() {
        return repository.findAll();
    }

    public Ligacao buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ligacao nao encontrada: id=" + id));
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}