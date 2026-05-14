package com.admr.admrconect.service;

import com.admr.admrconect.model.Produto;
import com.admr.admrconect.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public Produto salvar(Produto produto) {
        if (repository.existsByCodigo(produto.getCodigo())) {
            throw new RuntimeException("Codigo ja cadastrado: " + produto.getCodigo());
        }
        return repository.save(produto);
    }

    public List<Produto> listar() {
        return repository.findAll();
    }

    public Produto buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado: id=" + id));
    }

    // Retorna produtos com estoque abaixo do minimo configurado
    public List<Produto> listarEstoqueBaixo() {
        return repository.findAll().stream()
                .filter(Produto::isEstoqueBaixo)
                .toList();
    }

    public Produto atualizar(Long id, Produto dados) {
        Produto existente = buscar(id);
        existente.setNome(dados.getNome());
        existente.setDescricao(dados.getDescricao());
        existente.setPrecoUnitario(dados.getPrecoUnitario());
        existente.setQuantidade(dados.getQuantidade());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
