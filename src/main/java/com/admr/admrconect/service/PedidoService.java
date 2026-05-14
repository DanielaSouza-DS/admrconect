package com.admr.admrconect.service;

import com.admr.admrconect.enums.StatusPedido;
import com.admr.admrconect.model.Pedido;
import com.admr.admrconect.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    public Pedido salvar(Pedido pedido) {
        return repository.save(pedido);
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido nao encontrado: id=" + id));
    }

    public List<Pedido> listarPorStatus(StatusPedido status) {
        return repository.findByStatus(status);
    }

    // Avanca o pedido para o proximo status
    public Pedido avancarStatus(Long id) {
        Pedido pedido = buscar(id);
        pedido.avancarStatus();
        return repository.save(pedido);
    }

    public void deletar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
