package com.admr.admrconect.service;

import com.admr.admrconect.model.Cliente;
import com.admr.admrconect.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente salvar(Cliente cliente) {
        if (repository.existsByTelefone(cliente.getTelefone())) {
            throw new RuntimeException("Telefone ja cadastrado: " + cliente.getTelefone());
        }
        return repository.save(cliente);
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente nao encontrado: id=" + id));
    }

    public List<Cliente> buscarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public Cliente atualizar(Long id, Cliente dadosNovos) {
        Cliente existente = buscar(id);
        existente.setNome(dadosNovos.getNome());
        existente.setTelefone(dadosNovos.getTelefone());
        existente.setEmpresa(dadosNovos.getEmpresa());
        existente.setFreqRecompraDias(dadosNovos.getFreqRecompraDias());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
