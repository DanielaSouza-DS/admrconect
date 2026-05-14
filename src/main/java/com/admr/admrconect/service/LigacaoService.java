package com.admr.admrconect.service;

import com.admr.admrconect.model.Ligacao;
import com.admr.admrconect.repository.LigacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LigacaoService {

    @Autowired
    private LigacaoRepository repository;

    public Ligacao salvar(Ligacao ligacao) {
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
